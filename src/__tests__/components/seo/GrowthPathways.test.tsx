import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GrowthPathways } from '@/components/seo/GrowthPathways';
import { getToolById } from '@/config/tools';

describe('GrowthPathways', () => {
  it('renders cluster-aware links without planned placeholder routes', () => {
    const tool = getToolById('merge-pdf')!;
    const relatedTools = tool.relatedTools
      .map((id) => getToolById(id))
      .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate));

    render(
      <GrowthPathways
        tool={tool}
        locale="en"
        relatedTools={relatedTools}
        localizedRelatedTools={{}}
      />,
    );

    expect(screen.getByText('Where this fits in pdf workflows')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go to organize and manage pdf pages hub/i })).toHaveAttribute('href', '/en/tools/category/organize-manage');
    expect(screen.getByRole('link', { name: /go to build a multi-step pdf workflow/i })).toHaveAttribute('href', '/en/workflow');
    expect(screen.getByRole('link', { name: /go to browse all browser pdf tools/i })).toHaveAttribute('href', '/en/tools');
    expect(screen.getByText('Browse all browser PDF tools')).toBeInTheDocument();
    expect(screen.queryByText(/placeholder/i)).not.toBeInTheDocument();
  });
});
