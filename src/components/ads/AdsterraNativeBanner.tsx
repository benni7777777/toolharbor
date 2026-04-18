'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { siteConfig } from '@/config/site';
import { mountAdsterraNative } from '@/lib/monetization/adsterra-runtime';
import PostResultSponsorCard from '@/components/common/PostResultSponsorCard';
import type { AdRuntimeStatus } from '@/types/monetization';

interface AdsterraNativeBannerProps {
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
  const [status, setStatus] = useState<AdRuntimeStatus>('idle');
  const resolvedPriority = useMemo(
    () => priority ?? PRIORITY_BY_SLOT[slotName] ?? 10,
    [priority, slotName],
  );
  const showPartnerFallback = status === 'no-fill-timeout' || status === 'failed';

  useEffect(() => {
    if (!siteConfig.ads.enabled || !siteConfig.ads.providers.adsterra.enabled) {
      return;
    }

    const host = hostRef.current;
    if (!host) {
      return;
    }

    return mountAdsterraNative({
      placement: slotName,
      priority: resolvedPriority,
      host,
      onStatusChange: setStatus,
    });
  }, [resolvedPriority, slotName]);

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
      ) : (
        <div
          ref={hostRef}
          className={status === 'blocked' ? 'hidden' : 'min-h-[120px]'}
          data-testid="adsterra-native-host"
          data-otk-ad-status={status}
          data-otk-ad-placement={slotName}
        >
          {status === 'blocked' ? null : (
            <div className="text-xs text-[hsl(var(--color-muted-foreground))]">
              {status === 'idle' || status === 'mounting' ? 'Loading sponsored placement...' : null}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default AdsterraNativeBanner;
