/**
 * SEO Metadata Generation Utilities
 * Provides functions for generating meta tags, Open Graph, and Twitter Card data
 * 
 * @module lib/seo/metadata
 */

import type { Metadata } from 'next';
import { getCategorySeo, getStaticPageSeo } from '@/config/seo';
import { siteConfig } from '@/config/site';
import { defaultLocale, type Locale, locales } from '@/lib/i18n/config';
import { getToolSeoProfile } from '@/lib/seo/profiles';
import type { Tool, ToolContent } from '@/types/tool';
import type { ToolCategory } from '@/types/tool';

/**
 * Base metadata configuration
 */
export interface BaseMetadataOptions {
  locale: Locale;
  path?: string;
}

/**
 * Page-specific metadata options
 */
export interface PageMetadataOptions extends BaseMetadataOptions {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}

/**
 * Tool page metadata options
 */
export interface ToolMetadataOptions extends BaseMetadataOptions {
  tool: Tool;
  content: ToolContent;
}

/**
 * Generate the canonical URL for a page
 */
export function withTrailingSlash(value: string): string {
  if (!value || value.endsWith('/') || value.endsWith('.txt') || value.endsWith('.xml')) {
    return value;
  }

  const [withoutHash, hash] = value.split('#');
  const normalized = withoutHash.endsWith('/') ? withoutHash : `${withoutHash}/`;
  return hash ? `${normalized}#${hash}` : normalized;
}

