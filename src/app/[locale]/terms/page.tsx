import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { FileText, ShieldCheck } from 'lucide-react';
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
    path: '/terms',
    title: 'Terms of Use',
    description:
      'Terms for using OpenToolsKit browser tools, public source code, optional partner links, and support surfaces.',
  });
}

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  const localeValue = locale as Locale;
  setRequestLocale(locale);

  const sections = [
    {
      title: 'Using the tools',
      body:
        'OpenToolsKit provides browser-based utilities for document and workflow tasks. You are responsible for checking outputs before relying on them for legal, financial, medical, regulatory, or other high-stakes use.',
    },
    {
      title: 'Local processing and files',
      body:
        'Where applicable, file processing happens in your browser. OpenToolsKit does not promise that every browser, file, or format variation will behave identically, and large or damaged files may fail on some devices.',
    },
    {
      title: 'Lawful use',
      body:
        'Use OpenToolsKit only with files and content you are allowed to process. Do not use the tools to bypass rights, permissions, access controls, or laws that apply to you.',
    },
    {
      title: 'Third-party links',
      body:
        'OpenToolsKit may link to third-party pages, source repositories, or optional partner surfaces. Those destinations have their own terms, privacy practices, and availability.',
    },
    {
      title: 'Open-source license',
      body:
        `The website code is distributed under ${siteConfig.legal.license}. Source availability and upstream attribution are preserved through the public repository and NOTICE file.`,
    },
  ];

  return (
    <>
      <JsonLd
        data={generateBasicWebPageSchema({
          locale: localeValue,
          path: '/terms',
          name: 'Terms of Use',
          description: 'Terms for using OpenToolsKit browser tools and public source surfaces.',
          aboutName: 'Terms of use',
        })}
      />
      <JsonLd
        data={generateBreadcrumbSchema(
          [
            { name: 'Home', path: '' },
            { name: 'Terms', path: '/terms' },
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
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>Last updated April 22, 2026</span>
              </div>
              <h1 className="text-4xl font-bold text-[hsl(var(--color-foreground))]">
                Terms of Use
              </h1>
              <p className="mt-5 text-lg leading-8 text-[hsl(var(--color-muted-foreground))]">
                These terms explain the basic rules for using {siteConfig.name}, its browser tools, source links,
                optional partner surfaces, and support paths.
              </p>

              <div className="mt-10 space-y-5">
                {sections.map((section) => (
                  <Card key={section.title} className="p-6">
                    <h2 className="text-xl font-semibold text-[hsl(var(--color-foreground))]">
                      {section.title}
                    </h2>
                    <p className="mt-3 leading-7 text-[hsl(var(--color-muted-foreground))]">
                      {section.body}
                    </p>
                  </Card>
                ))}
              </div>

              <Card className="mt-8 p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 text-[hsl(var(--color-primary))]" aria-hidden="true" />
                  <div>
                    <h2 className="text-xl font-semibold text-[hsl(var(--color-foreground))]">
                      Questions
                    </h2>
                    <p className="mt-3 leading-7 text-[hsl(var(--color-muted-foreground))]">
                      Use the <Link href={`/${localeValue}/contact/`} className="text-[hsl(var(--color-primary))] underline">contact page</Link> for support,
                      privacy questions, source review, or AGPL attribution questions.
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
