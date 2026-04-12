'use client';

import { useTranslations } from 'next-intl';

type TranslationValues = Record<string, string | number | boolean | Date | null | undefined>;

export function useSafeTranslations(namespace?: string) {
  try {
    const translate = namespace ? useTranslations(namespace) : useTranslations();

    return (key: string, values?: TranslationValues) => {
      const result = values
        ? (translate as (translationKey: never, translationValues: TranslationValues) => unknown)(key as never, values)
        : (translate as (translationKey: never) => unknown)(key as never);
      return typeof result === 'string' ? result : key;
    };
  } catch {
    return (key: string) => key;
  }
}
