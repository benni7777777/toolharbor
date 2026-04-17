'use client';

import React, { useEffect, useMemo, useState } from 'react';
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
  toolSlug?: string;
  sourceId?: string;
  campaign?: string;
  placementMeta?: string;
  compact?: boolean;
  className?: string;
  showHelperText?: boolean;
  onSponsorClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const SPONSOR_SESSION_STORAGE_KEY = 'otk-sponsored-session-id';

function createSponsorToken() {
  return Math.random().toString(36).slice(2, 10);
}

function getSponsorSessionId() {
  if (typeof window === 'undefined') {
    return null;
  }

  const existing = window.sessionStorage.getItem(SPONSOR_SESSION_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const sessionId = `${Date.now().toString(36)}-${createSponsorToken()}`;
  window.sessionStorage.setItem(SPONSOR_SESSION_STORAGE_KEY, sessionId);
  return sessionId;
}

function buildLocalSponsorClickId() {
  const sessionId = getSponsorSessionId();
  if (!sessionId) {
    return null;
  }

  return `${sessionId}-${createSponsorToken()}`;
}

export function PostResultSponsorCard({
  placementId = 'post-result-primary',
  title = 'Useful next step for your document workflow',
  description = 'Open a vetted partner offer in a new tab. Your download stays available whether you open it or not.',
  ctaLabel = 'Open partner site',
  href,
  toolSlug: propToolSlug,
  sourceId,
  campaign,
  placementMeta,
  compact = false,
  className = '',
  showHelperText = true,
  onSponsorClick,
}: PostResultSponsorCardProps) {
  const toolContext = useToolContext();
  const [clickId, setClickId] = useState<string | null>(null);
  const toolSlug = propToolSlug ?? toolContext?.toolSlug ?? 'unknown';
  const resolvedSourceId = sourceId ?? `tool:${toolSlug}:${placementId}:contextual-soft:soft-bordered`;
  const linkHref = useMemo(() => {
    if (href) {
      return href;
    }

    const params = new URLSearchParams({
      tool: toolSlug,
      placement: placementId,
      provider: siteConfig.ads.providers.partnerRedirect.providerQueryValue,
      source: resolvedSourceId,
    });

    if (campaign) {
      params.set('campaign', campaign);
    }

    if (placementMeta) {
      params.set('placementMeta', placementMeta);
    }

    if (clickId) {
      params.set('subId', clickId);
    }

    return `${siteConfig.sponsorship.redirectPathPrefix}/${placementId}?${params.toString()}`;
  }, [campaign, clickId, href, placementId, placementMeta, resolvedSourceId, toolSlug]);

  useEffect(() => {
    setClickId(buildLocalSponsorClickId());
  }, [placementId, resolvedSourceId]);

  const cardClassName = `border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] shadow-[var(--shadow-sm)] ${compact ? 'p-3' : 'p-4'} ${className}`.trim();
  const bodyClassName = compact
    ? 'flex flex-col gap-3'
    : 'flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between';
  const ctaClassName = compact
    ? 'inline-flex w-full items-center justify-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-subtle))] px-3 py-2 text-xs font-medium text-[hsl(var(--color-foreground))] transition-colors hover:border-[hsl(var(--color-accent-strong))] hover:text-[hsl(var(--color-accent-strong))]'
    : 'inline-flex min-w-fit items-center justify-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-subtle))] px-4 py-2 text-sm font-medium text-[hsl(var(--color-foreground))] transition-colors hover:border-[hsl(var(--color-accent-strong))] hover:text-[hsl(var(--color-accent-strong))]';

  return (
    <Card className={cardClassName}>
      <div className={bodyClassName}>
        <div className="space-y-2">
          <div className="inline-flex items-center rounded-full bg-[hsl(var(--color-accent-soft))] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-accent-strong))]">
            {siteConfig.sponsorship.label}
          </div>
          <div>
            <h3 className={`${compact ? 'text-xs' : 'text-sm'} font-semibold text-[hsl(var(--color-foreground))]`}>{title}</h3>
            <p className={`mt-1 ${compact ? 'text-xs leading-5' : 'text-sm'} text-[hsl(var(--color-muted-foreground))]`}>{description}</p>
          </div>
          {!compact && (
            <p className="text-xs text-[hsl(var(--color-muted-foreground))]">{siteConfig.sponsorship.disclosure}</p>
          )}
        </div>
        <a
          href={linkHref}
          target="_blank"
          rel="sponsored nofollow noreferrer noopener"
          onClick={(event) => {
            trackMonetizationEvent({
              event: 'partner_click_triggered',
              placement: placementId,
              provider: siteConfig.ads.providers.partnerRedirect.providerName,
              tool: toolSlug,
              metadata: {
                sourceId: resolvedSourceId,
                clickId,
                campaign,
                placementMeta,
              },
            });
            onSponsorClick?.(event);
          }}
          className={ctaClassName}
        >
          <span>{ctaLabel}</span>
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      {showHelperText && (
        <p className="mt-3 text-xs text-[hsl(var(--color-muted-foreground))]">{siteConfig.sponsorship.helperText}</p>
      )}
    </Card>
  );
}

export default PostResultSponsorCard;
