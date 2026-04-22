'use client';

import { ArrowLeft, FileQuestion, Home, Search } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { defaultLocale, locales, type Locale } from '@/lib/i18n/config';

function getRouteLocale(value: unknown): Locale {
  const locale = Array.isArray(value) ? value[0] : value;
  return typeof locale === 'string' && (locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : defaultLocale;
}

export default function NotFound() {
  const params = useParams();
  const locale = getRouteLocale(params?.locale);

  const suggestions = [
    { label: 'Browse tools', href: `/${locale}/tools/` },
    { label: 'Popular PDF tools', href: `/${locale}/tools/category/organize-manage/` },
    { label: 'FAQ', href: `/${locale}/faq/` },
    { label: 'Contact support', href: `/${locale}/contact/` },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))]">
      <Header locale={locale} />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--color-muted))]">
            <FileQuestion className="h-8 w-8 text-[hsl(var(--color-muted-foreground))]" />
          </div>

          <h1 className="text-3xl font-bold text-[hsl(var(--color-foreground))]">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[hsl(var(--color-muted-foreground))]">
            This URL does not match a current public OpenToolsKit page. Try the tool directory, FAQ, or contact page
            instead of retrying the same address.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {suggestions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[hsl(var(--color-border))] px-4 py-3 text-sm font-medium text-[hsl(var(--color-foreground))] transition-colors hover:bg-[hsl(var(--color-muted))]"
              >
                <Search className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={`/${locale}/`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[hsl(var(--color-primary))] px-4 py-2 font-medium text-[hsl(var(--color-primary-foreground))] transition-opacity hover:opacity-90"
            >
              <Home className="h-4 w-4" />
              Go home
            </Link>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[hsl(var(--color-secondary))] px-4 py-2 font-medium text-[hsl(var(--color-secondary-foreground))] transition-opacity hover:opacity-90"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </button>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
