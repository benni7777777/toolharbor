'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Github, Menu, X } from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/Button';
import { RecentFilesDropdown } from '@/components/common/RecentFilesDropdown';
import { siteConfig } from '@/config/site';
import { LanguageSelector } from './LanguageSelector';
import { BrandMark } from './BrandMark';
import { HeaderSearch } from './HeaderSearch';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useSafeTranslations } from '@/lib/i18n/useSafeTranslations';

export interface HeaderProps {
  locale: Locale;
  showSearch?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ locale, showSearch = true }) => {
  const t = useSafeTranslations('common');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = useMemo(
    () => {
      const items = [
        { href: `/${locale}/`, label: t('navigation.home') },
        { href: `/${locale}/tools/`, label: t('navigation.tools') },
        { href: `/${locale}/workflow/`, label: t('navigation.workflow') || 'Workflow' },
      ];

      if (locale === 'en') {
        items.push({ href: `/${locale}/guides/`, label: 'Guides' });
      }

      items.push(
        { href: `/${locale}/about/`, label: t('navigation.about') },
        { href: `/${locale}/faq/`, label: t('navigation.faq') },
      );

      return items;
    },
    [locale, t]
  );

  return (
    <header
      className="sticky top-0 z-50 border-b border-[hsl(var(--color-border))/0.65] bg-[hsl(var(--color-background))/0.78] backdrop-blur-md"
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="grid gap-3 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={`/${locale}/`}
              className="group inline-flex items-center gap-3 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))/0.82] px-3 py-2 shadow-[var(--shadow-sm)] transition-transform hover:-translate-y-0.5"
              aria-label={`${t('brand')} - ${t('navigation.home')}`}
            >
              <BrandMark className="h-10 w-10" />
              <div className="min-w-0">
                <div className="text-sm font-black uppercase tracking-[0.2em] text-[hsl(var(--color-accent-strong))]">
                  {siteConfig.shortName}
                </div>
                <div className="text-lg font-semibold text-[hsl(var(--color-foreground))]" data-testid="brand-name">
                  {t('brand')}
                </div>
              </div>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden"
              aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </Button>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <nav
              className="inline-flex flex-wrap items-center gap-1 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))/0.76] p-1 shadow-[var(--shadow-sm)]"
              role="navigation"
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-[hsl(var(--color-muted-foreground))] transition-colors hover:bg-[hsl(var(--color-surface-subtle))] hover:text-[hsl(var(--color-foreground))]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center justify-end gap-2">
            {showSearch && (
              <HeaderSearch
                locale={locale}
                placeholder={t('search.placeholder') || 'Search tools'}
                onNavigate={() => setIsMobileMenuOpen(false)}
              />
            )}

            <RecentFilesDropdown
              locale={locale}
              translations={{
                title: t('recentFiles.title') || 'Recent files',
                empty: t('recentFiles.empty') || 'No recent files',
                clearAll: t('recentFiles.clearAll') || 'Clear all',
                processedWith: t('recentFiles.processedWith') || 'Processed with',
              }}
            />
            <ThemeToggle />
            <LanguageSelector currentLocale={locale} />
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))/0.72] text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-foreground))] lg:inline-flex"
              aria-label="Source code on GitHub"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-3 rounded-[2rem] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))/0.92] p-4 shadow-[var(--shadow-md)] lg:hidden">
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-surface-subtle))]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-2xl px-4 py-3 text-sm font-medium text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-surface-subtle))]"
              >
                GitHub
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
