'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Github, Menu, Search, X } from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/Button';
import { RecentFilesDropdown } from '@/components/common/RecentFilesDropdown';
import { searchTools, SearchResult } from '@/lib/utils/search';
import { getToolContent } from '@/config/tool-content';
import { getAllTools } from '@/config/tools';
import { siteConfig } from '@/config/site';
import { LanguageSelector } from './LanguageSelector';
import { BrandMark } from './BrandMark';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useSafeTranslations } from '@/lib/i18n/useSafeTranslations';

export interface HeaderProps {
  locale: Locale;
  showSearch?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ locale, showSearch = true }) => {
  const t = useSafeTranslations('common');
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [localizedTools, setLocalizedTools] = useState<Record<string, { title: string; description: string }>>({});
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allTools = getAllTools();
    const contentMap: Record<string, { title: string; description: string }> = {};

    allTools.forEach((tool) => {
      const content = getToolContent(locale, tool.id);
      if (content) {
        contentMap[tool.id] = {
          title: content.title,
          description: content.metaDescription,
        };
      }
    });

    setLocalizedTools(contentMap);
  }, [locale]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSelectedIndex(-1);
      return;
    }

    const results = searchTools(searchQuery, localizedTools);
    setSearchResults(results.slice(0, 8));
    setSelectedIndex(-1);
  }, [searchQuery, localizedTools]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateToTool = useCallback(
    (slug: string) => {
      router.push(`/${locale}/tools/${slug}/`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setSearchResults([]);
      setIsMobileMenuOpen(false);
    },
    [locale, router]
  );

  const handleSearchKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, searchResults.length - 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, -1));
      } else if (event.key === 'Enter') {
        event.preventDefault();
        const target = selectedIndex >= 0 ? searchResults[selectedIndex] : searchResults[0];
        if (target) {
          navigateToTool(target.tool.slug);
        }
      } else if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    },
    [navigateToTool, searchResults, selectedIndex]
  );

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
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-[hsl(var(--color-border))/0.9] bg-[hsl(var(--color-background))/0.84] backdrop-blur-xl'
          : 'border-transparent bg-[hsl(var(--color-background))/0.55] backdrop-blur-md'
      }`}
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
              <div className="relative" ref={searchContainerRef}>
                {isSearchOpen ? (
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--color-muted-foreground))]" aria-hidden="true" />
                    <input
                      ref={searchInputRef}
                      type="search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      onKeyDown={handleSearchKeyDown}
                      placeholder={t('search.placeholder') || 'Search tools'}
                      className="w-full min-w-[16rem] rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] py-2 pl-10 pr-10 text-sm text-[hsl(var(--color-foreground))] shadow-[var(--shadow-sm)] outline-none transition-all focus:border-[hsl(var(--color-accent-strong))]"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                      className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                      aria-label="Close search"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </Button>

                    {searchResults.length > 0 && (
                      <div className="absolute right-0 top-full z-50 mt-2 w-full min-w-[22rem] overflow-hidden rounded-3xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-2 shadow-[var(--shadow-lg)]">
                        <ul className="space-y-1" role="listbox">
                          {searchResults.map((result, index) => {
                            const localized = localizedTools[result.tool.id];
                            const title = localized?.title || result.tool.slug;
                            const description = localized?.description || result.tool.features.slice(0, 3).join(', ');
                            const isSelected = index === selectedIndex;

                            return (
                              <li key={result.tool.id}>
                                <button
                                  type="button"
                                  onClick={() => navigateToTool(result.tool.slug)}
                                  onMouseEnter={() => setSelectedIndex(index)}
                                  className={`flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition-colors ${
                                    isSelected
                                      ? 'bg-[hsl(var(--color-accent-soft))] text-[hsl(var(--color-foreground))]'
                                      : 'hover:bg-[hsl(var(--color-surface-subtle))]'
                                  }`}
                                  role="option"
                                  aria-selected={isSelected}
                                >
                                  <span className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-2xl bg-[hsl(var(--color-surface-subtle))] text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-accent-strong))]">
                                    {result.tool.toolFamily}
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block truncate text-sm font-semibold">{title}</span>
                                    <span className="block truncate text-xs text-[hsl(var(--color-muted-foreground))]">{description}</span>
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setIsSearchOpen(true);
                      setTimeout(() => searchInputRef.current?.focus(), 50);
                    }}
                    className="border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))/0.74]"
                    aria-label="Open search"
                  >
                    <Search className="h-4 w-4" aria-hidden="true" />
                  </Button>
                )}
              </div>
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
