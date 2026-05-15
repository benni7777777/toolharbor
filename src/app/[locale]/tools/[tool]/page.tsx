import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import '@/lib/polyfills/promise-with-resolvers';
import { getToolBySlug, getAllTools } from '@/config/tools';
import { getToolContent, type Locale } from '@/config/tool-content';
import { ToolPage } from '@/components/tools/ToolPage';
import { ToolInterface } from '@/components/tools/ToolInterface';
import { generateToolMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  generateSoftwareApplicationSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema
} from '@/lib/seo/structured-data';
import { getToolSeoProfile } from '@/lib/seo/profiles';
import { getToolEditorialContent, getToolVisibleFaq } from '@/content/tool-editorial';
import { isPublisherReviewedTool } from '@/lib/seo/publisher-review';
import type { Metadata } from 'next';

const SUPPORTED_LOCALES: Locale[] = ['en', 'ja', 'ko', 'es', 'fr', 'de', 'zh', 'zh-TW', 'pt', 'ar', 'it', 'id', 'vi'];

interface ToolPageParams {
  params: Promise<{
    locale: string;
    tool: string;
  }>;
}

/**
 * Generate static params for all tool pages
 */
export async function generateStaticParams() {
  const tools = getAllTools();

  return SUPPORTED_LOCALES.flatMap(locale =>
    tools.map(tool => ({
      locale,
      tool: tool.slug,
    }))
  );
}

/**
 * Generate metadata for tool pages
 */
export async function generateMetadata({ params }: ToolPageParams): Promise<Metadata> {
  const { locale: localeParam, tool: toolSlug } = await params;
  const locale = localeParam as Locale;
  const tool = getToolBySlug(toolSlug);
  const t = await getTranslations({ locale, namespace: 'errors' });

  if (!tool) {
    return {
      title: t('toolNotFound'),
    };
  }

  const content = getToolContent(locale, tool.id);

  if (!content) {
    return {
      title: tool.id,
    };
  }

  return generateToolMetadata({
    tool,
    content,
    locale,
  });
}

/**
 * Tool Page Component
 * Renders the appropriate tool interface based on the tool slug
 */
export default async function ToolPageRoute({ params }: ToolPageParams) {
  const { locale: localeParam, tool: toolSlug } = await params;
  const locale = localeParam as Locale;

  // Enable static rendering for this locale - MUST be called before getTranslations
  setRequestLocale(locale);

  // Get tool data
  const tool = getToolBySlug(toolSlug);

  if (!tool) {
    notFound();
  }

  // Get tool content for the locale (falls back to English)
  const content = getToolContent(locale, tool.id);

  if (!content) {
    notFound();
  }

  const seoProfile = getToolSeoProfile(tool, content);
  const editorial = getToolEditorialContent(tool, content, seoProfile);
  const visibleFaq = locale === 'en' ? getToolVisibleFaq(content, editorial) : content.faq;

  // Generate structured data
  const toolStructuredData = generateSoftwareApplicationSchema(tool, content, locale);
  const faqStructuredData = generateFAQSchema(visibleFaq);
  const howToStructuredData = generateHowToSchema(tool, content, locale);
  const webPageStructuredData = generateWebPageSchema(tool, content, locale);
  const breadcrumbStructuredData = generateBreadcrumbSchema(
    [
      { name: 'Home', path: '' },
      { name: 'Tools', path: '/tools' },
      { name: content.title, path: `/tools/${tool.slug}` },
    ],
    locale
  );

  // Prepare localized content for related tools
  const localizedRelatedTools = tool.relatedTools.reduce((acc, relatedId) => {
    const relatedTool = getAllTools().find((candidate) => candidate.id === relatedId);
    if (!relatedTool || !isPublisherReviewedTool(relatedTool)) {
      return acc;
    }

    const relatedContent = getToolContent(locale, relatedId);
    if (relatedContent) {
      acc[relatedId] = {
        title: relatedContent.title,
        description: relatedContent.metaDescription
      };
    }
    return acc;
  }, {} as Record<string, { title: string; description: string }>);

  return (
    <>
      {/* Structured Data */}
      <JsonLd data={toolStructuredData} />
      <JsonLd data={webPageStructuredData} />
      <JsonLd data={breadcrumbStructuredData} />
      {faqStructuredData && <JsonLd data={faqStructuredData} />}
      {howToStructuredData && <JsonLd data={howToStructuredData} />}

      {/* Tool Page */}
      <ToolPage
        tool={tool}
        content={content}
        locale={locale}
        localizedRelatedTools={localizedRelatedTools}
        editorial={editorial}
        faqItems={visibleFaq}
      >
        <ToolInterface toolId={tool.id} />
      </ToolPage>
    </>
  );
}
