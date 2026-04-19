'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { siteConfig } from '@/config/site';
import { mountAdsterraNative } from '@/lib/monetization/adsterra-runtime';
import PostResultSponsorCard from '@/components/common/PostResultSponsorCard';
import type { AdRuntimeStatus } from '@/types/monetization';

export interface AdsterraNativeBannerProps {
  className?: string;
  title?: string;
  description?: string;
  slotName?: string;
  priority?: number;
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
}: AdsterraNativeBannerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);
  const slotNameRef = useRef(slotName);
  const priorityRef = useRef<number>(0);
  const [status, setStatus] = useState<AdRuntimeStatus>('idle');
  const resolvedPriority = useMemo(
    () => priority ?? PRIORITY_BY_SLOT[slotName] ?? 10,
    [priority, slotName],
  );
  priorityRef.current = resolvedPriority;
  const showPartnerFallback = status === 'no-fill-timeout' || status === 'failed';
  const hideNativeHost = status === 'blocked' || showPartnerFallback;

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

    if (!siteConfig.ads.enabled || !siteConfig.ads.providers.adsterra.enabled) {
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

  if (!siteConfig.ads.enabled || !siteConfig.ads.providers.adsterra.enabled) {
    return null;
  }

  return (
    <section
      className={`rounded-[1.75rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-5 shadow-[var(--shadow-sm)] ${className}`.trim()}
      aria-label="Sponsored placement"
    >
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[hsl(var(--color-accent-soft))] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-accent-strong))]">
          {siteConfig.ads.disclosureLabel}
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
          Loading sponsored placement...
        </div>
      ) : null}
      {showPartnerFallback ? (
        <div data-testid="adsterra-native-fallback">
          <PostResultSponsorCard
            placementId="next-step"
            title="Sponsored partner option"
            description="Native inventory is not available right now. This partner route opens separately and keeps your current page intact."
            ctaLabel="View sponsored option"
            sourceId={`native-fallback:${slotName}:no-fill`}
            campaign="native-fallback"
            placementMeta={slotName}
            compact
            showHelperText={false}
            creative={{
              src: '/images/sponsors/file-convert.svg',
              alt: 'Sponsored fallback creative',
              eyebrow: 'Fallback',
            }}
            layout="banner"
          />
        </div>
      ) : null}
    </section>
  );
}

export default AdsterraNativeBanner;
