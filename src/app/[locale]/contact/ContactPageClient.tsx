'use client';

import Link from 'next/link';
import { Github, Gavel, ShieldCheck, ExternalLink, GitPullRequest, Mail, MessageCircle, ScrollText } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  AdsterraNativeBanner,
  AdsterraSessionScripts,
} from '@/components/ads/DynamicAdsterraComponents';
import MonetizationDisclosureCard from '@/components/ads/MonetizationDisclosureCard';
import { type Locale } from '@/lib/i18n/config';
import { siteConfig } from '@/config/site';
import { useMonetizationProfile } from '@/hooks/useMonetizationProfile';

interface ContactPageClientProps {
  locale: Locale;
}

export default function ContactPageClient({ locale }: ContactPageClientProps) {
  const monetizationProfile = useMonetizationProfile();
  const showInfoNativeAd =
    monetizationProfile.allowNativeUnits && siteConfig.ads.placements.infoPages.nativeBanner;
  const showMonetizationDisclosure = siteConfig.ads.enabled || siteConfig.sponsorship.enabled;
  const supportEmailHref = `mailto:${siteConfig.links.supportEmail}`;
  const supportCards = [
    {
      icon: Mail,
      title: 'Email support',
      description:
        'Use email for general questions, account-free help, privacy requests, and non-developer support.',
      href: supportEmailHref,
      action: siteConfig.links.supportEmail,
      external: false,
    },
    {
      icon: MessageCircle,
      title: 'General help',
      description:
        'Start with the FAQ for privacy, file handling, browser limits, language support, and tool behavior.',
      href: `/${locale}/faq/`,
      action: 'Open FAQ',
      external: false,
    },
    {
      icon: Github,
      title: 'Developer issues',
      description:
        'Use GitHub Issues for bugs, regressions, feature requests, reproducible tool reports, and source review.',
      href: siteConfig.links.githubIssues,
      action: 'Open issues',
      external: true,
    },
  ];

  const sourceCards = [
    {
      icon: Github,
      title: 'Source code',
      description:
        'Review the public AGPL repository that corresponds to the live OpenToolsKit deployment.',
      href: siteConfig.links.source,
      action: 'Open repository',
    },
    {
      icon: GitPullRequest,
      title: 'Report an issue',
      description:
        'Use GitHub Issues for bugs, regressions, feature requests, and deployment feedback.',
      href: siteConfig.links.githubIssues,
      action: 'Open issues',
    },
    {
      icon: ScrollText,
      title: 'AGPL notice',
      description:
        'OpenToolsKit is derived from PDFCraft under AGPL-3.0, with source availability and attribution kept visible.',
      href: `${siteConfig.links.source}/blob/main/NOTICE.md`,
      action: 'Read NOTICE',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />

      <main className="mx-auto w-full max-w-screen-xl flex-1 xl:max-w-[calc(100vw-32rem)] min-[1800px]:max-w-screen-xl">
        <AdsterraSessionScripts
          popunder={monetizationProfile.allowAggressiveUnits && siteConfig.ads.placements.infoPages.popunder}
          socialBar={monetizationProfile.allowAggressiveUnits && siteConfig.ads.placements.infoPages.socialBar}
          placement="support-page"
          reason="info-page-load"
        />

        <section className="bg-[hsl(var(--color-muted)/0.3)] py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-4 py-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                <ShieldCheck className="h-4 w-4 text-[hsl(var(--color-accent-strong))]" aria-hidden="true" />
                <span>User support and public source access</span>
              </div>
              <h1 className="text-4xl font-bold text-[hsl(var(--color-foreground))] md:text-5xl">
                Contact and support
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[hsl(var(--color-muted-foreground))]">
                For general help, privacy questions, or feedback about the public tool site, use the support email
                or FAQ. GitHub remains available for developer-facing bug reports and source review.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {supportCards.map((card) => {
                const Icon = card.icon;

                const content = (
                    <Card className="h-full p-6" hover>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--color-primary)/0.1)]">
                        <Icon className="h-6 w-6 text-[hsl(var(--color-primary))]" />
                      </div>
                      <h2 className="mb-3 text-xl font-semibold text-[hsl(var(--color-foreground))]">
                        {card.title}
                      </h2>
                      <p className="mb-5 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                        {card.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--color-primary))]">
                        {card.action}
                        {card.external && <ExternalLink className="h-4 w-4" aria-hidden="true" />}
                      </span>
                    </Card>
                );

                if (card.external) {
                  return (
                    <a key={card.title} href={card.href} target="_blank" rel="noopener noreferrer" className="block">
                      {content}
                    </a>
                  );
                }

                return (
                  <Link key={card.title} href={card.href} className="block">
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {showInfoNativeAd && (
          <section className="py-4">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-5xl">
                <AdsterraNativeBanner
                  slotName="info-native"
                  description="This support page may show a third-party native placement. Core tools and downloads remain unaffected."
                  collapseOnNoFill
                />
              </div>
            </div>
          </section>
        )}

        {showMonetizationDisclosure && (
          <section className="py-6">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-5xl">
                <MonetizationDisclosureCard locale={locale} />
              </div>
            </div>
          </section>
        )}

        <section className="py-12 bg-[hsl(var(--color-muted)/0.3)]">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <Card className="p-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--color-accent-soft))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-accent-strong))]">
                  <Gavel className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>AGPL and attribution</span>
                </div>
                <h2 className="mb-4 text-2xl font-bold text-[hsl(var(--color-foreground))]">
                  OpenToolsKit is public, modified, and clearly attributed
                </h2>
                <div className="space-y-4 text-sm leading-7 text-[hsl(var(--color-muted-foreground))]">
                  <p>
                    OpenToolsKit is based on PDFCraft under AGPL-3.0 and has been materially reworked for a broader
                    browser-tool platform, refreshed visual system, Cloudflare launch path, workflow/editor alignment,
                    and sponsor architecture.
                  </p>
                  <p>
                    Files are processed locally where applicable. The public source, license, attribution, and support
                    paths are kept visible so users and reviewers can verify the project boundaries.
                  </p>
                  <p>
                    Optional advertising or partner surfaces, when enabled outside review mode, are separate from the
                    core file-processing flow.
                  </p>
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="mb-4 text-xl font-semibold text-[hsl(var(--color-foreground))]">
                  Quick actions
                </h2>
                <div className="flex flex-col gap-3">
                  <a href={siteConfig.links.githubIssues} target="_blank" rel="noreferrer noopener">
                    <Button variant="primary" className="w-full justify-center">
                      Report an issue
                    </Button>
                  </a>
                  <a href={siteConfig.links.source} target="_blank" rel="noreferrer noopener">
                    <Button variant="outline" className="w-full justify-center">
                      View source code
                    </Button>
                  </a>
                  <a href={supportEmailHref}>
                    <Button variant="outline" className="w-full justify-center">
                      Email support
                    </Button>
                  </a>
                  <Link href={`/${locale}/faq/`}>
                    <Button variant="ghost" className="w-full justify-center">
                      Review FAQ
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="pb-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {sourceCards.map((card) => {
                const Icon = card.icon;

                return (
                  <a key={card.title} href={card.href} target="_blank" rel="noopener noreferrer" className="block">
                    <Card className="h-full p-6" hover>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--color-muted))]">
                        <Icon className="h-6 w-6 text-[hsl(var(--color-muted-foreground))]" />
                      </div>
                      <h2 className="mb-3 text-lg font-semibold text-[hsl(var(--color-foreground))]">
                        {card.title}
                      </h2>
                      <p className="mb-5 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                        {card.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--color-primary))]">
                        {card.action}
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Card>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
