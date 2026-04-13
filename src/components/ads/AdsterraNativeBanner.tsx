'use client';

import { useEffect, useRef } from 'react';
import { siteConfig } from '@/config/site';
import { trackMonetizationEvent } from '@/lib/monetization/analytics';

interface AdsterraNativeBannerProps {
  className?: string;
  title?: string;
  description?: string;
  slotName?: string;
}

export function AdsterraNativeBanner({
  className = '',
  title = 'Partner suggestion',
  description = 'Ads and partner offers help keep OpenToolsKit open source.',
  slotName = 'native-banner',
}: AdsterraNativeBannerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { nativeBanner } = siteConfig.ads.providers.adsterra;

  useEffect(() => {
    if (!siteConfig.ads.enabled || !siteConfig.ads.providers.adsterra.enabled) {
      return;
    }

    const wrapper = wrapperRef.current;
    const container = document.getElementById(nativeBanner.containerId);

    if (!wrapper || !container) {
      return;
    }

    if (container.dataset.otkAdMounted === 'true') {
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[data-otk-adsterra="native-banner"][src="${nativeBanner.scriptSrc}"]`,
    );

    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.dataset.otkAdsterra = 'native-banner';
      script.src = nativeBanner.scriptSrc;
      wrapper.prepend(script);
    }

    container.dataset.otkAdMounted = 'true';
    trackMonetizationEvent({
      event: 'native_impression',
      placement: slotName,
      provider: 'adsterra',
    });
  }, [nativeBanner.containerId, nativeBanner.scriptSrc, slotName]);

  if (!siteConfig.ads.enabled || !siteConfig.ads.providers.adsterra.enabled) {
    return null;
  }

  return (
    <section
      className={`rounded-[1.75rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-5 shadow-[var(--shadow-sm)] ${className}`.trim()}
      aria-label="Sponsored placement"
    >
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[hsl(var(--color-accent-soft))] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-accent-strong))]">
          {siteConfig.ads.disclosureLabel}
        </span>
        <p className="text-sm font-semibold text-[hsl(var(--color-foreground))]">{title}</p>
      </div>
      <p className="mb-4 max-w-3xl text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
        {description} {siteConfig.ads.actionDisclosure}
      </p>
      <div ref={wrapperRef}>
        <div id={nativeBanner.containerId} />
      </div>
    </section>
  );
}

export default AdsterraNativeBanner;
