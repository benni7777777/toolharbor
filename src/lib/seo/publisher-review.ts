import { getAllTools, getToolsByCategory } from '@/config/tools';
import type { Tool, ToolCategory } from '@/types/tool';

/**
 * Tool pages with enough visible, manually reviewed publisher content for
 * AdSense review. Other tools remain usable, but should not be promoted as
 * indexable discovery pages until their visible content is reviewed.
 */
export const publisherReviewedToolSlugs = [
  'merge-pdf',
  'compress-pdf',
  'jpg-to-pdf',
  'pdf-to-jpg',
  'split-pdf',
  'sign-pdf',
  'encrypt-pdf',
  'decrypt-pdf',
  'remove-metadata',
  'ocr-pdf',
  'pdf-to-docx',
  'word-to-pdf',
  'extract-pages',
  'rotate-pdf',
  'add-watermark',
  'page-numbers',
  'delete-pages',
  'pdf-reader',
  'find-and-redact',
  'repair-pdf',
  'organize-pdf',
  'png-to-pdf',
  'pdf-to-png',
  'pdf-to-pdfa',
] as const;

const publisherReviewedToolSlugSet = new Set<string>(publisherReviewedToolSlugs);

export function isPublisherReviewedTool(toolOrSlug: Pick<Tool, 'slug'> | string): boolean {
  const slug = typeof toolOrSlug === 'string' ? toolOrSlug : toolOrSlug.slug;
  return publisherReviewedToolSlugSet.has(slug);
}

export function getPublisherReviewedTools(): Tool[] {
  return getAllTools().filter(isPublisherReviewedTool);
}

export function getPublisherReviewedToolsByCategory(category: ToolCategory): Tool[] {
  return getToolsByCategory(category).filter(isPublisherReviewedTool);
}
