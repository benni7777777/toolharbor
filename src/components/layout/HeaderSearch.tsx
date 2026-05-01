'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { type Locale } from '@/lib/i18n/config';
import type { SearchResult } from '@/lib/utils/search';

type LocalizedToolContent = Record<string, { title: string; description: string }>;
type SearchToolsFn = (query: string, localizedContent?: LocalizedToolContent) => SearchResult[];

interface HeaderSearchProps {
  locale: Locale;
  placeholder: string;
  onNavigate?: () => void;
}

export const HeaderSearch: React.FC<HeaderSearchProps> = ({ locale, placeholder, onNavigate }) => {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [localizedTools, setLocalizedTools] = useState<LocalizedToolContent | null>(null);
  const [searchToolsFn, setSearchToolsFn] = useState<SearchToolsFn | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const loadPromiseRef = useRef<Promise<void> | null>(null);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    setSelectedIndex(-1);
  }, []);

  const loadSearchData = useCallback(() => {
    if (searchToolsFn && localizedTools) {
      return Promise.resolve();
    }

    if (loadPromiseRef.current) {
      return loadPromiseRef.current;
    }

    setIsLoading(true);
    loadPromiseRef.current = Promise.all([
      import('@/config/tools'),
      import('@/config/tool-content'),
      import('@/lib/utils/search'),
    ])
      .then(([toolsModule, toolContentModule, searchModule]) => {
        const contentMap: LocalizedToolContent = {};

        for (const tool of toolsModule.getAllTools()) {
          const content = toolContentModule.getToolContent(locale, tool.id);
          if (content) {
            contentMap[tool.id] = {
              title: content.title,
              description: content.metaDescription,
            };
          }
        }

        setLocalizedTools(contentMap);
        setSearchToolsFn(() => searchModule.searchTools);
      })
      .finally(() => {
        setIsLoading(false);
        loadPromiseRef.current = null;
      });

    return loadPromiseRef.current;
  }, [locale, localizedTools, searchToolsFn]);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
    void loadSearchData();
    window.setTimeout(() => searchInputRef.current?.focus(), 50);
  }, [loadSearchData]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSelectedIndex(-1);
      return;
    }

    if (!searchToolsFn || !localizedTools) {
      void loadSearchData();
      setSearchResults([]);
      setSelectedIndex(-1);
      return;
    }

    const results = searchToolsFn(searchQuery, localizedTools);
    setSearchResults(results.slice(0, 8));
    setSelectedIndex(-1);
  }, [loadSearchData, localizedTools, searchQuery, searchToolsFn]);

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        closeSearch();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeSearch, isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [openSearch]);

  const navigateToTool = useCallback(
    (slug: string) => {
      router.push(`/${locale}/tools/${slug}/`);
      closeSearch();
      onNavigate?.();
    },
    [closeSearch, locale, onNavigate, router]
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
        closeSearch();
      }
    },
    [closeSearch, navigateToTool, searchResults, selectedIndex]
  );

  return (
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
            placeholder={placeholder}
            className="w-full min-w-[16rem] rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] py-2 pl-10 pr-10 text-sm text-[hsl(var(--color-foreground))] shadow-[var(--shadow-sm)] outline-none transition-all focus:border-[hsl(var(--color-accent-strong))]"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={closeSearch}
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
            aria-label="Close search"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>

          {(searchResults.length > 0 || (isLoading && searchQuery.trim())) && (
            <div className="absolute right-0 top-full z-50 mt-2 w-full min-w-[22rem] overflow-hidden rounded-3xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-2 shadow-[var(--shadow-lg)]">
              {searchResults.length > 0 ? (
                <ul className="space-y-1" role="listbox">
                  {searchResults.map((result, index) => {
                    const localized = localizedTools?.[result.tool.id];
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
              ) : (
                <div className="px-3 py-3 text-sm text-[hsl(var(--color-muted-foreground))]">
                  Loading tools...
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={openSearch}
          className="border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))/0.74]"
          aria-label="Open search"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
        </Button>
      )}
    </div>
  );
};

export default HeaderSearch;
