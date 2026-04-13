'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { siteConfig } from '@/config/site';
import { useToolContext } from '@/lib/contexts/ToolContext';
import { trackMonetizationEvent } from '@/lib/monetization/analytics';

interface PostResultSponsorCardProps {
  placementId?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  href?: string;
  onSponsorClick?: () => void;
}

export function PostResultSponsorCard({
  placementId = 'post-result-primary',
  title = 'Useful next step for your document workflow',
  description = 'Open a vetted partner offer in a new tab. Your download stays available whether you open it or not.',
  ctaLabel = 'Open partner site',
  href,
  onSponsorClick,
}: PostResultSponsorCardProps) {
  const toolContext = useToolContext();
  const linkHref =
    href ??
    `${siteConfig.sponsorship.redirectPathPrefix}/${placementId}?tool=${toolContext?.toolSlug ?? 'unknown'}&placement=${placementId}&provider=${siteConfig.ads.providers.partnerRedirect.providerQueryValue}`;

  return (
    <Card className="border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-4 shadow-[var(--shadow-sm)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center rounded-full bg-[hsl(var(--color-accent-soft))] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-accent-strong))]">
            {siteConfig.sponsorship.label}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[hsl(var(--color-foreground))]">{title}</h3>
            <p className="mt-1 text-sm text-[hsl(var(--color-muted-foreground))]">{description}</p>
          </div>
          <p className="text-xs text-[hsl(var(--color-muted-foreground))]">{siteConfig.sponsorship.disclosure}</p>
        </div>
        <a
          href={linkHref}
          target="_blank"
          rel="noreferrer noopener sponsored"
          onClick={() => {
            trackMonetizationEvent({
              event: 'partner_click',
              placement: placementId,
              provider: siteConfig.ads.providers.partnerRedirect.providerName,
              tool: toolContext?.toolSlug,
            });
            onSponsorClick?.();
          }}
          className="inline-flex min-w-fit items-center justify-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-subtle))] px-4 py-2 text-sm font-medium text-[hsl(var(--color-foreground))] transition-colors hover:border-[hsl(var(--color-accent-strong))] hover:text-[hsl(var(--color-accent-strong))]"
        >
          <span>{ctaLabel}</span>
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      <p className="mt-3 text-xs text-[hsl(var(--color-muted-foreground))]">{siteConfig.sponsorship.helperText}</p>
    </Card>
  );
}

export default PostResultSponsorCard;
