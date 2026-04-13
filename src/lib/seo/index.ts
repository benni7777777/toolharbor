/**
 * SEO Module Exports
 * 
 * @module lib/seo
 */

// Metadata generation
export {
  generateBaseMetadata,
  generateToolMetadata,
  generateHomeMetadata,
  generateToolsListMetadata,
  generateAboutMetadata,
  generateFaqMetadata,
  generatePrivacyMetadata,
  generateContactMetadata,
  generateWorkflowMetadata,
  generateCategoryMetadata,
  getCanonicalUrl,
  getAlternateUrls,
  getOpenGraphLocale,
  validateMetadata,
  type BaseMetadataOptions,
  type PageMetadataOptions,
  type ToolMetadataOptions,
} from './metadata';

export { getToolSeoProfile, type ToolSeoProfile } from './profiles';
export { getStaticPageSeo, getCategorySeo } from '@/config/seo';

// Structured data generation
export {
  generateSoftwareApplicationSchema,
  generateFAQPageSchema,
  generateWebSiteSchema,
  generateOrganizationSchema,
  generateBasicWebPageSchema,
  generateBreadcrumbSchema,
  generateItemListSchema,
  generateToolPageStructuredData,
  generateHowToSchema,
  generateWebPageSchema,
  serializeStructuredData,
  validateSoftwareApplicationSchema,
  validateFAQPageSchema,
  type SoftwareApplicationSchema,
  type FAQPageSchema,
  type WebSiteSchema,
  type OrganizationSchema,
  type BreadcrumbListSchema,
  type ItemListSchema,
  type HowToSchema,
  type WebPageSchema,
} from './structured-data';
