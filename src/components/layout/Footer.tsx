'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Globe, ShieldCheck } from 'lucide-react';
import { type Locale, localeConfig, getLocalizedPath } from '@/lib/i18n/config';
import { indexableLocales } from '@/lib/i18n/indexing';
import { usePathname, useRouter } from 'next/navigation';
import { saveLanguagePreference } from './LanguageSelector';
import { BrandMark } from './BrandMark';
import { siteConfig } from '@/config/site';
import { useSafeTranslations } from '@/lib/i18n/useSafeTranslations';

export interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const t = useSafeTranslations('common');
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const pathname = usePathname();
  const showMonetizationDisclosure = siteConfig.ads.enabled || siteConfig.sponsorship.enabled;
  const visibleLocales = indexableLocales as readonly Locale[];

  const handleLanguageChange = (newLocale: Locale) => {
    saveLanguagePreference(newLocale);
    router.push(getLocalizedPath(pathname, newLocale));
  };

  return (
    <footer className="border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))/0.88] backdrop-blur-xl" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-[1.3fr_0.9fr_0.9fr_1fr]">
          <div className="space-y-5">
            <Link href={`/${locale}/`} className="inline-flex items-center gap-3">
              <BrandMark className="h-11 w-11" />
              <div>
                <div className="text-xs font-black uppercase tracking-[0.22em] text-[hsl(var(--color-accent-strong))]">
                  {siteConfig.shortName}
                </div>
                <div className="text-xl font-semibold text-[hsl(var(--color-foreground))]" data-testid="footer-brand-name">
                  {t('brand')}
                </div>
              </div>
            </Link>

            <p className="max-w-xl text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
              {siteConfig.launchDescription}
            </p>

            <div className="rounded-[1.5rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-subtle))] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[hsl(var(--color-accent-soft))] text-[hsl(var(--color-accent-strong))]">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-[hsl(var(--color-foreground))]">Private by design</p>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                    Files stay in your browser where applicable, and the live source remains public under AGPL-3.0.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-accent-strong))]">Trust</h3>
            <ul className="space-y-3 text-sm text-[hsl(var(--color-muted-foreground))]">
              <li>
                <Link href={`/${locale}/privacy/`} className="transition-colors hover:text-[hsl(var(--color-foreground))]">
                  {t('navigation.privacy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms/`} className="transition-colors hover:text-[hsl(var(--color-foreground))]">
                  Terms
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/editorial/`} className="transition-colors hover:text-[hsl(var(--color-foreground))]">
                  Editorial policy
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about/`} className="transition-colors hover:text-[hsl(var(--color-foreground))]">
                  {t('navigation.about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/faq/`} className="transition-colors hover:text-[hsl(var(--color-foreground))]">
                  {t('navigation.faq')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact/`} className="transition-colors hover:text-[hsl(var(--color-foreground))]">
                  Support
                </Link>
              </li>
              <li>
                <a href={siteConfig.links.source} target="_blank" rel="noreferrer noopener" className="transition-colors hover:text-[hsl(var(--color-foreground))]">
                  Source code
                </a>
              </li>
              <li>
                <a href={siteConfig.legal.upstreamUrl} target="_blank" rel="noreferrer noopener" className="transition-colors hover:text-[hsl(var(--color-foreground))]">
                  {siteConfig.legal.noticeLabel}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-accent-strong))]">Popular PDF tasks</h3>
            <ul className="space-y-3 text-sm text-[hsl(var(--color-muted-foreground))]">
              <li>
                <Link href={`/${locale}/tools/merge-pdf/`} className="transition-colors hover:text-[hsl(var(--color-foreground))]">
                  Merge PDF files
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools/compress-pdf/`} className="transition-colors hover:text-[hsl(var(--color-foreground))]">
                  Compress a PDF for upload limits
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools/jpg-to-pdf/`} className="transition-colors hover:text-[hsl(var(--color-foreground))]">
                  Convert JPG to PDF
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools/pdf-to-jpg/`} className="transition-colors hover:text-[hsl(var(--color-foreground))]">
                  Convert PDF pages to JPG
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools/sign-pdf/`} className="transition-colors hover:text-[hsl(var(--color-foreground))]">
                  Sign a PDF in your browser
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools/encrypt-pdf/`} className="transition-colors hover:text-[hsl(var(--color-foreground))]">
                  Encrypt a PDF
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/workflow/`} className="transition-colors hover:text-[hsl(var(--color-foreground))]">
                  Build a PDF workflow
                </Link>
              </li>
              {locale === 'en' && (
                <li>
                  <Link href={`/${locale}/guides/`} className="transition-colors hover:text-[hsl(var(--color-foreground))]">
                    Read PDF workflow guides
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-accent-strong))]">Open project</h3>
            <div className="space-y-3 rounded-[1.5rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-4">
              <a
                href={siteConfig.links.source}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-3 text-sm text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-foreground))]"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>Source code</span>
              </a>
              <a
                href={siteConfig.links.githubIssues}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-3 text-sm text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-foreground))]"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>Report an issue</span>
              </a>
              <p className="text-xs leading-5 text-[hsl(var(--color-muted-foreground))]">
                {siteConfig.legal.noticeSummary}
              </p>
              {showMonetizationDisclosure && (
                <p className="text-xs leading-5 text-[hsl(var(--color-muted-foreground))]">
                  {siteConfig.ads.disclosureSummary} {siteConfig.sponsorship.disclosure}
                </p>
              )}
              <p className="text-xs leading-5 text-[hsl(var(--color-muted-foreground))]">
                Source code for the live service is publicly available under {siteConfig.legal.license}.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[hsl(var(--color-border))] pt-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {visibleLocales.length > 1 && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]" aria-hidden="true" />
                <div className="flex flex-wrap gap-2">
                  {visibleLocales.map((loc) => {
                    const isActive = loc === locale;
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => handleLanguageChange(loc)}
                        className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                          isActive
                            ? 'bg-[hsl(var(--color-primary))] text-[hsl(var(--color-primary-foreground))]'
                            : 'bg-[hsl(var(--color-surface-subtle))] text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]'
                        }`}
                      >
                        {localeConfig[loc].nativeName}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
              &copy; {currentYear} {t('brand')}. {siteConfig.legal.license} licensed.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
