'use client';

import { siteConfig } from '@/config/site';
import { trackMonetizationEvent } from '@/lib/monetization/analytics';
import {
  getSessionStorageItem,
  isCooldownActive,
  markCooldownHit,
  setSessionStorageItem,
} from '@/lib/monetization/storage';
import type { AdRuntimeStatus, MonetizationBlockedReason } from '@/types/monetization';

type NativeRegistration = {
  id: string;
  placement: string;
  priority: number;
  host: HTMLElement;
  mountedAt: number;
  status: AdRuntimeStatus;
  onStatusChange?: (status: AdRuntimeStatus) => void;
};

type ScriptTriggerOptions = {
  placement: string;
  reason: string;
  trustedEvent?: Event;
};

type RuntimeState = {
  nativeRegistrations: Map<string, NativeRegistration>;
  activeNativeId: string | null;
  nativeArbitrationTimer: number | null;
  nativeRenderTimer: number | null;
  nativeObserver: MutationObserver | null;
  events: Array<Record<string, unknown>>;
};

declare global {
  interface Window {
    __OTK_ADSTERRA_RUNTIME__?: RuntimeState;
  }
}

const NATIVE_RENDER_TIMEOUT_MS = 9000;
const SESSION_POPUNDER_KEY = 'opentoolskit-adsterra-popunder-session-fired';
const SESSION_SOCIALBAR_KEY = 'opentoolskit-adsterra-socialbar-session-fired';

function getRuntime(): RuntimeState {
  window.__OTK_ADSTERRA_RUNTIME__ = window.__OTK_ADSTERRA_RUNTIME__ ?? {
    nativeRegistrations: new Map(),
    activeNativeId: null,
    nativeArbitrationTimer: null,
    nativeRenderTimer: null,
    nativeObserver: null,
    events: [],
  };

  return window.__OTK_ADSTERRA_RUNTIME__;
}

function recordRuntimeEvent(event: Record<string, unknown>) {
  const runtime = getRuntime();
  const payload = {
    ...event,
    timestamp: Date.now(),
    route: window.location.pathname,
  };

  runtime.events.push(payload);
}

function setNativeStatus(
  registration: NativeRegistration,
  status: AdRuntimeStatus,
  reason?: MonetizationBlockedReason,
) {
  registration.status = status;
  registration.host.dataset.otkAdStatus = status;
  registration.host.dataset.otkAdPlacement = registration.placement;

  if (reason) {
    registration.host.dataset.otkAdReason = reason;
  } else {
    delete registration.host.dataset.otkAdReason;
  }

  registration.onStatusChange?.(status);
  recordRuntimeEvent({
    kind: 'native',
    placement: registration.placement,
    status,
    reason,
  });
}

function cleanupNativeRuntimeTimers(runtime: RuntimeState) {
  if (runtime.nativeRenderTimer !== null) {
    window.clearTimeout(runtime.nativeRenderTimer);
    runtime.nativeRenderTimer = null;
  }

  runtime.nativeObserver?.disconnect();
  runtime.nativeObserver = null;
}

function markNativeRendered(registration: NativeRegistration) {
  const runtime = getRuntime();
  cleanupNativeRuntimeTimers(runtime);
  setNativeStatus(registration, 'rendered');
  trackMonetizationEvent({
    event: 'native_banner_rendered',
    placement: registration.placement,
    provider: 'adsterra',
    status: 'rendered',
  });
}

function scheduleNativeArbitration() {
  const runtime = getRuntime();

  if (runtime.nativeArbitrationTimer !== null) {
    window.clearTimeout(runtime.nativeArbitrationTimer);
  }

  runtime.nativeArbitrationTimer = window.setTimeout(() => {
    runtime.nativeArbitrationTimer = null;
    arbitrateNativeSlot();
  }, 80);
}

