'use client';

import { useEffect } from 'react';
import { siteConfig } from '@/config/site';

type DisplayBannerSlot = 'leaderboard' | 'rectangle' | 'mobileSticky';

interface AdsterraDisplayBannerProps {
  slot: DisplayBannerSlot;
  className?: string;
}

export function AdsterraDisplayBanner({ slot, className = '' }: AdsterraDisplayBannerProps) {
  const slotConfig = siteConfig.ads.providers.adsterra.displayBanners[slot];

  useEffect(() => {
    if (!slotConfig.enabled || !slotConfig.scriptSrc || !slotConfig.containerId) {
      return;
    }

    if (document.querySelector(`script[data-otk-adsterra-display="${slot}"][src="${slotConfig.scriptSrc}"]`)) {
      return;
    }

    const script = document.createElement('script');
    script.src = slotConfig.scriptSrc;
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.dataset.otkAdsterraDisplay = slot;
    document.body.appendChild(script);
  }, [slot, slotConfig]);

  if (!slotConfig.enabled || !slotConfig.containerId) {
    return null;
  }

  return (
    <section
      className={`overflow-hidden rounded-[1.5rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] ${className}`.trim()}
      aria-label={slotConfig.label}
    >
      <div id={slotConfig.containerId} />
    </section>
  );
}

export default AdsterraDisplayBanner;
