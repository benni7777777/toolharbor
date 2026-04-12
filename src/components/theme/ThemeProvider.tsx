'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { siteConfig, type ThemePreference } from '@/config/site';

type ResolvedTheme = Exclude<ThemePreference, 'system'>;

interface ThemeContextValue {
  theme: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveTheme(theme: ThemePreference, prefersDark: boolean): ResolvedTheme {
  if (theme === 'system') {
    return prefersDark ? 'dark' : 'light';
  }

  return theme;
}

function applyTheme(theme: ThemePreference) {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const resolvedTheme = resolveTheme(theme, media.matches);
  const root = document.documentElement;

  root.dataset.theme = theme;
  root.classList.toggle('dark', resolvedTheme === 'dark');
  root.style.colorScheme = resolvedTheme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>(siteConfig.theme.defaultMode);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(siteConfig.theme.storageKey) as ThemePreference | null;
    const nextTheme =
      storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system'
        ? storedTheme
        : siteConfig.theme.defaultMode;

    applyTheme(nextTheme);
    setThemeState(nextTheme);
    setResolvedTheme(resolveTheme(nextTheme, window.matchMedia('(prefers-color-scheme: dark)').matches));

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      const activeTheme =
        (window.localStorage.getItem(siteConfig.theme.storageKey) as ThemePreference | null) ??
        siteConfig.theme.defaultMode;

      const nextResolvedTheme = resolveTheme(activeTheme, event.matches);
      setResolvedTheme(nextResolvedTheme);

      if (activeTheme === 'system') {
        applyTheme(activeTheme);
      }
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const setTheme = (nextTheme: ThemePreference) => {
    window.localStorage.setItem(siteConfig.theme.storageKey, nextTheme);
    applyTheme(nextTheme);
    setThemeState(nextTheme);
    setResolvedTheme(resolveTheme(nextTheme, window.matchMedia('(prefers-color-scheme: dark)').matches));
  };

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