function arbitrateNativeSlot() {
  const runtime = getRuntime();
  const registrations = [...runtime.nativeRegistrations.values()].filter((registration) =>
    document.body.contains(registration.host),
  );

  if (registrations.length === 0) {
    runtime.activeNativeId = null;
    cleanupNativeRuntimeTimers(runtime);
    return;
  }

  const existingActive = runtime.activeNativeId
    ? registrations.find((registration) => registration.id === runtime.activeNativeId)
    : undefined;

  const selected =
    existingActive ??
    registrations.sort((a, b) => b.priority - a.priority || a.mountedAt - b.mountedAt)[0];

  runtime.activeNativeId = selected.id;

  for (const registration of registrations) {
    if (registration.id !== selected.id) {
      registration.host.textContent = '';
      setNativeStatus(registration, 'blocked', 'duplicate-native-zone');
      trackMonetizationEvent({
        event: 'monetization_blocked_reason',
        placement: registration.placement,
        provider: 'adsterra',
        status: 'blocked',
        reason: 'duplicate-native-zone',
      });
    }
  }

  if (selected.status !== 'idle') {
    return;
  }

  mountSelectedNativeSlot(selected);
}

function mountSelectedNativeSlot(registration: NativeRegistration) {
  const { nativeBanner } = siteConfig.ads.providers.adsterra;
  const runtime = getRuntime();

  cleanupNativeRuntimeTimers(runtime);
  registration.host.innerHTML = '';
  setNativeStatus(registration, 'mounting');
  trackMonetizationEvent({
    event: 'native_banner_mount_attempted',
    placement: registration.placement,
    provider: 'adsterra',
    status: 'mounting',
  });

  const script = document.createElement('script');
  script.async = true;
  script.setAttribute('data-cfasync', 'false');
  script.dataset.otkAdsterra = 'native-banner';
  script.dataset.otkPlacement = registration.placement;
  script.src = nativeBanner.scriptSrc;

  const container = document.createElement('div');
  container.id = nativeBanner.containerId;
  container.dataset.otkAdsterraContainer = 'native-banner';
  container.dataset.otkPlacement = registration.placement;
  container.style.minHeight = '120px';

  script.addEventListener('load', () => {
    setNativeStatus(registration, 'loaded');

    if (container.childElementCount > 0 || container.textContent?.trim()) {
      markNativeRendered(registration);
      return;
    }

    runtime.nativeObserver = new MutationObserver(() => {
      if (container.childElementCount > 0 || container.textContent?.trim()) {
        markNativeRendered(registration);
      }
    });
    runtime.nativeObserver.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  });

  script.addEventListener('error', () => {
    cleanupNativeRuntimeTimers(runtime);
    setNativeStatus(registration, 'failed', 'script-error');
    trackMonetizationEvent({
      event: 'native_banner_failed',
      placement: registration.placement,
      provider: 'adsterra',
      status: 'failed',
      reason: 'script-error',
    });
  });

  registration.host.appendChild(script);
  registration.host.appendChild(container);

  runtime.nativeRenderTimer = window.setTimeout(() => {
    if (registration.status === 'rendered') {
      return;
    }

    runtime.nativeObserver?.disconnect();
    runtime.nativeObserver = null;
    setNativeStatus(registration, 'no-fill-timeout', 'blocked-timeout');
    trackMonetizationEvent({
      event: 'native_banner_failed',
      placement: registration.placement,
      provider: 'adsterra',
      status: 'no-fill-timeout',
      reason: 'blocked-timeout',
    });
  }, NATIVE_RENDER_TIMEOUT_MS);
}

