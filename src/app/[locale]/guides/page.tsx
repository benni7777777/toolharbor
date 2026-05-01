import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { BookOpenCheck } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBaseMetadata, generateBasicWebPageSchema, generateBreadcrumbSchema, generateItemListSchema } from '@/lib/seo';
import type { Locale } from '@/lib/i18n/config';
import { guides } from '@/content/guides';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export function generateMetadata(): Metadata {
  return generateBaseMetadata({
    locale: 'en',
    path: '/guides',
    title: 'PDF Guides - Practical Browser Tool Workflows',
    description:
      'Read practical OpenToolsKit guides for merging, compressing, converting, signing, protecting, redacting, and reviewing PDF files.',
    alternateLocales: ['en'],
  });
}

interface GuidesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function GuidesPage({ params }: GuidesPageProps) {
  const { locale } = await params;
  if (locale !== 'en') {
    notFound();
  }

  const localeValue = locale as Locale;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={generateBasicWebPageSchema({
          locale: localeValue,
          path: '/guides',
          name: 'OpenToolsKit PDF Guides',
          description: 'Practical guides for browser-based PDF workflows.',
          type: 'CollectionPage',
          aboutName: 'PDF workflow guides',
        })}
      />
      <JsonLd
        data={generateBreadcrumbSchema(
          [
            { name: 'Home', path: '' },
            { name: 'Guides', path: '/guides' },
          ],
          localeValue
        )}
      />
      <JsonLd
        data={generateItemListSchema({
          locale: localeValue,
          path: '/guides',
          name: 'OpenToolsKit PDF Guides',
          items: guides.map((guide) => ({
            name: guide.title,
            path: `/guides/${guide.slug}`,
          })),
        })}
      />
      <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))]">
        <Header locale={localeValue} />
        <main id="main-content" className="mx-auto w-full max-w-screen-xl flex-1 py-16 xl:max-w-[calc(100vw-32rem)] min-[1800px]:max-w-screen-xl">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-4 py-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                <BookOpenCheck className="h-4 w-4 text-[hsl(var(--color-accent-strong))]" aria-hidden="true" />
                <span>Practical PDF workflow guides</span>
              </div>
              <h1 className="text-4xl font-bold text-[hsl(var(--color-foreground))] md:text-5xl">
                PDF guides for real document workflows
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[hsl(var(--color-muted-foreground))]">
                These guides explain how to choose and verify browser-based PDF workflows before sending, filing,
                publishing, or archiving documents. They focus on practical steps, limits, privacy checks, and
                responsible use rather than shortcut claims.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
              {guides.map((guide) => (
                <Link key={guide.slug} href={`/${localeValue}/guides/${guide.slug}/`} className="block">
                  <Card className="h-full p-6" hover>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--color-accent-strong))]">
                      Updated {guide.updatedAt}
                    </p>
                    <h2 className="text-xl font-semibold text-[hsl(var(--color-foreground))]">
                      {guide.title}
                    </h2>
                    <p className="mt-4 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                      {guide.summary}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>
        <Footer locale={localeValue} />
      </div>
    </>
  );
}
