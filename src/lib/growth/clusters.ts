import type { Tool, ToolCategory } from '@/types/tool';

export type GrowthClusterId =
  | 'pdf-workflows'
  | 'evergreen-calculators-dev-utilities';

export interface GrowthCluster {
  id: GrowthClusterId;
  name: string;
}

export interface GrowthPathwayLink {
  href: string;
  label: string;
  description: string;
  clusterId: GrowthClusterId;
  role: 'hub' | 'workflow' | 'directory';
}

export const GROWTH_CLUSTERS: readonly GrowthCluster[] = [
  {
    id: 'pdf-workflows',
    name: 'PDF workflows',
  },
  {
    id: 'evergreen-calculators-dev-utilities',
    name: 'Evergreen calculators and light developer utilities',
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
      clusterId: cluster.id,
      role: 'hub',
    },
    {
      href: `/${locale}/workflow`,
      label: 'Build a multi-step PDF workflow',
      description: 'Chain adjacent PDF actions when one tool is only part of the job.',
      clusterId: cluster.id,
      role: 'workflow',
    },
    {
      href: `/${locale}/tools`,
      label: 'Browse all browser PDF tools',
      description: 'Scan every live PDF utility and route to the right next action.',
      clusterId: cluster.id,
      role: 'directory',
    },
  ];
}
