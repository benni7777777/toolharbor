/**
 * Sitemap Generation
 * Generates sitemap.xml for all pages across all locales
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import { MetadataRoute } from 'next';
import { type Locale } from '@/lib/i18n/config';
import { indexableLocales } from '@/lib/i18n/indexing';
import { getPublisherReviewedTools } from '@/lib/seo/publisher-review';
import { TOOL_CATEGORIES } from '@/types/tool';
import { getCanonicalUrl } from '@/lib/seo/metadata';
import { guides } from '@/content/guides';

// Required for static export
export const dynamic = 'force-static';

/**
 * Priority values for different page types
 */
const PRIORITY = {
  home: 1.0,
  tools: 0.9,
  category: 0.8,
  toolPage: 0.8,
  workflow: 0.7,
  guides: 0.7,
  guidePage: 0.7,
  static: 0.6,
} as const;

/**
 * Change frequency for different page types
 */
const CHANGE_FREQUENCY = {
  home: 'daily',
  tools: 'weekly',
  category: 'weekly',
  toolPage: 'weekly',
  workflow: 'weekly',
  guides: 'monthly',
  guidePage: 'monthly',
  static: 'monthly',
} as const;

/**
 * Static pages that exist for all locales
 */
const STATIC_PAGES = [
  { path: '', priority: PRIORITY.home, changeFrequency: CHANGE_FREQUENCY.home },
  { path: '/tools', priority: PRIORITY.tools, changeFrequency: CHANGE_FREQUENCY.tools },
  { path: '/workflow', priority: PRIORITY.workflow, changeFrequency: CHANGE_FREQUENCY.workflow },
  { path: '/about', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/faq', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/privacy', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/terms', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/editorial', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/contact', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
];

/**
 * Generate sitemap entries for a specific locale
 */
function generateLocaleEntries(locale: Locale, lastModified: Date): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  
  // Add static pages
  for (const page of STATIC_PAGES) {
    entries.push({
      url: getCanonicalUrl(locale, page.path),
      lastModified,
      changeFrequency: page.changeFrequency as 'daily' | 'weekly' | 'monthly',
      priority: page.priority,
    });
  }

  for (const category of TOOL_CATEGORIES) {
    entries.push({
      url: getCanonicalUrl(locale, `/tools/category/${category}`),
      lastModified,
      changeFrequency: CHANGE_FREQUENCY.category,
      priority: PRIORITY.category,
    });
  }
  
  // Add tool pages
  const tools = getPublisherReviewedTools();
  for (const tool of tools) {
    entries.push({
      url: getCanonicalUrl(locale, `/tools/${tool.slug}`),
      lastModified,
      changeFrequency: CHANGE_FREQUENCY.toolPage,
      priority: PRIORITY.toolPage,
    });
  }

  if (locale === 'en') {
    entries.push({
      url: getCanonicalUrl(locale, '/guides'),
      lastModified,
      changeFrequency: CHANGE_FREQUENCY.guides,
      priority: PRIORITY.guides,
    });

    for (const guide of guides) {
      entries.push({
        url: getCanonicalUrl(locale, `/guides/${guide.slug}`),
        lastModified,
        changeFrequency: CHANGE_FREQUENCY.guidePage,
        priority: PRIORITY.guidePage,
      });
    }
  }
  
  return entries;
}

/**
 * Generate the complete sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const allEntries: MetadataRoute.Sitemap = [];
  
  // Generate entries only for locales with reviewed, indexable public content.
  for (const locale of indexableLocales) {
    const localeEntries = generateLocaleEntries(locale, lastModified);
    allEntries.push(...localeEntries);
  }
  
  return allEntries;
}

/**
 * Get total number of URLs in sitemap
 * Useful for testing and validation
 */
export function getSitemapUrlCount(): number {
  const tools = getPublisherReviewedTools();
  const staticPagesCount = STATIC_PAGES.length;
  const categoryPagesCount = TOOL_CATEGORIES.length;
  const toolPagesCount = tools.length;
  const localesCount = indexableLocales.length;
  const englishGuidePagesCount = guides.length + 1;
  
  return ((staticPagesCount + categoryPagesCount + toolPagesCount) * localesCount) + englishGuidePagesCount;
}
