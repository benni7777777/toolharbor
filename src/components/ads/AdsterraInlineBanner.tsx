'use client';

import { useCallback, useMemo, useState } from 'react';
import { siteConfig } from '@/config/site';
import { AdsterraDisplayBanner } from '@/components/ads/AdsterraDisplayBanner';

export interface AdsterraInlineBannerProps {
  className?: string;
}

export function AdsterraInlineBanner({ className = '' }: AdsterraInlineBannerProps) {
  const { leaderboard, banner468x60 } = siteConfig.ads.providers.adsterra.displayBanners;
  const [collapsedSlots, setCollapsedSlots] = useState<Set<string>>(() => new Set());
  const enabledSlots = useMemo(() => [
    leaderboard.enabled ? 'leaderboard' : null,
    banner468x60.enabled ? 'banner468x60' : null,
  ].filter((slot): slot is string => Boolean(slot)), [banner468x60.enabled, leaderboard.enabled]);
  const handleCollapse = useCallback((slot: string) => {
    setCollapsedSlots((current) => {
      const next = new Set(current);
      next.add(slot);
      return next;
    });
  }, []);

  if (enabledSlots.length === 0 || enabledSlots.every((slot) => collapsedSlots.has(slot))) {
    return null;
  }

  return (
    <div className={`flex justify-center overflow-visible ${className}`.trim()} aria-label="Inline advertising">
      {leaderboard.enabled && (
        <AdsterraDisplayBanner
          slot="leaderboard"
          className="hidden min-[900px]:block"
          onCollapse={handleCollapse}
        />
      )}
      {banner468x60.enabled && (
        <AdsterraDisplayBanner
          slot="banner468x60"
          className="hidden sm:block min-[900px]:hidden"
          onCollapse={handleCollapse}
        />
      )}
    </div>
  );
}

export default AdsterraInlineBanner;
