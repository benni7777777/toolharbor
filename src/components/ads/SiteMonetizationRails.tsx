'use client';

import { useCallback, useState } from 'react';
import { X } from 'lucide-react';
import { AdsterraDisplayBanner } from '@/components/ads/DynamicAdsterraComponents';
import { siteConfig } from '@/config/site';
import { useMonetizationProfile } from '@/hooks/useMonetizationProfile';

export function SiteMonetizationRails() {
  const monetizationProfile = useMonetizationProfile();
  const [mobileDismissed, setMobileDismissed] = useState(false);
  const [collapsedSlots, setCollapsedSlots] = useState<Set<string>>(() => new Set());
  const handleCollapse = useCallback((slot: string) => {
    setCollapsedSlots((current) => {
      const next = new Set(current);
      next.add(slot);
      return next;
    });
  }, []);

  if (!siteConfig.ads.enabled || monetizationProfile.previewMode === 'off') {
    return null;
  }

  const leftRailDisplayEnabled = siteConfig.ads.providers.adsterra.displayBanners.leftRail.enabled;
  const rightRailDisplayEnabled = siteConfig.ads.providers.adsterra.displayBanners.rightRail.enabled;
  const mobileStickyDisplayEnabled = siteConfig.ads.providers.adsterra.displayBanners.mobileSticky.enabled;
  const showLeftRail = leftRailDisplayEnabled && !collapsedSlots.has('leftRail');
  const showRightRail = rightRailDisplayEnabled && !collapsedSlots.has('rightRail');
  const showMobileSticky = !mobileDismissed
    && monetizationProfile.allowAggressiveUnits
    && mobileStickyDisplayEnabled
    && !collapsedSlots.has('mobileSticky');

  if (!showLeftRail && !showRightRail && !showMobileSticky) {
    return null;
  }

  return (
    <>
      {showLeftRail && (
        <aside
          className="pointer-events-none fixed left-4 top-32 z-20 hidden w-56 min-[1800px]:w-72 xl:block"
          aria-label="Sponsored left rail"
        >
          <div className="pointer-events-auto flex justify-center">
            <AdsterraDisplayBanner slot="leftRail" onCollapse={handleCollapse} />
          </div>
        </aside>
      )}

      {showRightRail && (
        <aside
          className="pointer-events-none fixed right-4 top-32 z-20 hidden w-56 min-[1800px]:w-72 xl:block"
          aria-label="Sponsored right rail"
        >
          <div className="pointer-events-auto flex justify-center">
            <AdsterraDisplayBanner slot="rightRail" onCollapse={handleCollapse} />
          </div>
        </aside>
      )}

      {showMobileSticky && (
        <div className="fixed inset-x-3 bottom-3 z-40 lg:hidden">
          <div className="relative mx-auto flex max-w-md justify-center overflow-visible">
            <button
              type="button"
              onClick={() => setMobileDismissed(true)}
              className="absolute -right-2 -top-2 z-10 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-1 text-[hsl(var(--color-muted-foreground))] shadow-[var(--shadow-sm)]"
              aria-label="Dismiss sponsored suggestion"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <AdsterraDisplayBanner
              slot="mobileSticky"
              className="shadow-[var(--shadow-lg)]"
              onCollapse={handleCollapse}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default SiteMonetizationRails;
