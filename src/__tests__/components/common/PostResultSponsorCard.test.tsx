import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import PostResultSponsorCard from '@/components/common/PostResultSponsorCard';

beforeEach(() => {
  window.sessionStorage.clear();
  window.dataLayer = [];
  delete window.__OTK_MONETIZATION_DEBUG__;
});

describe('PostResultSponsorCard', () => {
  it('renders an explicit sponsor preview and tracks preview/redirect events separately', () => {
    render(
      <PostResultSponsorCard
        placementId="post-result-primary"
        toolSlug="merge-pdf"
        campaign="post-result-primary"
        placementMeta="download-panel"
        sponsorTheme="browser-speed"
      />,
    );

    const preview = screen.getByTestId('sponsor-preview-card');
    const link = screen.getByRole('link', { name: /open sponsored offer/i });

    expect(preview).toHaveAttribute('data-otk-monetization-surface', 'sponsorPreview');
    expect(preview).toHaveAttribute('data-sponsor-theme', 'browser-speed');
    expect(screen.getByText('Partner preview')).toBeInTheDocument();
    expect(screen.getByText(/site-rendered partner preview/i)).toBeInTheDocument();
    expect(link).toHaveAttribute('href', expect.stringContaining('/go/post-result-primary'));
    expect(window.__OTK_MONETIZATION_DEBUG__?.events.some(
      event => event.monetizationEvent === 'sponsor_preview_shown'
        && event.placement === 'post-result-primary',
    )).toBe(true);

    fireEvent.click(link);

    expect(window.__OTK_MONETIZATION_DEBUG__?.events.some(
      event => event.monetizationEvent === 'sponsor_preview_clicked'
        && event.placement === 'post-result-primary',
    )).toBe(true);
    expect(window.__OTK_MONETIZATION_DEBUG__?.events.some(
      event => event.monetizationEvent === 'partner_redirect_opened'
        && event.placement === 'post-result-primary',
    )).toBe(true);
  });
});
