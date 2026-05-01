import type { Locale } from '@/lib/i18n/config';

export const indexableLocales = ['en'] as const satisfies readonly Locale[];

export function isIndexableLocale(locale: Locale): boolean {
  return (indexableLocales as readonly Locale[]).includes(locale);
}
