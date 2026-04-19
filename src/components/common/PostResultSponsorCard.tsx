'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { siteConfig } from '@/config/site';
import { useToolContext } from '@/lib/contexts/ToolContext';
import { trackMonetizationEvent } from '@/lib/monetization/analytics';
import {
  pickSponsorPreviewTheme,
  rememberSponsorPreviewTheme,
  type SponsorPreviewThemeId,
} from '@/lib/monetization/sponsor-previews';

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
  sponsorTheme?: SponsorPreviewThemeId;
  rotateTheme?: boolean;
  compact?: boolean;
  className?: string;
  showHelperText?: boolean;
  creative?: {
    src: string;
    alt: string;
    eyebrow?: string;
  };
  layout?: 'banner' | 'rectangle';
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

function isDebugEnabled() {
  if (typeof window === 'undefined') {
    return false;
  }

  if (process.env.NODE_ENV !== 'production') {
    return true;
  }

  return new URLSearchParams(window.location.search).get('otk_monetization_debug') === '1';
}

export function PostResultSponsorCard({
  placementId = 'post-result-primary',
  title,
  description,
  ctaLabel,
  href,
  toolSlug: propToolSlug,
  sourceId,
  campaign,
  placementMeta,
  sponsorTheme,
  rotateTheme = true,
  compact = false,
  className = '',
  showHelperText = true,
  creative,
  layout,
  onSponsorClick,
}: PostResultSponsorCardProps) {
  const toolContext = useToolContext();
  const [clickId, setClickId] = useState<string | null>(null);
  const shownKeyRef = useRef<string | null>(null);
  const toolSlug = propToolSlug ?? toolContext?.toolSlug ?? 'unknown';
  const resolvedSourceId = sourceId ?? `tool:${toolSlug}:${placementId}:contextual-soft:soft-bordered`;
  const selectedTheme = useMemo(() => pickSponsorPreviewTheme({
    seed: `${resolvedSourceId}:${placementId}:${campaign ?? ''}:${placementMeta ?? ''}`,
    requestedTheme: sponsorTheme,
    rotate: rotateTheme,
  }), [campaign, placementId, placementMeta, resolvedSourceId, rotateTheme, sponsorTheme]);
  const resolvedTitle = title ?? selectedTheme.title;
  const resolvedDescription = description ?? selectedTheme.description;
  const resolvedCtaLabel = ctaLabel ?? selectedTheme.ctaLabel;
  const resolvedCreative = creative ?? {
    src: selectedTheme.asset.src,
    alt: selectedTheme.asset.alt,
    eyebrow: selectedTheme.eyebrow,
  };
  const resolvedLayout = layout ?? (compact ? 'rectangle' : 'banner');
  const buildLinkHref = useMemo(() => (resolvedClickId: string | null) => {
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

    if (resolvedClickId) {
      params.set('subId', resolvedClickId);
    }

    if (isDebugEnabled()) {
      params.set('debug', '1');
    }

    return `${siteConfig.sponsorship.redirectPathPrefix}/${placementId}?${params.toString()}`;
  }, [campaign, href, placementId, placementMeta, resolvedSourceId, toolSlug]);
  const linkHref = useMemo(() => buildLinkHref(clickId), [buildLinkHref, clickId]);

  useEffect(() => {
    const nextClickId = buildLocalSponsorClickId();
    const shownKey = `${resolvedSourceId}:${placementId}:${selectedTheme.id}`;

    setClickId(nextClickId);
    rememberSponsorPreviewTheme(selectedTheme.id);

    if (shownKeyRef.current === shownKey) {
      return;
    }

    shownKeyRef.current = shownKey;
    trackMonetizationEvent({
      event: 'sponsor_preview_shown',
      placement: placementId,
      provider: siteConfig.ads.providers.partnerRedirect.providerName,
      tool: toolSlug,
      metadata: {
        surface: 'sponsorPreview',
        themeId: selectedTheme.id,
        sourceId: resolvedSourceId,
        clickId: nextClickId,
        campaign,
        placementMeta,
      },
    });
  }, [campaign, placementId, placementMeta, resolvedSourceId, selectedTheme.id, toolSlug]);

  const ensureClickId = () => {
    if (clickId) {
      return clickId;
    }

    const nextClickId = buildLocalSponsorClickId();
    if (nextClickId) {
      setClickId(nextClickId);
    }
    return nextClickId;
  };

  const cardClassName = `overflow-hidden border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] shadow-[var(--shadow-sm)] !p-0 ${className}`.trim();
  const bodyClassName = compact
    ? 'flex flex-col gap-3'
    : 'flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between';
  const ctaClassName = compact
    ? 'inline-flex w-full items-center justify-center gap-2 rounded-md border border-[hsl(var(--color-border))] bg-[hsl(var(--color-accent-strong))] px-3 py-2 text-xs font-semibold text-[hsl(var(--color-background))] transition-colors hover:bg-[hsl(var(--color-primary))]'
    : 'inline-flex min-w-fit items-center justify-center gap-2 rounded-md border border-[hsl(var(--color-border))] bg-[hsl(var(--color-accent-strong))] px-4 py-2 text-sm font-semibold text-[hsl(var(--color-background))] transition-colors hover:bg-[hsl(var(--color-primary))]';
  const contentPadding = compact ? 'p-3' : 'p-4';
  const creativeClassName = resolvedLayout === 'rectangle'
    ? 'aspect-[6/5] w-full object-cover'
    : 'aspect-[16/7] w-full object-cover';

  return (
    <Card
      className={cardClassName}
      data-testid="sponsor-preview-card"
      data-otk-monetization-surface="sponsorPreview"
      data-sponsor-theme={selectedTheme.id}
    >
      <div className="relative border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-subtle))]">
        {resolvedCreative.eyebrow && (
          <div className="absolute left-3 top-3 z-10 rounded-sm bg-[hsl(var(--color-background))/0.9] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[hsl(var(--color-accent-strong))]">
            {resolvedCreative.eyebrow}
          </div>
        )}
        <img
          src={resolvedCreative.src}
          alt={resolvedCreative.alt}
          className={creativeClassName}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className={`${bodyClassName} ${contentPadding}`.trim()}>
        <div className="space-y-2">
          <div className="inline-flex items-center rounded-full bg-[hsl(var(--color-accent-soft))] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-accent-strong))]">
            Partner preview
          </div>
          <div>
            <h3 className={`${compact ? 'text-xs' : 'text-sm'} font-semibold text-[hsl(var(--color-foreground))]`}>{resolvedTitle}</h3>
            <p className={`mt-1 ${compact ? 'text-xs leading-5' : 'text-sm'} text-[hsl(var(--color-muted-foreground))]`}>{resolvedDescription}</p>
          </div>
          {!compact && (
            <p className="text-xs leading-5 text-[hsl(var(--color-muted-foreground))]">
              This is a site-rendered partner preview. The sponsored offer opens in a new tab and may differ from this summary.
            </p>
          )}
        </div>
        <a
          href={linkHref}
          target="_blank"
          rel="sponsored nofollow noreferrer noopener"
          onClick={(event) => {
            const resolvedClickId = ensureClickId();
            const resolvedHref = buildLinkHref(resolvedClickId);
            event.currentTarget.href = resolvedHref;
            const metadata = {
              surface: 'sponsorPreview',
              themeId: selectedTheme.id,
              sourceId: resolvedSourceId,
              clickId: resolvedClickId,
              campaign,
              placementMeta,
              redirect_url: resolvedHref,
            };
            trackMonetizationEvent({
              event: 'sponsor_preview_clicked',
              placement: placementId,
              provider: siteConfig.ads.providers.partnerRedirect.providerName,
              tool: toolSlug,
              metadata,
            });
            trackMonetizationEvent({
              event: 'partner_click_triggered',
              placement: placementId,
              provider: siteConfig.ads.providers.partnerRedirect.providerName,
              tool: toolSlug,
              metadata,
            });
            trackMonetizationEvent({
              event: 'partner_redirect_opened',
              placement: placementId,
              provider: siteConfig.ads.providers.partnerRedirect.providerName,
              tool: toolSlug,
              metadata,
            });
            onSponsorClick?.(event);
          }}
          className={ctaClassName}
        >
          <span>{resolvedCtaLabel}</span>
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      {showHelperText && (
        <p className="px-4 pb-4 text-xs leading-5 text-[hsl(var(--color-muted-foreground))]">
          {siteConfig.sponsorship.helperText}
        </p>
      )}
    </Card>
  );
}

export default PostResultSponsorCard;
