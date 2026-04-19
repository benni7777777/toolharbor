import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import SiteMonetizationRails from '@/components/ads/SiteMonetizationRails';
import { siteConfig } from '@/config/site';

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
  vi.useRealTimers();
});

describe('SiteMonetizationRails', () => {
  it('renders real Adsterra display rail slots by default', async () => {
    render(<SiteMonetizationRails />);

    const leftRail = screen.getByLabelText('Sponsored left rail');
    const rightRail = screen.getByLabelText('Sponsored right rail');

    expect(leftRail).toBeInTheDocument();
    expect(rightRail).toBeInTheDocument();
    expect(leftRail).toHaveClass('hidden', 'xl:block', 'left-4', 'top-32', 'w-56');
    expect(rightRail).toHaveClass('hidden', 'xl:block', 'right-4', 'top-32', 'w-56');
    expect(leftRail.firstElementChild).toHaveClass('flex', 'justify-center');
    expect(rightRail.firstElementChild).toHaveClass('flex', 'justify-center');
    expect(await screen.findByLabelText('Desktop left rail')).toBeInTheDocument();
    expect(await screen.findByLabelText('Desktop right rail')).toBeInTheDocument();

    const leftHost = document.getElementById('otk-adsterra-left-rail');
    const rightHost = document.getElementById('otk-adsterra-right-rail');

    expect(leftHost?.querySelector('script[data-otk-adsterra-display="leftRail"]')).toHaveAttribute(
      'src',
      'https://www.highperformanceformat.com/9cb17ec1b627d26e665f83d3ae29a07f/invoke.js',
    );
    expect(rightHost?.querySelector('script[data-otk-adsterra-display="rightRail"]')).toHaveAttribute(
      'src',
      'https://www.highperformanceformat.com/b4bc15ab1d393108db92811da1b2e52a/invoke.js',
    );
  });

  it('falls back to first-party partner rails with route-aware metadata when display zones are disabled', () => {
    const leftSlot = siteConfig.ads.providers.adsterra.displayBanners.leftRail;
    const rightSlot = siteConfig.ads.providers.adsterra.displayBanners.rightRail;
    const mobileSlot = siteConfig.ads.providers.adsterra.displayBanners.mobileSticky;
    const previousLeft = { ...leftSlot };
    const previousRight = { ...rightSlot };
    const previousMobile = { ...mobileSlot };

    Object.assign(leftSlot, { enabled: false, scriptSrc: '' });
    Object.assign(rightSlot, { enabled: false, scriptSrc: '' });
    Object.assign(mobileSlot, { enabled: false, scriptSrc: '' });

    render(<SiteMonetizationRails />);

    const sponsorPreviews = screen.getAllByTestId('sponsor-preview-card');
    expect(sponsorPreviews).toHaveLength(3);
    expect(sponsorPreviews.every((preview) =>
      preview.getAttribute('data-otk-monetization-surface') === 'sponsorPreview',
    )).toBe(true);
    expect(sponsorPreviews.map((preview) => preview.getAttribute('data-sponsor-theme'))).toEqual([
      'secure-sharing',
      'productivity-addon',
      'browser-speed',
    ]);

    const links = screen.getAllByRole('link');
    const nextStepLink = links.find((link) => link.getAttribute('href')?.startsWith('/go/next-step'));
    const uploadOfferLink = links.find((link) => link.getAttribute('href')?.startsWith('/go/upload-offer'));

    expect(nextStepLink).toBeTruthy();
    expect(uploadOfferLink).toBeTruthy();

    const nextStepUrl = new URL(nextStepLink?.getAttribute('href') ?? '', 'https://www.opentoolskit.com');
    expect(nextStepUrl.searchParams.get('tool')).toBe('merge-pdf');
    expect(nextStepUrl.searchParams.get('source')).toBe('site:en:tools:merge-pdf:rail:contextual-soft:soft-bordered');
    expect(nextStepUrl.searchParams.get('campaign')).toBe('site-left-rail');

    Object.assign(leftSlot, previousLeft);
    Object.assign(rightSlot, previousRight);
    Object.assign(mobileSlot, previousMobile);
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

  it('uses home metadata instead of treating the locale segment as a tool', () => {
    const leftSlot = siteConfig.ads.providers.adsterra.displayBanners.leftRail;
    const rightSlot = siteConfig.ads.providers.adsterra.displayBanners.rightRail;
    const previousLeft = { ...leftSlot };
    const previousRight = { ...rightSlot };

    Object.assign(leftSlot, { enabled: false, scriptSrc: '' });
    Object.assign(rightSlot, { enabled: false, scriptSrc: '' });
    mockUsePathname.mockReturnValue('/en');

    render(<SiteMonetizationRails />);

    const links = screen.getAllByRole('link');
    const nextStepLink = links.find((link) => link.getAttribute('href')?.startsWith('/go/next-step'));
    const nextStepUrl = new URL(nextStepLink?.getAttribute('href') ?? '', 'https://www.opentoolskit.com');

    expect(nextStepUrl.searchParams.get('tool')).toBe('home');
    expect(nextStepUrl.searchParams.get('source')).toBe('site:en:rail:contextual-soft:soft-bordered');
    expect(nextStepUrl.searchParams.get('placementMeta')).toBe('home');

    Object.assign(leftSlot, previousLeft);
    Object.assign(rightSlot, previousRight);
  });
});
