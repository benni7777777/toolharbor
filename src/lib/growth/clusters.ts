import type { Tool, ToolCategory } from '@/types/tool';

export type GrowthClusterId =
  | 'pdf-workflows'
  | 'exact-kb-image-upload-fixes'
  | 'passport-id-application-photos'
  | 'social-formatting-publishing-cleanup'
  | 'metadata-seo-publishing-launch-tools'
  | 'evergreen-calculators-dev-utilities';

export type GrowthPageType =
  | 'tool'
  | 'cluster-hub'
  | 'use-case'
  | 'troubleshooting'
  | 'comparison'
  | 'spec'
  | 'workflow'
  | 'collection'
  | 'guide'
  | 'glossary';

export type GrowthBuildStatus = 'live' | 'build-now' | 'planned' | 'blocked-until-tool-exists';

export interface GrowthCluster {
  id: GrowthClusterId;
  name: string;
  status: GrowthBuildStatus;
  priority: number;
  liveRouteFamilies: string[];
  targetRouteFamilies: string[];
  productSupport: 'live' | 'partial' | 'planned';
  primaryIntent: string;
  differentiation: string;
  monetizationFit: 'high' | 'medium' | 'low';
}

export interface GrowthPathwayLink {
  href: string;
  label: string;
  description: string;
  pageType: GrowthPageType;
  clusterId: GrowthClusterId;
  role: 'hub' | 'adjacent-tool' | 'workflow' | 'directory';
}

export interface ScaleCandidateInput {
  clusterId: GrowthClusterId;
  pageType: GrowthPageType;
  proposedUrl: string;
  primaryIntent: string;
  differentiators: string[];
  existingUrls: string[];
  linkedFrom: string[];
  isSupportedByProduct: boolean;
  isMateriallyDistinct: boolean;
  hasOriginalRequirementOrWorkflow: boolean;
}

export interface ScaleCandidateScore {
  duplicationRisk: number;
  cannibalizationRisk: number;
  contentDifferenceScore: number;
  usefulnessScore: number;
  internalLinkRole: 'clear' | 'weak' | 'missing';
  recommendation: 'publish' | 'rewrite' | 'reject';
  reasons: string[];
}

export const GROWTH_PAGE_TYPES: readonly GrowthPageType[] = [
  'tool',
  'cluster-hub',
  'use-case',
  'troubleshooting',
  'comparison',
  'spec',
  'workflow',
  'collection',
  'guide',
  'glossary',
];

export const GROWTH_CLUSTERS: readonly GrowthCluster[] = [
  {
    id: 'pdf-workflows',
    name: 'PDF workflows',
    status: 'live',
    priority: 1,
    liveRouteFamilies: ['/[locale]/tools', '/[locale]/tools/[tool]', '/[locale]/tools/category/[category]', '/[locale]/workflow'],
    targetRouteFamilies: ['/[locale]/tools/[tool]', '/[locale]/tools/category/[category]', '/[locale]/workflow', '/[locale]/guides/pdf-*'],
    productSupport: 'live',
    primaryIntent: 'Browser-first PDF editing, conversion, organization, optimization, and security tasks.',
    differentiation: 'Client-side PDF processing with transparent open-source monetization and no account wall.',
    monetizationFit: 'high',
  },
  {
    id: 'exact-kb-image-upload-fixes',
    name: 'Exact-KB image and upload-limit fixes',
    status: 'build-now',
    priority: 2,
    liveRouteFamilies: [],
    targetRouteFamilies: ['/tools/compress-image-to-[limit]', '/guides/image-upload-fixes/*', '/collections/upload-limit-fixes'],
    productSupport: 'planned',
    primaryIntent: 'Make images pass exact upload-size, pixel, and format limits for portals and forms.',
    differentiation: 'Problem-specific upload repair paths rather than generic image compression copy.',
    monetizationFit: 'high',
  },
  {
    id: 'passport-id-application-photos',
    name: 'Passport, ID, and application photo workflows',
    status: 'planned',
    priority: 3,
    liveRouteFamilies: [],
    targetRouteFamilies: ['/tools/passport-photo-maker', '/guides/id-photo-requirements/*', '/workflows/application-photo-prep'],
    productSupport: 'planned',
    primaryIntent: 'Crop, resize, background-clean, and validate identity or application photos.',
    differentiation: 'Requirement-led workflows with visible privacy and local processing.',
    monetizationFit: 'high',
  },
  {
    id: 'metadata-seo-publishing-launch-tools',
    name: 'Metadata, SEO, and publishing tools',
    status: 'planned',
    priority: 4,
    liveRouteFamilies: [],
    targetRouteFamilies: ['/tools/meta-title-checker', '/tools/og-preview', '/guides/publishing-checklists/*'],
    productSupport: 'planned',
    primaryIntent: 'Prepare pages, previews, slugs, robots files, and launch metadata before publishing.',
    differentiation: 'Practical launch QA with previewable outputs instead of abstract SEO checklists.',
    monetizationFit: 'medium',
  },
  {
    id: 'social-formatting-publishing-cleanup',
    name: 'Social formatting and publishing cleanup',
    status: 'planned',
    priority: 5,
    liveRouteFamilies: [],
    targetRouteFamilies: ['/tools/instagram-line-breaks', '/tools/youtube-description-formatter', '/collections/social-publishing'],
    productSupport: 'planned',
    primaryIntent: 'Format social captions, bios, hashtags, descriptions, and publishing text without account access.',
    differentiation: 'Copy-safe formatting tools with clear platform-specific constraints.',
    monetizationFit: 'medium',
  },
  {
    id: 'evergreen-calculators-dev-utilities',
    name: 'Evergreen calculators and light developer utilities',
    status: 'planned',
    priority: 6,
    liveRouteFamilies: [],
    targetRouteFamilies: ['/tools/age-calculator', '/tools/json-formatter', '/tools/base64-decode', '/collections/developer-utilities'],
    productSupport: 'planned',
    primaryIntent: 'Quick repeat-use calculators, counters, encoders, validators, and formatters.',
    differentiation: 'Fast browser utilities grouped by real workflows, not one-off commodity pages.',
    monetizationFit: 'medium',
  },
];

