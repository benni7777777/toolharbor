'use client';

import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/config/site';
import { trackMonetizationEvent } from '@/lib/monetization/analytics';
import type { AdRuntimeStatus } from '@/types/monetization';

type DisplayBannerSlot = keyof typeof siteConfig.ads.providers.adsterra.displayBanners;

export interface AdsterraDisplayBannerProps {
  slot: DisplayBannerSlot;
  className?: string;
  collapseOnNoFill?: boolean;
  onCollapse?: (slot: DisplayBannerSlot, reason: string) => void;
}

const DISPLAY_RENDER_TIMEOUT_MS = 5000;

declare global {
  interface Window {
    atOptions?: unknown;
    __OTK_ADSTERRA_DISPLAY_CHAIN__?: Promise<void>;
  }
}

function hasAdCreative(container: HTMLElement) {
  return Array.from(container.childNodes).some((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return Boolean(node.textContent?.trim());
    }

    if (node instanceof HTMLScriptElement) {
      return false;
    }

    return true;
  });
}

function enqueueDisplayInjection(task: () => Promise<void>) {
  const previous = window.__OTK_ADSTERRA_DISPLAY_CHAIN__ ?? Promise.resolve();
  const next = previous.catch(() => undefined).then(task);

  window.__OTK_ADSTERRA_DISPLAY_CHAIN__ = next.catch(() => undefined).then(() => undefined);
  return next;
}

function isViewportAllowed(minViewportWidth?: number, maxViewportWidth?: number) {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return true;
  }

  const queries = [
    minViewportWidth ? `(min-width: ${minViewportWidth}px)` : null,
    maxViewportWidth ? `(max-width: ${maxViewportWidth}px)` : null,
  ].filter(Boolean);

  return queries.length === 0 || window.matchMedia(queries.join(' and ')).matches;
}

function useViewportAllowed(minViewportWidth?: number, maxViewportWidth?: number) {
  const [allowed, setAllowed] = useState(() => isViewportAllowed(minViewportWidth, maxViewportWidth));

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const queries = [
      minViewportWidth ? `(min-width: ${minViewportWidth}px)` : null,
      maxViewportWidth ? `(max-width: ${maxViewportWidth}px)` : null,
    ].filter(Boolean);

    if (queries.length === 0) {
      setAllowed(true);
      return;
    }

    const mediaQuery = window.matchMedia(queries.join(' and '));
    const handleChange = () => setAllowed(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [maxViewportWidth, minViewportWidth]);

  return allowed;
}

