'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { siteConfig } from '@/config/site';

interface MonetizationDisclosureCardProps {
  locale: string;
  className?: string;
}

export function MonetizationDisclosureCard({
  locale,
  className = '',
}: MonetizationDisclosureCardProps) {
  return (
    <Card className={`border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-6 ${className}`.trim()}>
      <div className="space-y-3">
        <div className="inline-flex rounded-full bg-[hsl(var(--color-accent-soft))] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-accent-strong))]">
          {siteConfig.ads.disclosureLabel}
        </div>
        <p className="text-sm font-semibold text-[hsl(var(--color-foreground))]">
          OpenToolsKit stays free thanks to advertising and partner offers.
        </p>
        <p className="text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
          Ads and partner links are delivered by third-party networks. We do not individually control or endorse every creative or landing page.
        </p>
        <p className="text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
          Source code for the live service is publicly available under {siteConfig.legal.license}.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href={siteConfig.links.source}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[hsl(var(--color-primary))] transition-colors hover:text-[hsl(var(--color-accent-strong))]"
          >
            Source Code
          </a>
          <Link
            href={`/${locale}/privacy`}
            className="text-[hsl(var(--color-primary))] transition-colors hover:text-[hsl(var(--color-accent-strong))]"
          >
            Privacy
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="text-[hsl(var(--color-primary))] transition-colors hover:text-[hsl(var(--color-accent-strong))]"
          >
            Support
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default MonetizationDisclosureCard;
