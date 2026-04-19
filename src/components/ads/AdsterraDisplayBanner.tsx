'use client';

import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/config/site';
import { trackMonetizationEvent } from '@/lib/monetization/analytics';
import type { AdRuntimeStatus } from '@/types/monetization';

type DisplayBannerSlot = keyof typeof siteConfig.ads.providers.adsterra.displayBanners;

export interface AdsterraDisplayBannerProps {
  slot: DisplayBannerSlot;
  className?: string;
}

const DISPLAY_RENDER_TIMEOUT_MS = 5000;

function hasAdCreative(container: HTMLElement) {
  return Array.from(container.childNodes).some((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return Boolean(node.textContent?.trim());
    }

    if (node instanceof HTMLScriptElement) {
      return false;
    }

    return true;
  });
}

function buildFallbackHref(slot: DisplayBannerSlot) {
  const params = new URLSearchParams({
    tool: 'site',
    placement: 'next-step',
    provider: siteConfig.ads.providers.partnerRedirect.providerQueryValue,
    source: `display-fallback:${slot}:no-fill`,
    campaign: `display-${slot}-fallback`,
    placementMeta: slot,
  });

  return `${siteConfig.sponsorship.redirectPathPrefix}/next-step?${params.toString()}`;
}

function DisplayBannerFallback({
  slot,
  width,
  height,
  reason,
}: {
  slot: DisplayBannerSlot;
  width: number;
  height: number;
  reason: string | null;
}) {
  const isStrip = height <= 90;
  const isShortStrip = height <= 60;
  const isRail = width <= 180;
  const title = isRail ? 'Sponsored option' : 'Sponsor placement';
  const description = isStrip
    ? 'Ad inventory is not available right now.'
    : 'This ad slot is waiting for live inventory. A labeled sponsor route is available instead.';

  return (
    <div
      className={`absolute inset-0 z-10 flex rounded-md border border-dashed border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] text-[hsl(var(--color-foreground))] ${
        isShortStrip ? 'p-1.5' : 'p-2'
      } ${
        isStrip ? 'items-center justify-between gap-3 text-left' : 'flex-col items-center justify-center gap-3 text-center'
      }`.trim()}
      data-testid="adsterra-display-fallback"
      data-otk-ad-fallback-slot={slot}
      data-otk-ad-fallback-reason={reason ?? 'unknown'}
      style={{ width, height }}
    >
      <div className={isStrip ? 'min-w-0 flex-1' : 'space-y-2'}>
        <div className="inline-flex rounded-full bg-[hsl(var(--color-accent-soft))] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[hsl(var(--color-accent-strong))]">
          {siteConfig.ads.disclosureLabel}
        </div>
        {isShortStrip ? (
          <span className="ml-2 inline-block max-w-[8rem] truncate align-middle text-[11px] font-semibold">
            Ad unavailable
          </span>
        ) : (
          <p className={`${isRail ? 'text-xs' : 'text-sm'} font-semibold leading-5`}>
            {title}
          </p>
        )}
        {!isStrip && (
          <p className="text-xs leading-5 text-[hsl(var(--color-muted-foreground))]">
            {description}
          </p>
        )}
      </div>
      <a
        href={buildFallbackHref(slot)}
        target="_blank"
        rel="sponsored nofollow noreferrer noopener"
        onClick={() => {
          trackMonetizationEvent({
            event: 'partner_click_triggered',
            placement: 'display-banner-fallback',
            provider: siteConfig.ads.providers.partnerRedirect.providerName,
            metadata: {
              slot,
              reason,
              redirect_url: buildFallbackHref(slot),
            },
          });
        }}
        className={`inline-flex items-center justify-center rounded-md bg-[hsl(var(--color-accent-strong))] font-semibold text-[hsl(var(--color-background))] transition-colors hover:bg-[hsl(var(--color-primary))] ${
          isShortStrip ? 'px-2 py-1 text-[11px]' : 'px-3 py-2 text-xs'
        } ${
          isRail ? 'w-full' : 'min-w-fit'
        }`.trim()}
      >
        {isShortStrip ? 'Open' : 'Open sponsor'}
      </a>
    </div>
  );
}

