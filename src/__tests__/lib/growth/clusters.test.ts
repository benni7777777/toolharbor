import { describe, expect, it } from 'vitest';
import { buildToolGrowthPathways, getGrowthClusterForTool } from '@/lib/growth/clusters';
import { getToolById } from '@/config/tools';

describe('growth clusters', () => {
  it('maps live PDF tools to the PDF workflow cluster', () => {
    const tool = getToolById('merge-pdf');

    expect(tool).toBeDefined();
    expect(getGrowthClusterForTool(tool!).id).toBe('pdf-workflows');
  });

  it('builds only live internal pathway links for tool pages', () => {
    const tool = getToolById('compress-pdf')!;
    const links = buildToolGrowthPathways(tool, 'en');

    expect(links.map((link) => link.href)).toEqual([
      '/en/tools/category/optimize-repair',
      '/en/workflow',
      '/en/tools',
    ]);
    expect(links.every((link) => link.clusterId === 'pdf-workflows')).toBe(true);
  });
});
