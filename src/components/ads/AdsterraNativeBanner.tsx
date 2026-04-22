'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { siteConfig } from '@/config/site';
import { trackMonetizationEvent } from '@/lib/monetization/analytics';
import { mountAdsterraNative } from '@/lib/monetization/adsterra-runtime';
import type { AdRuntimeStatus } from '@/types/monetization';

export interface AdsterraNativeBannerProps {
  className?: string;
  title?: string;
  description?: string;
  slotName?: string;
  priority?: number;
  collapseOnNoFill?: boolean;
}

const PRIORITY_BY_SLOT: Record<string, number> = {
  'result-gate': 100,
  'result-drawer': 95,
  'tool-page-native': 70,
  'tools-index-native': 60,
  'category-native': 55,
  'homepage-native': 40,
  'info-native': 25,
};

export function AdsterraNativeBanner({
  className = '',
  title = 'Partner suggestion',
  description = 'Ads and partner offers help keep OpenToolsKit open source.',
  slotName = 'native-banner',
  priority,
  collapseOnNoFill = false,
}: AdsterraNativeBannerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const fallbackLoggedRef = useRef<string | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const slotNameRef = useRef(slotName);
  const priorityRef = useRef<number>(0);
  const [status, setStatus] = useState<AdRuntimeStatus>('idle');
  const resolvedPriority = useMemo(
    () => priority ?? PRIORITY_BY_SLOT[slotName] ?? 10,
    [priority, slotName],
  );
  priorityRef.current = resolvedPriority;
  const showNetworkFallback = status === 'no-fill-timeout' || status === 'failed';
  const hideNativeHost = status === 'blocked' || showNetworkFallback;
  const shouldCollapse = collapseOnNoFill && hideNativeHost;

  function cleanupWhenDetached() {
    window.setTimeout(() => {
      const host = hostRef.current;

      if (host && document.body.contains(host)) {
        return;
      }

      cleanupRef.current?.();
      cleanupRef.current = null;
      loadedRef.current = false;
    }, 0);
  }

  useEffect(() => {
    if (loadedRef.current) {
      return cleanupWhenDetached;
    }

    if (
      !siteConfig.ads.enabled
      || !siteConfig.ads.providers.adsterra.enabled
      || !siteConfig.ads.providers.adsterra.nativeBanner.enabled
    ) {
      return;
    }

    const host = hostRef.current;
    if (!host) {
      return;
    }

    loadedRef.current = true;
    cleanupRef.current = mountAdsterraNative({
      placement: slotNameRef.current,
      priority: priorityRef.current,
      host,
      onStatusChange: setStatus,
    });

    return cleanupWhenDetached;
  }, []);

  useEffect(() => {
    if (!showNetworkFallback || fallbackLoggedRef.current === status) {
      return;
    }

    fallbackLoggedRef.current = status;
    trackMonetizationEvent({
      event: 'fallback_shown',
      placement: slotName,
      provider: 'adsterra',
      status,
      reason: status === 'failed' ? 'script-error' : 'blocked-timeout',
      metadata: {
        surface: 'fallback',
        fallbackType: 'native-banner-no-fill',
        collapsed: collapseOnNoFill,
      },
    });
  }, [collapseOnNoFill, showNetworkFallback, slotName, status]);

  if (
    !siteConfig.ads.enabled
    || !siteConfig.ads.providers.adsterra.enabled
    || !siteConfig.ads.providers.adsterra.nativeBanner.enabled
  ) {
    return null;
  }

  if (shouldCollapse) {
    return null;
  }

  return (
    <section
      className={`rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-4 shadow-[var(--shadow-sm)] ${className}`.trim()}
      aria-label="Network ad placement"
      data-otk-monetization-surface="networkAd"
    >
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-subtle))] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-muted-foreground))]">
          Ad
        </span>
        <p className="text-sm font-semibold text-[hsl(var(--color-foreground))]">{title}</p>
      </div>
      <p className="mb-4 max-w-3xl text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
        {description} {siteConfig.ads.actionDisclosure}
      </p>
      <div
        ref={hostRef}
        className={hideNativeHost ? 'h-0 min-h-0 overflow-visible' : 'min-h-[120px] overflow-visible'}
        data-testid="adsterra-native-host"
        data-otk-ad-status={status}
        data-otk-ad-placement={slotName}
        aria-hidden={hideNativeHost}
      />
      {status === 'idle' || status === 'mounting' ? (
        <div className="text-xs text-[hsl(var(--color-muted-foreground))]">
          Checking network ad availability...
        </div>
      ) : null}
      {showNetworkFallback ? (
        <div
          className="rounded-md border border-dashed border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-subtle))] p-4 text-sm text-[hsl(var(--color-muted-foreground))]"
          data-testid="adsterra-native-fallback"
          data-otk-monetization-surface="fallback"
        >
          <p className="font-semibold text-[hsl(var(--color-foreground))]">Network ad unavailable</p>
          <p className="mt-1 text-xs leading-5">
            No third-party ad filled this placement. This placeholder is not a partner offer.
          </p>
        </div>
      ) : null}
    </section>
  );
}

export default AdsterraNativeBanner;
