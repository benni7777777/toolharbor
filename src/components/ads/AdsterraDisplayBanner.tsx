'use client';

import { useEffect, useRef } from 'react';
import { siteConfig } from '@/config/site';
import { trackMonetizationEvent } from '@/lib/monetization/analytics';

type DisplayBannerSlot = keyof typeof siteConfig.ads.providers.adsterra.displayBanners;

interface AdsterraDisplayBannerProps {
  slot: DisplayBannerSlot;
  className?: string;
}

export function AdsterraDisplayBanner({ slot, className = '' }: AdsterraDisplayBannerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const slotConfig = siteConfig.ads.providers.adsterra.displayBanners[slot];

  useEffect(() => {
    if (!slotConfig.enabled || !slotConfig.scriptSrc || !slotConfig.containerId) {
      return;
    }

    const host = hostRef.current;
    if (!host) {
      return;
    }

    if (host.dataset.otkAdsterraDisplayMounted === 'true') {
      return;
    }

    host.dataset.otkAdsterraDisplayMounted = 'true';
    host.textContent = '';

    trackMonetizationEvent({
      event: 'display_banner_mount_attempted',
      placement: slot,
      provider: 'adsterra',
      metadata: {
        scriptSrc: slotConfig.scriptSrc,
        width: slotConfig.width,
        height: slotConfig.height,
      },
    });

    const inlineOptions = document.createElement('script');
    inlineOptions.type = 'text/javascript';
    inlineOptions.text = `atOptions = ${JSON.stringify(slotConfig.atOptions)};`;

    const script = document.createElement('script');
    script.src = slotConfig.scriptSrc;
    script.async = false;
    script.setAttribute('data-cfasync', 'false');
    script.dataset.otkAdsterraDisplay = slot;
    script.addEventListener('load', () => {
      trackMonetizationEvent({
        event: 'display_banner_loaded',
        placement: slot,
        provider: 'adsterra',
      });
    });
    script.addEventListener('error', () => {
      trackMonetizationEvent({
        event: 'display_banner_failed',
        placement: slot,
        provider: 'adsterra',
        reason: 'script-error',
      });
    });

    host.appendChild(inlineOptions);
    host.appendChild(script);

    return () => {
      host.dataset.otkAdsterraDisplayMounted = 'false';
      host.textContent = '';
    };
  }, [slot, slotConfig]);

  if (!slotConfig.enabled || !slotConfig.containerId) {
    return null;
  }

  return (
    <section
      className={`overflow-hidden rounded-md border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] ${className}`.trim()}
      aria-label={slotConfig.label}
    >
      <div
        ref={hostRef}
        id={slotConfig.containerId}
        className="mx-auto flex items-center justify-center"
        style={{
          minWidth: slotConfig.width,
          minHeight: slotConfig.height,
        }}
      />
    </section>
  );
}

export default AdsterraDisplayBanner;
