'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { locales, defaultLocale } from '@/lib/i18n/config';

export default function RootRedirectClient() {
  const router = useRouter();

  useEffect(() => {
    try {
      const browserLang = navigator.language;
      const primaryLang = browserLang.split('-')[0];

      if ((locales as readonly string[]).includes(primaryLang)) {
        router.replace(`/${primaryLang}`);
      } else {
        router.replace(`/${defaultLocale}`);
      }
    } catch {
      router.replace(`/${defaultLocale}`);
    }
  }, [router]);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="text-3xl font-bold text-[hsl(var(--color-foreground))]">
        Redirecting to your OpenToolsKit locale
      </h1>
      <p className="mt-4 text-base leading-7 text-[hsl(var(--color-muted-foreground))]">
        OpenToolsKit serves localized routes. If you are not redirected automatically, continue to the English homepage or pick another supported locale below.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href={`/${defaultLocale}`} className="rounded-full bg-[hsl(var(--color-primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--color-primary-foreground))]">
          Continue to English
        </Link>
        {locales.filter((locale) => locale !== defaultLocale).slice(0, 6).map((locale) => (
          <Link
            key={locale}
            href={`/${locale}`}
            className="rounded-full border border-[hsl(var(--color-border))] px-4 py-2 text-sm text-[hsl(var(--color-foreground))]"
          >
            {locale}
          </Link>
        ))}
      </div>
    </main>
  );
}
