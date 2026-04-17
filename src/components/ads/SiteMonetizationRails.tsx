'use client';

import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import PostResultSponsorCard from '@/components/common/PostResultSponsorCard';
import { siteConfig } from '@/config/site';
import { useMonetizationProfile } from '@/hooks/useMonetizationProfile';

function getPathContext(pathname: string | null) {
  const segments = (pathname ?? '').split('/').filter(Boolean);
  const locale = segments[0] || siteConfig.defaultLocale;
  const toolsIndex = segments.indexOf('tools');
  const toolSlug = toolsIndex >= 0 ? segments[toolsIndex + 1] : undefined;
  const pageType = toolSlug ? 'tool' : segments[1] || segments[0] || 'home';

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

  return (
    <>
      <aside
        className="pointer-events-none fixed left-4 top-32 z-30 hidden w-56 min-[1800px]:block"
        aria-label="Sponsored left rail"
      >
        <div className="pointer-events-auto space-y-3">
          <PostResultSponsorCard
            placementId="next-step"
            title="Optional partner route"
            description="A separate sponsored path opens in a new tab while the tools stay available here."
            ctaLabel="Open"
            toolSlug={tool}
            sourceId={railSource}
            campaign="site-left-rail"
            placementMeta={context.pageType}
            compact
            showHelperText={false}
          />
        </div>
      </aside>

      <aside
        className="pointer-events-none fixed right-4 top-32 z-30 hidden w-56 min-[1800px]:block"
        aria-label="Sponsored right rail"
      >
        <div className="pointer-events-auto space-y-3">
          <PostResultSponsorCard
            placementId="upload-offer"
            title="Sponsored workflow"
            description="Compare another off-site option after using the free browser tools."
            ctaLabel="View"
            toolSlug={tool}
            sourceId={railSource}
            campaign="site-right-rail"
            placementMeta={context.pageType}
            compact
            showHelperText={false}
          />
        </div>
      </aside>

      {!mobileDismissed && (
        <div className="fixed inset-x-3 bottom-3 z-[70] lg:hidden">
          <div className="relative mx-auto max-w-md">
            <button
              type="button"
              onClick={() => setMobileDismissed(true)}
              className="absolute -right-2 -top-2 z-10 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-1 text-[hsl(var(--color-muted-foreground))] shadow-[var(--shadow-sm)]"
              aria-label="Dismiss sponsored suggestion"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
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
            />
          </div>
        </div>
      )}
    </>
  );
}

export default SiteMonetizationRails;