export function AdsterraDisplayBanner({
  slot,
  className = '',
  collapseOnNoFill = true,
  onCollapse,
}: AdsterraDisplayBannerProps) {
  const slotConfig = siteConfig.ads.providers.adsterra.displayBanners[slot];
  const slotRef = useRef(slot);
  const slotConfigRef = useRef(slotConfig);
  const loadedRef = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);
  const onCollapseRef = useRef(onCollapse);
  const [status, setStatus] = useState<AdRuntimeStatus>('idle');
  const [failureReason, setFailureReason] = useState<string | null>(null);
  const viewportAllowed = useViewportAllowed(
    slotConfig.minViewportWidth,
    slotConfig.maxViewportWidth,
  );

  useEffect(() => {
    onCollapseRef.current = onCollapse;
  }, [onCollapse]);

  useEffect(() => {
    if (loadedRef.current) {
      return;
    }

    const currentSlot = slotRef.current;
    const currentSlotConfig = slotConfigRef.current;

    if (
      !siteConfig.ads.enabled
      || !siteConfig.ads.providers.adsterra.enabled
      || !viewportAllowed
      || !currentSlotConfig.enabled
      || !currentSlotConfig.scriptSrc
      || !currentSlotConfig.containerId
    ) {
      return;
    }

    const container = document.getElementById(currentSlotConfig.containerId);
    if (!(container instanceof HTMLDivElement)) {
      return;
    }

    loadedRef.current = true;
    container.dataset.otkAdsterraDisplayMounted = 'true';
    container.dataset.otkAdStatus = 'mounting';
    container.innerHTML = '';
    container.style.width = `${currentSlotConfig.width}px`;
    container.style.height = `${currentSlotConfig.height}px`;
    container.style.overflow = 'visible';

    trackMonetizationEvent({
      event: 'ad_slot_mount',
      placement: currentSlot,
      provider: 'adsterra',
      metadata: {
        unit: 'display-banner',
        scriptSrc: currentSlotConfig.scriptSrc,
        width: currentSlotConfig.width,
        height: currentSlotConfig.height,
        containerId: currentSlotConfig.containerId,
      },
    });
    trackMonetizationEvent({
      event: 'display_banner_mount_attempted',
      placement: currentSlot,
      provider: 'adsterra',
      metadata: {
        scriptSrc: currentSlotConfig.scriptSrc,
        width: currentSlotConfig.width,
        height: currentSlotConfig.height,
      },
    });

    const inlineOptions = document.createElement('script');
    inlineOptions.type = 'text/javascript';
    inlineOptions.text = [
      `window.atOptions = ${JSON.stringify(currentSlotConfig.atOptions)};`,
      'var atOptions = window.atOptions;',
    ].join('\n');

    const script = document.createElement('script');
    script.src = currentSlotConfig.scriptSrc;
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.dataset.otkAdsterraDisplay = currentSlot;

    let renderSettled = false;
    let failureLogged = false;
    setStatus('mounting');
    setFailureReason(null);

    const markRenderSuccess = () => {
      if (renderSettled || !hasAdCreative(container)) {
        return;
      }

      renderSettled = true;
      cleanupRef.current?.();
      cleanupRef.current = null;
      setStatus('rendered');
      setFailureReason(null);
      container.dataset.otkAdStatus = 'rendered';
      trackMonetizationEvent({
        event: 'ad_render_success',
        placement: currentSlot,
        provider: 'adsterra',
        status: 'rendered',
        metadata: {
          unit: 'display-banner',
          containerId: currentSlotConfig.containerId,
          width: currentSlotConfig.width,
          height: currentSlotConfig.height,
        },
      });
      trackMonetizationEvent({
        event: 'network_ad_rendered',
        placement: currentSlot,
        provider: 'adsterra',
        status: 'rendered',
        metadata: {
          surface: 'networkAd',
          unit: 'display-banner',
          containerId: currentSlotConfig.containerId,
          width: currentSlotConfig.width,
          height: currentSlotConfig.height,
        },
      });
    };
    const markRenderFailed = (reason: string) => {
      if (renderSettled || failureLogged) {
        return;
      }

      failureLogged = true;
      cleanupRef.current?.();
      cleanupRef.current = null;
      setStatus('failed');
      setFailureReason(reason);
      container.dataset.otkAdStatus = 'failed';
      container.dataset.otkAdReason = reason;
      container.innerHTML = '';
      trackMonetizationEvent({
        event: 'ad_render_failed',
        placement: currentSlot,
        provider: 'adsterra',
        status: 'failed',
        reason,
        metadata: {
          unit: 'display-banner',
          containerId: currentSlotConfig.containerId,
          width: currentSlotConfig.width,
          height: currentSlotConfig.height,
          childNodeCount: container.childNodes.length,
          hasScript: Boolean(container.querySelector('script')),
        },
      });
      trackMonetizationEvent({
        event: 'network_ad_failed',
        placement: currentSlot,
        provider: 'adsterra',
        status: 'failed',
        reason,
        metadata: {
          surface: 'networkAd',
          unit: 'display-banner',
          containerId: currentSlotConfig.containerId,
          width: currentSlotConfig.width,
          height: currentSlotConfig.height,
          childNodeCount: container.childNodes.length,
          hasScript: Boolean(container.querySelector('script')),
        },
      });
      trackMonetizationEvent({
        event: 'fallback_shown',
        placement: currentSlot,
        provider: 'adsterra',
        status: 'failed',
        reason,
        metadata: {
          surface: 'fallback',
          fallbackType: 'display-banner-collapsed',
          collapsed: collapseOnNoFill,
          containerId: currentSlotConfig.containerId,
          width: currentSlotConfig.width,
          height: currentSlotConfig.height,
        },
      });

      if (collapseOnNoFill) {
        onCollapseRef.current?.(currentSlot, reason);
      }
    };
    const observer = new MutationObserver(markRenderSuccess);
    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    script.addEventListener('load', () => {
      if (!renderSettled && !failureLogged) {
        setStatus('loaded');
        container.dataset.otkAdStatus = 'loaded';
      }

      trackMonetizationEvent({
        event: 'display_banner_loaded',
        placement: currentSlot,
        provider: 'adsterra',
      });
      markRenderSuccess();
    });
    script.addEventListener('error', () => {
      trackMonetizationEvent({
        event: 'display_banner_failed',
        placement: currentSlot,
        provider: 'adsterra',
        reason: 'script-error',
      });
      markRenderFailed('script-error');
    });

    let renderTimer: number | null = null;
    let cancelled = false;

    enqueueDisplayInjection(() => new Promise<void>((resolve) => {
      if (cancelled || !document.body.contains(container)) {
        resolve();
        return;
      }

      const releaseQueue = () => {
        window.clearTimeout(queueTimer);
        resolve();
      };
      const queueTimer = window.setTimeout(releaseQueue, DISPLAY_RENDER_TIMEOUT_MS + 2500);

      script.addEventListener('load', releaseQueue, { once: true });
      script.addEventListener('error', releaseQueue, { once: true });

      container.appendChild(inlineOptions);
      container.appendChild(script);
      trackMonetizationEvent({
        event: 'ad_script_injected',
        placement: currentSlot,
        provider: 'adsterra',
        metadata: {
          unit: 'display-banner',
          scriptSrc: currentSlotConfig.scriptSrc,
          target: currentSlotConfig.containerId,
        },
      });

      renderTimer = window.setTimeout(() => {
        if (hasAdCreative(container)) {
          markRenderSuccess();
          return;
        }

        markRenderFailed('empty-timeout');
      }, DISPLAY_RENDER_TIMEOUT_MS);
    }));

    cleanupRef.current = () => {
      cancelled = true;
      observer.disconnect();
      if (renderTimer !== null) {
        window.clearTimeout(renderTimer);
      }
    };

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
      loadedRef.current = false;
    };
  }, [collapseOnNoFill, viewportAllowed]);

  if (
    !siteConfig.ads.enabled
    || !siteConfig.ads.providers.adsterra.enabled
    || !slotConfig.enabled
    || !slotConfig.containerId
    || !viewportAllowed
  ) {
    return null;
  }

  if (collapseOnNoFill && status === 'failed') {
    return null;
  }

  return (
    <section
      className={`relative z-20 rounded-md border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] ${className}`.trim()}
      aria-label={slotConfig.label}
      data-otk-monetization-surface="networkAd"
      data-otk-ad-status={status}
      data-otk-ad-reason={failureReason ?? undefined}
      style={{
        width: slotConfig.width,
        minHeight: slotConfig.height,
        overflow: 'visible',
      }}
    >
      <div
        id={slotConfig.containerId}
        className="mx-auto block"
        style={{
          width: slotConfig.width,
          height: slotConfig.height,
          minWidth: slotConfig.width,
          minHeight: slotConfig.height,
          overflow: 'visible',
        }}
      />
    </section>
  );
}

export default AdsterraDisplayBanner;