export function mountAdsterraNative({
  placement,
  priority,
  host,
  onStatusChange,
}: {
  placement: string;
  priority: number;
  host: HTMLElement;
  onStatusChange?: (status: AdRuntimeStatus) => void;
}) {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const runtime = getRuntime();
  const id = `${placement}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const registration: NativeRegistration = {
    id,
    placement,
    priority,
    host,
    mountedAt: Date.now(),
    status: 'idle',
    onStatusChange,
  };

  runtime.nativeRegistrations.set(id, registration);
  setNativeStatus(registration, 'idle');
  scheduleNativeArbitration();

  return () => {
    runtime.nativeRegistrations.delete(id);
    if (runtime.activeNativeId === id) {
      runtime.activeNativeId = null;
      cleanupNativeRuntimeTimers(runtime);
    }
    host.textContent = '';
    scheduleNativeArbitration();
  };
}

function isTrustedClick(trustedEvent?: Event) {
  if (!trustedEvent) {
    return false;
  }

  return trustedEvent.isTrusted || process.env.NODE_ENV !== 'production';
}

function injectScript(src: string, kind: string, placement: string) {
  if (document.querySelector(`script[data-otk-adsterra="${kind}"][src="${src}"]`)) {
    return false;
  }

  const script = document.createElement('script');
  script.setAttribute('data-cfasync', 'false');
  script.dataset.otkAdsterra = kind;
  script.dataset.otkPlacement = placement;
  script.src = src;
  script.async = false;
  script.addEventListener('load', () => {
    recordRuntimeEvent({ kind, placement, status: 'loaded' });
  });
  script.addEventListener('error', () => {
    recordRuntimeEvent({ kind, placement, status: 'failed' });
    trackMonetizationEvent({
      event: 'monetization_blocked_reason',
      placement,
      provider: 'adsterra',
      status: 'failed',
      reason: 'script-error',
    });
  });
  document.body.appendChild(script);
  return true;
}

export function triggerAdsterraPopunder({ placement, reason, trustedEvent }: ScriptTriggerOptions) {
  if (typeof window === 'undefined') {
    return false;
  }

  if (!siteConfig.ads.enabled || !siteConfig.ads.providers.adsterra.enabled) {
    return false;
  }

  if (!isTrustedClick(trustedEvent)) {
    trackMonetizationEvent({
      event: 'monetization_blocked_reason',
      placement,
      provider: 'adsterra',
      reason: 'untrusted-event',
    });
    return false;
  }

  const config = siteConfig.ads.providers.adsterra.popunder;
  const cooldownActive = isCooldownActive(
    config.cooldownStorageKey,
    siteConfig.monetizationRules.popunderCooldownHours,
  );
  const sessionFired = getSessionStorageItem(SESSION_POPUNDER_KEY) === 'true';

  if (cooldownActive || sessionFired) {
    trackMonetizationEvent({
      event: 'monetization_blocked_reason',
      placement,
      provider: 'adsterra',
      reason: 'cooldown',
    });
    return false;
  }

  const injected = injectScript(config.scriptSrc, 'popunder', placement);
  if (injected) {
    markCooldownHit(config.cooldownStorageKey);
    setSessionStorageItem(SESSION_POPUNDER_KEY, 'true');
    trackMonetizationEvent({
      event: 'popunder_triggered',
      placement,
      provider: 'adsterra',
      metadata: { reason },
    });
  }

  return injected;
}

export function triggerAdsterraSocialBar({ placement, reason }: Omit<ScriptTriggerOptions, 'trustedEvent'>) {
  if (typeof window === 'undefined') {
    return false;
  }

  if (!siteConfig.ads.enabled || !siteConfig.ads.providers.adsterra.enabled) {
    return false;
  }

  const config = siteConfig.ads.providers.adsterra.socialBar;
  const cooldownActive = isCooldownActive(
    config.cooldownStorageKey,
    siteConfig.monetizationRules.socialBarCooldownHours,
  );
  const sessionFired = getSessionStorageItem(SESSION_SOCIALBAR_KEY) === 'true';

  if (cooldownActive || sessionFired) {
    trackMonetizationEvent({
      event: 'monetization_blocked_reason',
      placement,
      provider: 'adsterra',
      reason: 'cooldown',
    });
    return false;
  }

  const injected = injectScript(config.scriptSrc, 'socialbar', placement);
  if (injected) {
    markCooldownHit(config.cooldownStorageKey);
    setSessionStorageItem(SESSION_SOCIALBAR_KEY, 'true');
    trackMonetizationEvent({
      event: 'socialbar_triggered',
      placement,
      provider: 'adsterra',
      metadata: { reason },
    });
  }

  return injected;
}

export function getAdsterraRuntimeSnapshot() {
  if (typeof window === 'undefined') {
    return null;
  }

  const runtime = getRuntime();
  return {
    activeNativeId: runtime.activeNativeId,
    nativeRegistrations: [...runtime.nativeRegistrations.values()].map((registration) => ({
      id: registration.id,
      placement: registration.placement,
      priority: registration.priority,
      status: registration.status,
    })),
    events: runtime.events,
  };
}

export function resetAdsterraRuntimeForTests() {
  if (typeof window === 'undefined') {
    return;
  }

  const runtime = getRuntime();
  cleanupNativeRuntimeTimers(runtime);
  runtime.nativeRegistrations.clear();
  runtime.activeNativeId = null;
  runtime.events = [];
  document.querySelectorAll('script[data-otk-adsterra]').forEach((script) => script.remove());
  const nativeContainer = document.getElementById(siteConfig.ads.providers.adsterra.nativeBanner.containerId);
  nativeContainer?.remove();
}
