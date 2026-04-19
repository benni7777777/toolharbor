'use client';

import { useEffect, useRef } from 'react';
import { siteConfig } from '@/config/site';
import { trackMonetizationEvent } from '@/lib/monetization/analytics';

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

export function AdsterraDisplayBanner({ slot, className = '' }: AdsterraDisplayBannerProps) {
  const slotConfig = siteConfig.ads.providers.adsterra.displayBanners[slot];
  const slotRef = useRef(slot);
  const slotConfigRef = useRef(slotConfig);
  const loadedRef = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);

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
    const markRenderSuccess = () => {
      if (renderSettled || !hasAdCreative(container)) {
        return;
      }

      renderSettled = true;
      container.dataset.otkAdStatus = 'rendered';
      trackMonetizationEvent({
        event: 'ad_render_success',
        placement: currentSlot,
        provider: 'adsterra',
        status: 'rendered',
        metadata: {
          unit: 'display-banner',
        },
      });
    };
    const markRenderFailed = (reason: string) => {
      if (renderSettled) {
        return;
      }

      renderSettled = true;
      container.dataset.otkAdStatus = 'failed';
      trackMonetizationEvent({
        event: 'ad_render_failed',
        placement: currentSlot,
        provider: 'adsterra',
        status: 'failed',
        reason,
        metadata: {
          unit: 'display-banner',
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
    </section>
  );
}

export default AdsterraDisplayBanner;
