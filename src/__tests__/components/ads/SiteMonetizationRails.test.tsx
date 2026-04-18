import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import SiteMonetizationRails from '@/components/ads/SiteMonetizationRails';

const mockUsePathname = vi.fn();
const mockMonetizationProfile = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

vi.mock('@/hooks/useMonetizationProfile', () => ({
  useMonetizationProfile: () => mockMonetizationProfile(),
}));

beforeEach(() => {
  mockUsePathname.mockReturnValue('/en/tools/merge-pdf');
  mockMonetizationProfile.mockReturnValue({
    country: 'US',
    isUkEea: false,
    isLoading: false,
    previewMode: 'auto',
    allowNativeUnits: true,
    allowAggressiveUnits: true,
    allowHardGate: false,
  });
  window.sessionStorage.clear();
});

describe('SiteMonetizationRails', () => {
  it('renders first-party partner rails with route-aware metadata', () => {
    render(<SiteMonetizationRails />);

    const leftRail = screen.getByLabelText('Sponsored left rail');
    const rightRail = screen.getByLabelText('Sponsored right rail');

    expect(leftRail).toBeInTheDocument();
    expect(rightRail).toBeInTheDocument();
    expect(leftRail).toHaveClass('hidden', 'xl:block', 'left-4', 'top-32', 'w-56');
    expect(rightRail).toHaveClass('hidden', 'xl:block', 'right-4', 'top-32', 'w-56');
    expect(screen.getAllByRole('img', { name: /sponsored/i })).toHaveLength(3);

    const links = screen.getAllByRole('link');
    const nextStepLink = links.find((link) => link.getAttribute('href')?.startsWith('/go/next-step'));
    const uploadOfferLink = links.find((link) => link.getAttribute('href')?.startsWith('/go/upload-offer'));

    expect(nextStepLink).toBeTruthy();
    expect(uploadOfferLink).toBeTruthy();

    const nextStepUrl = new URL(nextStepLink?.getAttribute('href') ?? '', 'https://www.opentoolskit.com');
    expect(nextStepUrl.searchParams.get('tool')).toBe('merge-pdf');
    expect(nextStepUrl.searchParams.get('source')).toBe('site:en:tools:merge-pdf:rail:contextual-soft:soft-bordered');
    expect(nextStepUrl.searchParams.get('campaign')).toBe('site-left-rail');
  });

  it('does not render monetization rails when preview mode is off', () => {
    mockMonetizationProfile.mockReturnValue({
      country: 'GB',
      isUkEea: true,
      isLoading: false,
      previewMode: 'off',
      allowNativeUnits: false,
      allowAggressiveUnits: false,
      allowHardGate: false,
    });

    render(<SiteMonetizationRails />);

    expect(screen.queryByLabelText('Sponsored left rail')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Sponsored right rail')).not.toBeInTheDocument();
  });
});