export function AdsterraDisplayBanner({ slot, className = '' }: AdsterraDisplayBannerProps) {
  const slotConfig = siteConfig.ads.providers.adsterra.displayBanners[slot];
  const slotRef = useRef(slot);
  const slotConfigRef = useRef(slotConfig);
  const loadedRef = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [status, setStatus] = useState<AdRuntimeStatus>('idle');
  const [failureReason, setFailureReason] = useState<string | null>(null);

  function cleanupWhenDetached() {
    window.setTimeout(() => {
      const container = document.getElementById(slotConfigRef.current.containerId);

      if (container && document.body.contains(container)) {
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

    const currentSlot = slotRef.current;
    const currentSlotConfig = slotConfigRef.current;

    if (!currentSlotConfig.enabled || !currentSlotConfig.scriptSrc || !currentSlotConfig.containerId) {
      return;
    }

    const container = document.getElementById(currentSlotConfig.containerId);
    if (!(container instanceof HTMLDivElement)) {
      return;
    }

    loadedRef.current = true;
    container.dataset.otkAdsterraDisplayMounted = 'true';
    container.dataset.otkAdStatus = 'mounting';
    container.innerHTML = '';
    container.style.width = `${currentSlotConfig.width}px`;
    container.style.height = `${currentSlotConfig.height}px`;
    container.style.overflow = 'visible';

    trackMonetizationEvent({
      event: 'ad_slot_mount',
      placement: currentSlot,
      provider: 'adsterra',
      metadata: {
        unit: 'display-banner',
        scriptSrc: currentSlotConfig.scriptSrc,
        width: currentSlotConfig.width,
        height: currentSlotConfig.height,
        containerId: currentSlotConfig.containerId,
      },
    });
    trackMonetizationEvent({
      event: 'display_banner_mount_attempted',
      placement: currentSlot,
      provider: 'adsterra',
      metadata: {
        scriptSrc: currentSlotConfig.scriptSrc,
        width: currentSlotConfig.width,
        height: currentSlotConfig.height,
      },
    });

    const inlineOptions = document.createElement('script');
    inlineOptions.type = 'text/javascript';
    inlineOptions.text = `atOptions = ${JSON.stringify(currentSlotConfig.atOptions)};`;

    const script = document.createElement('script');
    script.src = currentSlotConfig.scriptSrc;
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.dataset.otkAdsterraDisplay = currentSlot;

    let renderSettled = false;
    let failureLogged = false;
    setStatus('mounting');
    setFailureReason(null);

    const markRenderSuccess = () => {
      if (renderSettled || !hasAdCreative(container)) {
        return;
      }

      renderSettled = true;
      setStatus('rendered');
      setFailureReason(null);
      container.dataset.otkAdStatus = 'rendered';
      trackMonetizationEvent({
        event: 'ad_render_success',
        placement: currentSlot,
        provider: 'adsterra',
        status: 'rendered',
        metadata: {
          unit: 'display-banner',
          containerId: currentSlotConfig.containerId,
          width: currentSlotConfig.width,
          height: currentSlotConfig.height,
        },
      });
    };
    const markRenderFailed = (reason: string) => {
      if (renderSettled || failureLogged) {
        return;
      }

      failureLogged = true;
      setStatus('failed');
      setFailureReason(reason);
      container.dataset.otkAdStatus = 'failed';
      container.dataset.otkAdReason = reason;
      trackMonetizationEvent({
        event: 'ad_render_failed',
        placement: currentSlot,
        provider: 'adsterra',
        status: 'failed',
        reason,
        metadata: {
          unit: 'display-banner',
          containerId: currentSlotConfig.containerId,
          width: currentSlotConfig.width,
          height: currentSlotConfig.height,
          childNodeCount: container.childNodes.length,
          hasScript: Boolean(container.querySelector('script')),
        },
      });
    };
    const observer = new MutationObserver(markRenderSuccess);
    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    script.addEventListener('load', () => {
      if (!renderSettled && !failureLogged) {
        setStatus('loaded');
        container.dataset.otkAdStatus = 'loaded';
      }

      trackMonetizationEvent({
        event: 'display_banner_loaded',
        placement: currentSlot,
        provider: 'adsterra',
      });
      markRenderSuccess();
    });
    script.addEventListener('error', () => {
      trackMonetizationEvent({
        event: 'display_banner_failed',
        placement: currentSlot,
        provider: 'adsterra',
        reason: 'script-error',
      });
      markRenderFailed('script-error');
    });

    container.appendChild(inlineOptions);
    container.appendChild(script);
    trackMonetizationEvent({
      event: 'ad_script_injected',
      placement: currentSlot,
      provider: 'adsterra',
      metadata: {
        unit: 'display-banner',
        scriptSrc: currentSlotConfig.scriptSrc,
        target: currentSlotConfig.containerId,
      },
    });

    const renderTimer = window.setTimeout(() => {
      if (hasAdCreative(container)) {
        markRenderSuccess();
        return;
      }

      markRenderFailed('empty-timeout');
    }, DISPLAY_RENDER_TIMEOUT_MS);

    cleanupRef.current = () => {
      observer.disconnect();
      window.clearTimeout(renderTimer);
    };

    return cleanupWhenDetached;
  }, []);

  if (!slotConfig.enabled || !slotConfig.containerId) {
    return null;
  }

  return (
    <section
      className={`relative z-20 rounded-md border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] ${className}`.trim()}
      aria-label={slotConfig.label}
      data-otk-ad-status={status}
      data-otk-ad-reason={failureReason ?? undefined}
      style={{
        width: slotConfig.width,
        minHeight: slotConfig.height,
        overflow: 'visible',
      }}
    >
      <div
        id={slotConfig.containerId}
        className="mx-auto block"
        style={{
          width: slotConfig.width,
          height: slotConfig.height,
          minWidth: slotConfig.width,
          minHeight: slotConfig.height,
          overflow: 'visible',
        }}
      />
      {status === 'failed' && (
        <DisplayBannerFallback
          slot={slot}
          width={slotConfig.width}
          height={slotConfig.height}
          reason={failureReason}
        />
      )}
    </section>
  );
}

export default AdsterraDisplayBanner;