const categoryHubLabels: Record<ToolCategory, string> = {
  'edit-annotate': 'Edit and annotate PDF tools',
  'convert-to-pdf': 'Convert files to PDF',
  'convert-from-pdf': 'Convert PDF to other formats',
  'organize-manage': 'Organize and manage PDF pages',
  'optimize-repair': 'Optimize and repair PDFs',
  'secure-pdf': 'Secure and clean PDF files',
};

export function getGrowthClusterById(clusterId: GrowthClusterId): GrowthCluster {
  const cluster = GROWTH_CLUSTERS.find((item) => item.id === clusterId);

  if (!cluster) {
    throw new Error(`Unknown growth cluster: ${clusterId}`);
  }

  return cluster;
}

export function getGrowthClusterForTool(tool: Pick<Tool, 'toolFamily' | 'seoCategorySlug'>): GrowthCluster {
  if (tool.toolFamily === 'pdf' || tool.seoCategorySlug === 'pdf-tools') {
    return getGrowthClusterById('pdf-workflows');
  }

  return getGrowthClusterById('evergreen-calculators-dev-utilities');
}

export function getCategoryHubLabel(category: ToolCategory): string {
  return categoryHubLabels[category];
}

export function buildToolGrowthPathways(tool: Tool, locale: string): GrowthPathwayLink[] {
  const cluster = getGrowthClusterForTool(tool);
  const hubLabel = getCategoryHubLabel(tool.category);

  return [
    {
      href: `/${locale}/tools/category/${tool.category}`,
      label: `${hubLabel} hub`,
      description: 'Choose the closest task in this PDF category before switching tools.',
      pageType: 'cluster-hub',
      clusterId: cluster.id,
      role: 'hub',
    },
    {
      href: `/${locale}/workflow`,
      label: 'Build a multi-step PDF workflow',
      description: 'Chain adjacent PDF actions when one tool is only part of the job.',
      pageType: 'workflow',
      clusterId: cluster.id,
      role: 'workflow',
    },
    {
      href: `/${locale}/tools`,
      label: 'Browse all browser PDF tools',
      description: 'Scan every live PDF utility and route to the right next action.',
      pageType: 'collection',
      clusterId: cluster.id,
      role: 'directory',
    },
  ];
}

export function scoreScaleCandidate(input: ScaleCandidateInput): ScaleCandidateScore {
  const reasons: string[] = [];
  const normalizedUrl = input.proposedUrl.toLowerCase().replace(/\/+$/, '');
  const existingUrlMatch = input.existingUrls.some((url) => url.toLowerCase().replace(/\/+$/, '') === normalizedUrl);
  const similarIntentMatch = input.existingUrls.some((url) => normalizedUrl.includes(url.toLowerCase().replace(/\/+$/, '')));

  let duplicationRisk = existingUrlMatch ? 90 : 20;
  let cannibalizationRisk = similarIntentMatch ? 65 : 25;
  let contentDifferenceScore = Math.min(100, input.differentiators.length * 22 + (input.hasOriginalRequirementOrWorkflow ? 24 : 0));
  let usefulnessScore = input.isSupportedByProduct ? 50 : 10;

  if (!input.isMateriallyDistinct) {
    duplicationRisk += 30;
    cannibalizationRisk += 25;
    contentDifferenceScore -= 25;
    reasons.push('The page does not describe a materially distinct user problem.');
  }

  if (!input.isSupportedByProduct) {
    reasons.push('The current product cannot complete the promised task.');
  }

  if (!input.hasOriginalRequirementOrWorkflow) {
    reasons.push('The page lacks a concrete requirement, workflow, or failure mode.');
  }

  if (input.linkedFrom.length === 0) {
    reasons.push('No crawl or user journey role has been assigned.');
  } else {
    usefulnessScore += Math.min(20, input.linkedFrom.length * 5);
  }

  usefulnessScore += Math.min(30, input.differentiators.length * 8);

  duplicationRisk = clampScore(duplicationRisk);
  cannibalizationRisk = clampScore(cannibalizationRisk);
  contentDifferenceScore = clampScore(contentDifferenceScore);
  usefulnessScore = clampScore(usefulnessScore);

  const internalLinkRole = input.linkedFrom.length >= 2 ? 'clear' : input.linkedFrom.length === 1 ? 'weak' : 'missing';
  const recommendation =
    input.isSupportedByProduct
    && input.isMateriallyDistinct
    && contentDifferenceScore >= 60
    && usefulnessScore >= 70
    && duplicationRisk < 55
    && cannibalizationRisk < 60
    && internalLinkRole !== 'missing'
      ? 'publish'
      : input.isSupportedByProduct && input.isMateriallyDistinct
        ? 'rewrite'
        : 'reject';

  if (recommendation === 'publish') {
    reasons.push('The candidate has enough unique value and a clear internal-link role.');
  }

  return {
    duplicationRisk,
    cannibalizationRisk,
    contentDifferenceScore,
    usefulnessScore,
    internalLinkRole,
    recommendation,
    reasons,
  };
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}
