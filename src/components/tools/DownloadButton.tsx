'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Button, type ButtonProps } from '../ui/Button';
import { addRecentFile } from '@/lib/storage/recent-files';
import { useToolContext } from '@/lib/contexts/ToolContext';
import { sanitizeFilename } from '@/lib/utils/sanitize';
import { siteConfig } from '@/config/site';
import { LoaderCircle, X } from 'lucide-react';
import AdsterraNativeBanner from '@/components/ads/AdsterraNativeBanner';
import {
  triggerAdsterraPopunder,
  triggerAdsterraSocialBar,
} from '@/lib/monetization/adsterra-runtime';
import PostResultSponsorCard from '@/components/common/PostResultSponsorCard';
import { useMonetizationProfile } from '@/hooks/useMonetizationProfile';
import { getSessionCount, incrementSessionCount } from '@/lib/monetization/storage';
import { trackMonetizationEvent } from '@/lib/monetization/analytics';
import { isHardGateFeatureEnabled } from '@/lib/monetization/feature-flags';

export interface DownloadButtonProps extends Omit<ButtonProps, 'onClick' | 'children'> {
  file: Blob | null;
  filename: string;
  label?: string;
  onDownloadStart?: () => void;
  onDownloadComplete?: () => void;
  autoRevoke?: boolean;
  showFileSize?: boolean;
  toolSlug?: string;
  toolName?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  file,
  filename,
  label,
  onDownloadStart,
  onDownloadComplete,
  autoRevoke = true,
  showFileSize = true,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  toolSlug: propToolSlug,
  toolName: propToolName,
  ...buttonProps
}) => {
  const t = useTranslations('common');
  const monetizationProfile = useMonetizationProfile();
  const pathname = usePathname();
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showMonetizationPanel, setShowMonetizationPanel] = useState(false);
  const [showNativeBanner, setShowNativeBanner] = useState(false);
  const [hardGateCount, setHardGateCount] = useState<number>(0);
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [isGateUnlocked, setIsGateUnlocked] = useState(false);
  const [gateSecondsRemaining, setGateSecondsRemaining] = useState<number>(siteConfig.monetizationRules.hardGateSeconds);
  const [currentDownloadUsedGate, setCurrentDownloadUsedGate] = useState(false);

  const toolContext = useToolContext();
  const toolSlug = propToolSlug || toolContext?.toolSlug;
  const toolName = propToolName || toolContext?.toolName;
  const localePrefix = useMemo(() => {
    if (!pathname) {
      return `/${siteConfig.defaultLocale}`;
    }

    const segments = pathname.split('/').filter(Boolean);
    return segments.length > 0 ? `/${segments[0]}` : `/${siteConfig.defaultLocale}`;
  }, [pathname]);
  const resultPlacement = siteConfig.ads.placements.resultSuccess;
  const isSponsorEligible = variant !== 'ghost' && siteConfig.sponsorship.enabled;

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setBlobUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }

    setBlobUrl(null);
  }, [file]);

  useEffect(() => {
    setHardGateCount(getSessionCount(siteConfig.monetizationRules.hardGateSessionStorageKey));
  }, []);

  useEffect(() => {
    if (!showMonetizationPanel || !resultPlacement.nativeBanner || currentDownloadUsedGate) {
      setShowNativeBanner(false);
      return;
    }

    const revealTimeout = window.setTimeout(() => {
      setShowNativeBanner(true);
    }, 900);

    return () => {
      window.clearTimeout(revealTimeout);
    };
  }, [showMonetizationPanel, resultPlacement.nativeBanner, currentDownloadUsedGate]);

  useEffect(() => {
    if (!isGateOpen || isGateUnlocked) {
      return;
    }

    if (gateSecondsRemaining <= 0) {
      setIsGateUnlocked(true);
      trackMonetizationEvent({
        event: 'gate_timer_complete',
        placement: 'result-gate',
        provider: 'adsterra',
        tool: toolSlug,
        country: monetizationProfile.country,
      });
      trackMonetizationEvent({
        event: 'gate_timer_completed',
        placement: 'result-gate',
        provider: 'adsterra',
        tool: toolSlug,
        country: monetizationProfile.country,
      });
      trackMonetizationEvent({
        event: 'gate_unlocked_by_timer',
        placement: 'result-gate',
        provider: 'adsterra',
        tool: toolSlug,
        country: monetizationProfile.country,
      });
      trackMonetizationEvent({
        event: 'download_unlocked',
        placement: 'result-gate',
        unlockReason: 'timer',
        tool: toolSlug,
        country: monetizationProfile.country,
      });
      return;
    }

    const timer = window.setTimeout(() => {
      setGateSecondsRemaining((current) => current - 1);
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isGateOpen, isGateUnlocked, gateSecondsRemaining, monetizationProfile.country, toolSlug]);

  useEffect(() => {
    if (file) {
      setIsGateOpen(false);
      setIsGateUnlocked(false);
      setGateSecondsRemaining(siteConfig.monetizationRules.hardGateSeconds);
      setShowMonetizationPanel(false);
      setCurrentDownloadUsedGate(false);
    }
  }, [file]);

  const shouldUseHardGate = useMemo(() => {
    if (!isSponsorEligible) {
      return false;
    }

    if (!isHardGateFeatureEnabled()) {
      return false;
    }

    if (!monetizationProfile.allowHardGate) {
      return false;
    }

    return hardGateCount < siteConfig.monetizationRules.hardGatePerSessionMax;
  }, [hardGateCount, isSponsorEligible, monetizationProfile.allowHardGate]);

  const triggerResultPopunder = useCallback((trustedEvent?: Event, reason = 'result-download-click') => {
    if (!monetizationProfile.allowAggressiveUnits) {
      trackMonetizationEvent({
        event: 'monetization_blocked_reason',
        placement: 'result-success',
        provider: 'adsterra',
        tool: toolSlug,
        country: monetizationProfile.country,
        allowedAggressiveUnits: false,
        reason: monetizationProfile.previewMode === 'off'
          ? 'preview-off'
          : monetizationProfile.isUkEea
            ? 'uk-eea-native-only'
            : 'aggressive-units-disabled',
        metadata: {
          unit: 'popunder',
          sourceReason: reason,
          previewMode: monetizationProfile.previewMode,
          isLoading: monetizationProfile.isLoading,
          isUkEea: monetizationProfile.isUkEea,
        },
      });
      return false;
    }

    if (!resultPlacement.popunder) {
      trackMonetizationEvent({
        event: 'monetization_blocked_reason',
        placement: 'result-success',
        provider: 'adsterra',
        tool: toolSlug,
        country: monetizationProfile.country,
        allowedAggressiveUnits: monetizationProfile.allowAggressiveUnits,
        reason: 'placement-disabled',
        metadata: {
          unit: 'popunder',
          sourceReason: reason,
        },
      });
      return false;
    }

    return triggerAdsterraPopunder({
      placement: 'result-success',
      reason,
      trustedEvent,
    });
  }, [
    monetizationProfile.allowAggressiveUnits,
    monetizationProfile.country,
    monetizationProfile.isLoading,
    monetizationProfile.isUkEea,
    monetizationProfile.previewMode,
    resultPlacement.popunder,
    toolSlug,
  ]);

  const triggerResultSocialBar = useCallback((reason = 'result-download-click') => {
    if (!monetizationProfile.allowAggressiveUnits) {
      trackMonetizationEvent({
        event: 'monetization_blocked_reason',
        placement: 'result-success',
        provider: 'adsterra',
        tool: toolSlug,
        country: monetizationProfile.country,
        allowedAggressiveUnits: false,
        reason: monetizationProfile.previewMode === 'off'
          ? 'preview-off'
          : monetizationProfile.isUkEea
            ? 'uk-eea-native-only'
            : 'aggressive-units-disabled',
        metadata: {
          unit: 'socialbar',
          sourceReason: reason,
          previewMode: monetizationProfile.previewMode,
          isLoading: monetizationProfile.isLoading,
          isUkEea: monetizationProfile.isUkEea,
        },
      });
      return false;
    }

    if (!resultPlacement.socialBar) {
      trackMonetizationEvent({
        event: 'monetization_blocked_reason',
        placement: 'result-success',
        provider: 'adsterra',
        tool: toolSlug,
        country: monetizationProfile.country,
        allowedAggressiveUnits: monetizationProfile.allowAggressiveUnits,
        reason: 'placement-disabled',
        metadata: {
          unit: 'socialbar',
          sourceReason: reason,
        },
      });
      return false;
    }

    return triggerAdsterraSocialBar({
      placement: 'result-success',
      reason,
    });
  }, [
    monetizationProfile.allowAggressiveUnits,
    monetizationProfile.country,
    monetizationProfile.isLoading,
    monetizationProfile.isUkEea,
    monetizationProfile.previewMode,
    resultPlacement.socialBar,
    toolSlug,
  ]);

  const performDownload = useCallback((usedHardGate: boolean) => {
    if (!file || !blobUrl || isDownloading) {
      return;
    }

    setIsDownloading(true);
    onDownloadStart?.();

    const safeFilename = sanitizeFilename(filename, 'download.pdf');
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = safeFilename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (autoRevoke) {
      window.setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
        setBlobUrl(null);

        if (file) {
          const newUrl = URL.createObjectURL(file);
          setBlobUrl(newUrl);
        }
      }, 100);
    }

    window.setTimeout(() => {
      setIsDownloading(false);
      onDownloadComplete?.();

      if (toolSlug && file) {
        addRecentFile(filename, file.size, toolSlug, toolName);
      }

      if (isSponsorEligible) {
        setCurrentDownloadUsedGate(usedHardGate);
        setShowMonetizationPanel(true);
      }
    }, 500);
  }, [
    autoRevoke,
    blobUrl,
    file,
    filename,
    isDownloading,
    isSponsorEligible,
    onDownloadComplete,
    onDownloadStart,
    toolName,
    toolSlug,
  ]);

  const handlePartnerUnlock = useCallback((event?: React.MouseEvent<HTMLAnchorElement>) => {
    if (isGateUnlocked) {
      return;
    }

    setIsGateUnlocked(true);
    trackMonetizationEvent({
      event: 'gate_unlocked_by_partner_click',
      placement: 'result-gate',
      provider: siteConfig.ads.providers.partnerRedirect.providerName,
      tool: toolSlug,
      country: monetizationProfile.country,
    });
    trackMonetizationEvent({
      event: 'download_unlocked',
      placement: 'result-gate',
      unlockReason: 'partner',
      tool: toolSlug,
      country: monetizationProfile.country,
    });

    triggerResultSocialBar('partner-unlock-click');
  }, [
    isGateUnlocked,
    monetizationProfile.country,
    triggerResultSocialBar,
    toolSlug,
  ]);

  const handleDownload = useCallback((event?: React.MouseEvent<HTMLButtonElement>) => {
    if (!file || !blobUrl || isDownloading) {
      return;
    }

    if (!shouldUseHardGate) {
      // Popunder must stay in the original trusted click stack, before state updates or download helpers.
      triggerResultPopunder(event?.nativeEvent, 'direct-download-click');
    }

    if (shouldUseHardGate) {
      const nextCount = incrementSessionCount(siteConfig.monetizationRules.hardGateSessionStorageKey);
      setHardGateCount(nextCount);
      setCurrentDownloadUsedGate(true);
      setIsGateOpen(true);
      setIsGateUnlocked(false);
      setGateSecondsRemaining(siteConfig.monetizationRules.hardGateSeconds);
      trackMonetizationEvent({
        event: 'gate_shown',
        placement: 'result-gate',
        provider: 'adsterra',
        tool: toolSlug,
        country: monetizationProfile.country,
      });
      trackMonetizationEvent({
        event: 'gate_timer_started',
        placement: 'result-gate',
        provider: 'adsterra',
        tool: toolSlug,
        country: monetizationProfile.country,
      });
      return;
    }

    if (!isHardGateFeatureEnabled() && monetizationProfile.allowAggressiveUnits) {
      trackMonetizationEvent({
        event: 'monetization_blocked_reason',
        placement: 'result-gate',
        provider: 'adsterra',
        tool: toolSlug,
        country: monetizationProfile.country,
        reason: 'hard-gate-disabled',
      });
    }

    triggerResultSocialBar('direct-download-click');
    performDownload(false);
  }, [
    blobUrl,
    file,
    isDownloading,
    monetizationProfile.allowAggressiveUnits,
    monetizationProfile.country,
    performDownload,
    shouldUseHardGate,
    toolSlug,
    triggerResultPopunder,
    triggerResultSocialBar,
  ]);

  const gateReady = isGateUnlocked || gateSecondsRemaining <= 0;

  const closeGate = useCallback(() => {
    if (!gateReady) {
      return;
    }

    setIsGateOpen(false);
    trackMonetizationEvent({
      event: 'gate_abandon',
      placement: 'result-gate',
      tool: toolSlug,
      country: monetizationProfile.country,
    });
  }, [gateReady, monetizationProfile.country, toolSlug]);

  const unlockCtaLabel = gateReady ? 'Download now' : `Download unlocks in ${gateSecondsRemaining}s`;
  const isDisabled = disabled || !file || !blobUrl;
  const buttonText = label || t('buttons.download');
  const fileSizeText = showFileSize && file ? ` (${formatFileSize(file.size)})` : '';

  return (
    <>
      <Button
        variant={variant}
        size={size}
        disabled={isDisabled}
        loading={isDownloading}
        onClick={handleDownload}
        className={className}
        aria-label={`${buttonText}${fileSizeText}`}
        {...buttonProps}
      >
        {!isDownloading && (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        )}

        <span>
          {buttonText}
          {fileSizeText}
        </span>
      </Button>

      {isGateOpen && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center bg-[hsl(var(--color-background))/0.78] p-4 backdrop-blur-md sm:items-center">
          <div
            className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-6 shadow-[var(--shadow-lg)]"
            data-testid="download-gate-overlay"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex rounded-full bg-[hsl(var(--color-accent-soft))] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-accent-strong))]">
                  {siteConfig.sponsorship.label}
                </div>
                <h3 className="text-2xl font-semibold text-[hsl(var(--color-foreground))]">
                  Your file is ready
                </h3>
                <p className="text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                  Download unlocks in {gateSecondsRemaining} seconds. OpenToolsKit stays free thanks to advertising and partner offers.
                </p>
                <p className="text-xs leading-5 text-[hsl(var(--color-muted-foreground))]">
                  Ads and partner links are delivered by third-party networks. We do not individually control or endorse every creative or landing page.
                </p>
              </div>
              <button
                type="button"
                onClick={closeGate}
                disabled={!gateReady}
                className="rounded-full border border-[hsl(var(--color-border))] p-2 text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-foreground))] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Dismiss sponsor gate"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[0.38fr_0.62fr]">
              <div className="rounded-[1.75rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-subtle))] p-5">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-[hsl(var(--color-border))]">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[hsl(var(--color-foreground))]">{gateSecondsRemaining}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--color-muted-foreground))]">Seconds</p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  disabled={!gateReady}
                  onClick={(event) => {
                    // Keep popunder inside the trusted click before React state and download work.
                    triggerResultPopunder(event.nativeEvent, 'gate-download-click');
                    setIsGateOpen(false);
                    triggerResultSocialBar('gate-download-click');
                    performDownload(true);
                  }}
                  className="mt-5 w-full justify-center rounded-full"
                >
                  {unlockCtaLabel}
                </Button>
              </div>

              <div className="space-y-4">
                {resultPlacement.nativeBanner ? (
                  <AdsterraNativeBanner
                    slotName="result-gate"
                    title="Sponsored result unlock"
                    description="This native placement appears during the result gate and helps keep OpenToolsKit free."
                  />
                ) : null}
                <PostResultSponsorCard
                  placementId={siteConfig.ads.providers.partnerRedirect.placementId}
                  title="Open a partner offer to unlock immediately"
                  description="The offer opens in a new tab. Sponsor clicks unlock the download instantly while keeping your current page intact."
                  ctaLabel="Open partner site"
                  sourceId={`tool:${toolSlug ?? 'unknown'}:result-gate:contextual-soft:soft-bordered`}
                  campaign="result-gate-unlock"
                  placementMeta="download-gate"
                  onSponsorClick={handlePartnerUnlock}
                />
                <div className="flex flex-wrap gap-3 text-sm">
                  <a
                    href={siteConfig.links.source}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[hsl(var(--color-primary))] transition-colors hover:text-[hsl(var(--color-accent-strong))]"
                  >
                    Source Code
                  </a>
                  <a
                    href={`${localePrefix}/privacy`}
                    className="text-[hsl(var(--color-primary))] transition-colors hover:text-[hsl(var(--color-accent-strong))]"
                  >
                    Privacy
                  </a>
                  <a
                    href={`${localePrefix}/contact`}
                    className="text-[hsl(var(--color-primary))] transition-colors hover:text-[hsl(var(--color-accent-strong))]"
                  >
                    Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showMonetizationPanel && (
        <div
          className="fixed bottom-4 right-4 z-[80] w-[min(32rem,calc(100vw-2rem))] overflow-hidden rounded-[2rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-4 shadow-[var(--shadow-lg)] xl:right-72"
          data-testid="download-monetization-panel"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="inline-flex rounded-full bg-[hsl(var(--color-accent-soft))] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-accent-strong))]">
                {siteConfig.sponsorship.label}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-[hsl(var(--color-foreground))]">
                  Download started. Sponsored placements remain available below.
                </p>
                <p className="text-xs leading-5 text-[hsl(var(--color-muted-foreground))]">
                  {siteConfig.ads.disclosureSummary} {siteConfig.ads.actionDisclosure}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowMonetizationPanel(false)}
              className="rounded-full p-1 text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-foreground))]"
              aria-label="Dismiss sponsored placements"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-4 space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <PostResultSponsorCard
                placementId={siteConfig.ads.providers.partnerRedirect.placementId}
                title="Useful next step for your document workflow"
                description="This partner suggestion opens separately and helps fund the project without interrupting the result you already unlocked."
                ctaLabel="Open partner site"
                sourceId={`tool:${toolSlug ?? 'unknown'}:post-result-primary:contextual-soft:soft-bordered`}
                campaign="post-result-primary"
                placementMeta="download-panel"
                compact
                showHelperText={false}
              />

              <PostResultSponsorCard
                placementId="next-step"
                title="Compare another sponsored route"
                description="Optional partner path in a new tab. Your completed file remains available here."
                ctaLabel="View option"
                sourceId={`tool:${toolSlug ?? 'unknown'}:next-step:contextual-soft:soft-bordered`}
                campaign="post-result-secondary"
                placementMeta="download-panel"
                compact
                showHelperText={false}
              />
            </div>

            {resultPlacement.nativeBanner && !currentDownloadUsedGate && (
              showNativeBanner ? (
                <AdsterraNativeBanner
                  slotName="result-drawer"
                  title="Sponsored results placement"
                  description="This native placement appears after successful downloads. Ads help fund the project while keeping the file flow intact."
                />
              ) : (
                <div className="rounded-[1.75rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-subtle))] p-4 text-sm text-[hsl(var(--color-muted-foreground))]">
                  <div className="flex items-center gap-3">
                    <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>Loading sponsored placement...</span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadButton;
