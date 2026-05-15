import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateToolsListMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBasicWebPageSchema, generateBreadcrumbSchema, generateItemListSchema } from '@/lib/seo';
import ToolsPageClient from './ToolsPageClient';

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
  const t = await getTranslations({ locale: validLocale, namespace: 'metadata' });

  return generateToolsListMetadata(validLocale, {
    title: t('tools.title'),
    description: t('tools.description'),
  });
}

interface ToolsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ToolsPage({ params }: ToolsPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Get localized content for tools
  const { getPublisherReviewedTools } = await import('@/lib/seo/publisher-review');
  const { getToolContent } = await import('@/config/tool-content');
  const activeTools = getPublisherReviewedTools();

  const localizedToolContent = activeTools.reduce((acc, tool) => {
    const content = getToolContent(locale as Locale, tool.id);
    if (content) {
      acc[tool.id] = {
        title: content.title,
        description: content.metaDescription
      };
    }
    return acc;
  }, {} as Record<string, { title: string; description: string }>);

  const localeValue = locale as Locale;
  const itemList = generateItemListSchema({
    locale: localeValue,
    path: '/tools',
    name: 'OpenToolsKit PDF Tools',
    items: activeTools.map((tool) => ({
      name: localizedToolContent[tool.id]?.title || tool.slug,
      path: `/tools/${tool.slug}`,
    })),
  });

  const webPage = generateBasicWebPageSchema({
    locale: localeValue,
    path: '/tools',
    name: 'All PDF Tools',
    description: 'Directory of browser-based PDF tools for merging, splitting, converting, editing, and securing documents.',
    type: 'CollectionPage',
    aboutName: 'PDF tools',
  });

  const breadcrumb = generateBreadcrumbSchema(
    [
      { name: 'Home', path: '' },
      { name: 'Tools', path: '/tools' },
    ],
    localeValue
  );

  return (
    <>
      <JsonLd data={webPage} />
      <JsonLd data={itemList} />
      <JsonLd data={breadcrumb} />
      <ToolsPageClient locale={localeValue} localizedToolContent={localizedToolContent} />
    </>
  );
}
