import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ArrowLeft, BookOpenCheck } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { JsonLd } from '@/components/seo/JsonLd';
import { getToolById } from '@/config/tools';
import { getToolContent } from '@/config/tool-content';
import { generateBaseMetadata, generateBasicWebPageSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { getCanonicalUrl } from '@/lib/seo/metadata';
import type { Locale } from '@/lib/i18n/config';
import { getGuideBySlug, guides } from '@/content/guides';
import { isPublisherReviewedTool } from '@/lib/seo/publisher-review';

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({
    locale: 'en',
    guide: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; guide: string }>;
}): Promise<Metadata> {
  const { locale, guide: guideSlug } = await params;
  if (locale !== 'en') {
    return { title: 'Guide not found' };
  }

  const guide = getGuideBySlug(guideSlug);
  if (!guide) {
    return { title: 'Guide not found' };
  }

  return generateBaseMetadata({
    locale: 'en',
    path: `/guides/${guide.slug}`,
    title: guide.title,
    description: guide.description,
    alternateLocales: ['en'],
  });
}

interface GuidePageProps {
  params: Promise<{ locale: string; guide: string }>;
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { locale, guide: guideSlug } = await params;
  if (locale !== 'en') {
    notFound();
  }

  const guide = getGuideBySlug(guideSlug);
  if (!guide) {
    notFound();
  }

  const localeValue = locale as Locale;
  setRequestLocale(locale);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updatedAt,
    inLanguage: 'en-US',
    mainEntityOfPage: getCanonicalUrl(localeValue, `/guides/${guide.slug}`),
    publisher: {
      '@type': 'Organization',
      name: 'OpenToolsKit',
      url: getCanonicalUrl(localeValue),
    },
  };

  return (
    <>
      <JsonLd
        data={generateBasicWebPageSchema({
          locale: localeValue,
          path: `/guides/${guide.slug}`,
          name: guide.title,
          description: guide.description,
          aboutName: 'PDF workflow guide',
        })}
      />
      <JsonLd
        data={generateBreadcrumbSchema(
          [
            { name: 'Home', path: '' },
            { name: 'Guides', path: '/guides' },
            { name: guide.title, path: `/guides/${guide.slug}` },
          ],
          localeValue
        )}
      />
      <JsonLd data={articleSchema} />
      <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))]">
        <Header locale={localeValue} />
        <main id="main-content" className="mx-auto w-full max-w-screen-xl flex-1 py-12 xl:max-w-[calc(100vw-32rem)] min-[1800px]:max-w-screen-xl">
          <article className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <Link
                href={`/${localeValue}/guides/`}
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--color-primary))] hover:underline"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to guides
              </Link>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-4 py-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                <BookOpenCheck className="h-4 w-4 text-[hsl(var(--color-accent-strong))]" aria-hidden="true" />
                <span>Updated {guide.updatedAt}</span>
              </div>

              <h1 className="text-4xl font-bold leading-tight text-[hsl(var(--color-foreground))] md:text-5xl">
                {guide.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-[hsl(var(--color-muted-foreground))]">
                {guide.summary}
              </p>

              <div className="mt-10 space-y-10">
                {guide.sections.map((section) => (
                  <section key={section.heading} aria-labelledby={`${guide.slug}-${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                    <h2
                      id={`${guide.slug}-${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      className="text-2xl font-bold text-[hsl(var(--color-foreground))]"
                    >
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4 text-base leading-8 text-[hsl(var(--color-muted-foreground))]">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {section.steps && (
                      <ol className="mt-5 space-y-3">
                        {section.steps.map((step, index) => (
                          <li key={step} className="flex gap-3 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--color-primary))] text-xs font-semibold text-[hsl(var(--color-primary-foreground))]">
                              {index + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </section>
                ))}
              </div>

              <section className="mt-12" aria-labelledby="related-tools-heading">
                <h2 id="related-tools-heading" className="text-2xl font-bold text-[hsl(var(--color-foreground))]">
                  Related tools
                </h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {guide.relatedTools.map((item) => {
                    const tool = getToolById(item.toolId);
                    if (!tool || !isPublisherReviewedTool(tool)) {
                      return null;
                    }
                    const content = getToolContent(localeValue, tool.id);
                    const toolTitle = content?.title || tool.id.replace(/-/g, ' ');

                    return (
                      <Link key={item.toolId} href={`/${localeValue}/tools/${tool.slug}/`} className="block">
                        <Card className="h-full p-5" hover>
                          <h3 className="text-lg font-semibold text-[hsl(var(--color-foreground))]">
                            {toolTitle}
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                            {item.reason}
                          </p>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </section>

              <Card className="mt-10 p-6">
                <h2 className="text-xl font-semibold text-[hsl(var(--color-foreground))]">
                  Review before sharing
                </h2>
                <p className="mt-3 text-sm leading-7 text-[hsl(var(--color-muted-foreground))]">
                  Browser tools can make document work faster, but important files should still be opened and checked
                  before they are sent, filed, published, or used in a high-stakes workflow. Keep the original file
                  until the output has been verified.
                </p>
                <p className="mt-3 text-sm leading-7 text-[hsl(var(--color-muted-foreground))]">
                  If the document is going to a client, school, government portal, employer, court, bank, or public
                  website, treat the downloaded file as a draft until the recipient requirements have been checked.
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-[hsl(var(--color-muted-foreground))]">
                  <li>Confirm the page count, page order, and orientation match the document you intended to create.</li>
                  <li>Zoom into small text, signatures, scans, diagrams, and redacted areas before sending the file.</li>
                  <li>Check hidden document properties separately when author names, source applications, or timestamps matter.</li>
                  <li>Use password protection, redaction, or metadata cleanup as separate steps when the workflow requires them.</li>
                </ul>
              </Card>
            </div>
          </article>
        </main>
        <Footer locale={localeValue} />
      </div>
    </>
  );
}
