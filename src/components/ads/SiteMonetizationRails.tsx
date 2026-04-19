'use client';

import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { AdsterraDisplayBanner } from '@/components/ads/DynamicAdsterraComponents';
import PostResultSponsorCard from '@/components/common/PostResultSponsorCard';
import { siteConfig } from '@/config/site';
import { useMonetizationProfile } from '@/hooks/useMonetizationProfile';

function getPathContext(pathname: string | null) {
  const segments = (pathname ?? '').split('/').filter(Boolean);
  const locale = segments[0] || siteConfig.defaultLocale;
  const toolsIndex = segments.indexOf('tools');
  const toolSlug = toolsIndex >= 0 ? segments[toolsIndex + 1] : undefined;
  const pageType = toolSlug ? 'tool' : segments[1] || 'home';

  return {
    locale,
    pageType,
    toolSlug,
    routeKey: segments.join(':') || 'home',
  };
}

export function SiteMonetizationRails() {
  const pathname = usePathname();
  const monetizationProfile = useMonetizationProfile();
  const [mobileDismissed, setMobileDismissed] = useState(false);
  const context = useMemo(() => getPathContext(pathname), [pathname]);

  if (!siteConfig.ads.enabled || !siteConfig.sponsorship.enabled || monetizationProfile.previewMode === 'off') {
    return null;
  }

  const railSource = `site:${context.routeKey}:rail:contextual-soft:soft-bordered`;
  const mobileSource = `site:${context.routeKey}:mobile-strip:contextual-soft:soft-bordered`;
  const tool = context.toolSlug ?? context.pageType;
  const leftCreative = {
    src: '/images/sponsors/secure-route.svg',
    alt: 'Sponsored partner route creative',
    eyebrow: 'Partner',
  };
  const rightCreative = {
    src: '/images/sponsors/workflow-boost.svg',
    alt: 'Sponsored workflow creative',
    eyebrow: 'Workflow',
  };
  const leftRailDisplayEnabled = siteConfig.ads.providers.adsterra.displayBanners.leftRail.enabled;
  const rightRailDisplayEnabled = siteConfig.ads.providers.adsterra.displayBanners.rightRail.enabled;
  const mobileStickyDisplayEnabled = siteConfig.ads.providers.adsterra.displayBanners.mobileSticky.enabled;

  return (
    <>
      <aside
        className="pointer-events-none fixed left-4 top-32 z-30 hidden w-56 min-[1800px]:w-72 xl:block"
        aria-label="Sponsored left rail"
      >
        <div className="pointer-events-auto flex justify-center">
          {leftRailDisplayEnabled ? (
            <AdsterraDisplayBanner slot="leftRail" />
          ) : (
            <PostResultSponsorCard
              placementId="next-step"
              title="Open a sponsored route"
              description="A separate partner option opens in a new tab while this tool stays ready."
              ctaLabel="Open route"
              toolSlug={tool}
              sourceId={railSource}
              campaign="site-left-rail"
              placementMeta={context.pageType}
              compact
              showHelperText={false}
              creative={leftCreative}
              layout="rectangle"
            />
          )}
        </div>
      </aside>

      <aside
        className="pointer-events-none fixed right-4 top-32 z-30 hidden w-56 min-[1800px]:w-72 xl:block"
        aria-label="Sponsored right rail"
      >
        <div className="pointer-events-auto flex justify-center">
          {rightRailDisplayEnabled ? (
            <AdsterraDisplayBanner slot="rightRail" />
          ) : (
            <PostResultSponsorCard
              placementId="upload-offer"
              title="Compare a workflow offer"
              description="Check another sponsored path after using the free browser tools."
              ctaLabel="View offer"
              toolSlug={tool}
              sourceId={railSource}
              campaign="site-right-rail"
              placementMeta={context.pageType}
              compact
              showHelperText={false}
              creative={rightCreative}
              layout="rectangle"
            />
          )}
        </div>
      </aside>

      {!mobileDismissed && monetizationProfile.allowAggressiveUnits && (
        <div className="fixed inset-x-3 bottom-3 z-[70] lg:hidden">
          <div className="relative mx-auto flex max-w-md justify-center overflow-visible">
            <button
              type="button"
              onClick={() => setMobileDismissed(true)}
              className="absolute -right-2 -top-2 z-10 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-1 text-[hsl(var(--color-muted-foreground))] shadow-[var(--shadow-sm)]"
              aria-label="Dismiss sponsored suggestion"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            {mobileStickyDisplayEnabled ? (
              <AdsterraDisplayBanner slot="mobileSticky" className="shadow-[var(--shadow-lg)]" />
            ) : (
              <PostResultSponsorCard
                placementId="next-step"
                title="Sponsored option"
                description="Optional partner link. Your current page stays open."
                ctaLabel="Open"
                toolSlug={tool}
                sourceId={mobileSource}
                campaign="site-mobile-strip"
                placementMeta={tool}
                compact
                showHelperText={false}
                className="shadow-[var(--shadow-lg)]"
                creative={{
                  src: '/images/sponsors/file-convert.svg',
                  alt: 'Sponsored mobile offer creative',
                  eyebrow: 'Mobile',
                }}
                layout="banner"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default SiteMonetizationRails;
