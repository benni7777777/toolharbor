import { describe, expect, it } from 'vitest';
import { buildToolGrowthPathways, getGrowthClusterForTool, scoreScaleCandidate } from '@/lib/growth/clusters';
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

  it('rejects unsupported or indistinct page candidates', () => {
    const score = scoreScaleCandidate({
      clusterId: 'exact-kb-image-upload-fixes',
      pageType: 'use-case',
      proposedUrl: '/tools/compress-image-fast',
      primaryIntent: 'compress image fast',
      differentiators: ['generic compression wording'],
      existingUrls: ['/tools/compress-image'],
      linkedFrom: [],
      isSupportedByProduct: false,
      isMateriallyDistinct: false,
      hasOriginalRequirementOrWorkflow: false,
    });

    expect(score.recommendation).toBe('reject');
    expect(score.internalLinkRole).toBe('missing');
    expect(score.duplicationRisk).toBeGreaterThanOrEqual(50);
  });

  it('allows useful candidates with product support, unique workflow value, and links', () => {
    const score = scoreScaleCandidate({
      clusterId: 'pdf-workflows',
      pageType: 'troubleshooting',
      proposedUrl: '/en/guides/pdf-too-large-to-upload',
      primaryIntent: 'pdf too large to upload',
      differentiators: [
        'upload failure diagnosis',
        'browser compression workflow',
        'when to split instead of compress',
      ],
      existingUrls: ['/en/tools/compress-pdf', '/en/tools/split-pdf'],
      linkedFrom: ['/en/tools/compress-pdf', '/en/tools/category/optimize-repair'],
      isSupportedByProduct: true,
      isMateriallyDistinct: true,
      hasOriginalRequirementOrWorkflow: true,
    });

    expect(score.recommendation).toBe('publish');
    expect(score.internalLinkRole).toBe('clear');
    expect(score.contentDifferenceScore).toBeGreaterThanOrEqual(60);
  });
});