function normalizePagePath(path: string = ''): string {
  if (!path || path === '/') {
    return '';
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return withTrailingSlash(cleanPath);
}

export function getCanonicalUrl(locale: Locale, path: string = ''): string {
  const cleanPath = normalizePagePath(path);
  return withTrailingSlash(`${siteConfig.url}/${locale}${cleanPath}`);
}

/**
 * Generate alternate language URLs for hreflang tags
 */
export function getAlternateUrls(path: string = ''): Record<string, string> {
  const alternates: Record<string, string> = {};

  for (const locale of locales) {
    alternates[locale] = getCanonicalUrl(locale, path);
  }

  alternates['x-default'] = getCanonicalUrl(defaultLocale, path);

  return alternates;
}

/**
 * Generate base metadata for any page
 */
export function generateBaseMetadata(options: PageMetadataOptions): Metadata {
  const { locale, path = '', title, description, image, noIndex = false } = options;

  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  const canonicalUrl = getCanonicalUrl(locale, path);
  const ogImage = image || siteConfig.ogImage;
  const ogLocale = getOpenGraphLocale(locale);

  // Ensure description is optimal length (150-160 characters)
  const optimizedDescription = description.length > 160
    ? description.substring(0, 157) + '...'
    : description;

  return {
    title: fullTitle,
    description: optimizedDescription,
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    robots: noIndex
      ? { index: false, follow: true }
      : {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
      apple: '/favicon.svg',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateUrls(path),
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: canonicalUrl,
      title: fullTitle,
      description: optimizedDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: optimizedDescription,
      images: [ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`],
      creator: siteConfig.seo.twitterHandle,
    },
    verification: {
      // Add verification tags if needed
      // google: 'google-site-verification-code',
      // yandex: 'yandex-verification-code',
    },
    category: 'technology',
  };
}

/**
 * Generate metadata for tool pages
 */
export function generateToolMetadata(options: ToolMetadataOptions): Metadata {
  const { locale, tool, content } = options;
  const path = `/tools/${tool.slug}`;
  const seoProfile = getToolSeoProfile(tool, content);

  return generateBaseMetadata({
    locale,
    path,
    title: seoProfile.pageTitle,
    description: seoProfile.metaDescription,
  });
}

/**
 * Generate metadata for the homepage
 */
export function generateHomeMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  const pageSeo = getStaticPageSeo('home');

  return generateBaseMetadata({
    locale,
    path: '',
    title: locale === 'en' ? pageSeo.title : translations?.title || pageSeo.title,
    description: locale === 'en' ? pageSeo.description : translations?.description || pageSeo.description,
  });
}

/**
 * Generate metadata for the tools listing page
 */
export function generateToolsListMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  const pageSeo = getStaticPageSeo('tools');
  return generateBaseMetadata({
    locale,
    path: '/tools',
    title: locale === 'en' ? pageSeo.title : translations?.title || pageSeo.title,
    description: locale === 'en' ? pageSeo.description : translations?.description || pageSeo.description,
  });
}

/**
 * Generate metadata for the about page
 */
export function generateAboutMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  const pageSeo = getStaticPageSeo('about');
  return generateBaseMetadata({
    locale,
    path: '/about',
    title: locale === 'en' ? pageSeo.title : translations?.title || pageSeo.title,
    description: locale === 'en' ? pageSeo.description : translations?.description || pageSeo.description,
  });
}

/**
 * Generate metadata for the FAQ page
 */
export function generateFaqMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  const pageSeo = getStaticPageSeo('faq');
  return generateBaseMetadata({
    locale,
    path: '/faq',
    title: locale === 'en' ? pageSeo.title : translations?.title || pageSeo.title,
    description: locale === 'en' ? pageSeo.description : translations?.description || pageSeo.description,
  });
}

/**
 * Generate metadata for the privacy page
 */
export function generatePrivacyMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  const pageSeo = getStaticPageSeo('privacy');
  return generateBaseMetadata({
    locale,
    path: '/privacy',
    title: locale === 'en' ? pageSeo.title : translations?.title || pageSeo.title,
    description: locale === 'en' ? pageSeo.description : translations?.description || pageSeo.description,
  });
}

/**
 * Generate metadata for the contact page
 */
export function generateContactMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  const pageSeo = getStaticPageSeo('contact');
  return generateBaseMetadata({
    locale,
    path: '/contact',
    title: locale === 'en' ? pageSeo.title : translations?.title || pageSeo.title,
    description: locale === 'en' ? pageSeo.description : translations?.description || pageSeo.description,
  });
}

export function generateWorkflowMetadata(locale: Locale): Metadata {
  const pageSeo = getStaticPageSeo('workflow');
  return generateBaseMetadata({
    locale,
    path: '/workflow',
    title: pageSeo.title,
    description: pageSeo.description,
  });
}

export function generateCategoryMetadata(locale: Locale, category: ToolCategory): Metadata {
  const categorySeo = getCategorySeo(category);
  return generateBaseMetadata({
    locale,
    path: `/tools/category/${category}`,
    title: categorySeo.title,
    description: categorySeo.description,
  });
}

/**
 * Convert locale to Open Graph locale format
 */
export function getOpenGraphLocale(locale: Locale): string {
  const ogLocaleMap: Record<Locale, string> = {
    en: 'en_US',
    ja: 'ja_JP',
    ko: 'ko_KR',
    es: 'es_ES',
    fr: 'fr_FR',
    de: 'de_DE',
    zh: 'zh_CN',
    'zh-TW': 'zh_TW',
    pt: 'pt_BR',
    ar: 'ar_AR',
    it: 'it_IT',
    id: 'id_ID',
    vi: 'vi_VN',
  };
  return ogLocaleMap[locale] || 'en_US';
}

/**
 * Check if metadata contains all required fields
 */
export function validateMetadata(metadata: Metadata): {
  valid: boolean;
  missingFields: string[];
} {
  const requiredFields = ['title', 'description'];
  const requiredOgFields = ['title', 'description'];
  const requiredTwitterFields = ['card', 'title', 'description'];

  const missingFields: string[] = [];

  // Check base fields
  for (const field of requiredFields) {
    if (!metadata[field as keyof Metadata]) {
      missingFields.push(field);
    }
  }

  // Check Open Graph fields
  if (metadata.openGraph) {
    for (const field of requiredOgFields) {
      if (!metadata.openGraph[field as keyof typeof metadata.openGraph]) {
        missingFields.push(`og:${field}`);
      }
    }
  } else {
    missingFields.push('openGraph');
  }

  // Check Twitter Card fields
  if (metadata.twitter) {
    for (const field of requiredTwitterFields) {
      if (!metadata.twitter[field as keyof typeof metadata.twitter]) {
        missingFields.push(`twitter:${field}`);
      }
    }
  } else {
    missingFields.push('twitter');
  }

  return {
    valid: missingFields.length === 0,
    missingFields,
  };
}
