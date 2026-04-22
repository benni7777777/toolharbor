import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { BookOpenCheck, GitPullRequest } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateBaseMetadata, generateBasicWebPageSchema, generateBreadcrumbSchema } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';

  return generateBaseMetadata({
    locale: validLocale,
    path: '/editorial',
    title: 'Editorial Policy',
    description:
      'How OpenToolsKit keeps tool descriptions, support information, source attribution, and optional monetization disclosures accurate.',
    keywords: ['opentoolskit editorial policy', 'tool descriptions', 'source attribution'],
  });
}

interface EditorialPageProps {
  params: Promise<{ locale: string }>;
}

export default async function EditorialPage({ params }: EditorialPageProps) {
  const { locale } = await params;
  const localeValue = locale as Locale;
  setRequestLocale(locale);

  const principles = [
    {
      title: 'Tool descriptions',
      body:
        'Tool pages should describe what the tool is for, expected inputs, expected outputs, and practical limitations. We avoid implying that a browser tool can guarantee perfect results for every file.',
    },
    {
      title: 'Privacy claims',
      body:
        'Privacy copy must reflect the actual implementation. When processing is local where applicable, pages should say that clearly without overstating behavior for every possible third-party link or browser feature.',
    },
    {
      title: 'Source and attribution',
      body:
        `OpenToolsKit preserves AGPL source availability and attribution for PDFCraft-derived work through visible repository and NOTICE links.`,
    },
    {
      title: 'Monetization boundaries',
      body:
        'Advertising and partner surfaces, when enabled outside AdSense review mode, must be labeled and kept separate from core tool actions. They should not be presented as editorial recommendations.',
    },
    {
      title: 'Corrections',
      body:
        'Users can report outdated copy, broken links, mistranslations, or tool behavior mismatches through support email or GitHub Issues.',
    },
  ];

  return (
    <>
      <JsonLd
        data={generateBasicWebPageSchema({
          locale: localeValue,
          path: '/editorial',
          name: 'Editorial Policy',
          description: 'Editorial standards for OpenToolsKit tool pages and trust surfaces.',
          aboutName: 'Editorial policy',
        })}
      />
      <JsonLd
        data={generateBreadcrumbSchema(
          [
            { name: 'Home', path: '' },
            { name: 'Editorial Policy', path: '/editorial' },
          ],
          localeValue
        )}
      />
      <div className="min-h-screen flex flex-col">
        <Header locale={localeValue} />
        <main className="mx-auto w-full max-w-screen-xl flex-1 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-border))] px-4 py-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                <span>Public content standards</span>
              </div>
              <h1 className="text-4xl font-bold text-[hsl(var(--color-foreground))]">
                Editorial Policy
              </h1>
              <p className="mt-5 text-lg leading-8 text-[hsl(var(--color-muted-foreground))]">
                {siteConfig.name} is open source, so public content should be clear, accurate, and easy to
                verify against the implementation and source repository.
              </p>

              <div className="mt-10 space-y-5">
                {principles.map((principle) => (
                  <Card key={principle.title} className="p-6">
                    <h2 className="text-xl font-semibold text-[hsl(var(--color-foreground))]">
                      {principle.title}
                    </h2>
                    <p className="mt-3 leading-7 text-[hsl(var(--color-muted-foreground))]">
                      {principle.body}
                    </p>
                  </Card>
                ))}
              </div>

              <Card className="mt-8 p-6">
                <div className="flex items-start gap-3">
                  <GitPullRequest className="mt-1 h-5 w-5 text-[hsl(var(--color-primary))]" aria-hidden="true" />
                  <div>
                    <h2 className="text-xl font-semibold text-[hsl(var(--color-foreground))]">
                      Request a correction
                    </h2>
                    <p className="mt-3 leading-7 text-[hsl(var(--color-muted-foreground))]">
                      Use the <Link href={`/${localeValue}/contact/`} className="text-[hsl(var(--color-primary))] underline">contact page</Link> or
                      the public issue tracker to report inaccurate content, stale metadata, or broken internal links.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
        <Footer locale={localeValue} />
      </div>
    </>
  );
}
