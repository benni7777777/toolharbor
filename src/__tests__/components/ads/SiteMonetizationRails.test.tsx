import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import SiteMonetizationRails from '@/components/ads/SiteMonetizationRails';
import { siteConfig } from '@/config/site';

const mockMonetizationProfile = vi.fn();
let restoreAdsterraConfig: (() => void) | null = null;

const enableAdsterraForTest = () => {
  const previousAdsEnabled = siteConfig.ads.enabled;
  const previousProviderEnabled = siteConfig.ads.providers.adsterra.enabled;

  Object.assign(siteConfig.ads, { enabled: true });
  Object.assign(siteConfig.ads.providers.adsterra, { enabled: true });

  restoreAdsterraConfig = () => {
    Object.assign(siteConfig.ads, { enabled: previousAdsEnabled });
    Object.assign(siteConfig.ads.providers.adsterra, { enabled: previousProviderEnabled });
  };
};

vi.mock('@/hooks/useMonetizationProfile', () => ({
  useMonetizationProfile: () => mockMonetizationProfile(),
}));

beforeEach(() => {
  restoreAdsterraConfig = null;
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
  delete window.__OTK_ADSTERRA_DISPLAY_CHAIN__;
  vi.useRealTimers();
});

afterEach(() => {
  restoreAdsterraConfig?.();
  restoreAdsterraConfig = null;
});

describe('SiteMonetizationRails', () => {
  it('renders configured Adsterra display rail slots', async () => {
    enableAdsterraForTest();
    const leftSlot = siteConfig.ads.providers.adsterra.displayBanners.leftRail;
    const rightSlot = siteConfig.ads.providers.adsterra.displayBanners.rightRail;
    const previousLeft = { ...leftSlot };
    const previousRight = { ...rightSlot };

    Object.assign(leftSlot, {
      enabled: true,
      scriptSrc: 'https://example.test/left-rail.js',
      minViewportWidth: undefined,
      maxViewportWidth: undefined,
      atOptions: {
        key: 'left-zone',
        format: 'iframe',
        width: 160,
        height: 600,
      },
    });
    Object.assign(rightSlot, {
      enabled: true,
      scriptSrc: 'https://example.test/right-rail.js',
      minViewportWidth: undefined,
      maxViewportWidth: undefined,
      atOptions: {
        key: 'right-zone',
        format: 'iframe',
        width: 160,
        height: 300,
      },
    });

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

    await act(async () => {
      await Promise.resolve();
    });

    const leftHost = document.getElementById('otk-adsterra-left-rail');
    const leftScript = leftHost?.querySelector('script[data-otk-adsterra-display="leftRail"]');

    expect(leftScript).toHaveAttribute(
      'src',
      'https://example.test/left-rail.js',
    );

    act(() => {
      leftScript?.dispatchEvent(new Event('load'));
    });

    await act(async () => {
      await Promise.resolve();
    });

    const rightHost = document.getElementById('otk-adsterra-right-rail');
    expect(rightHost?.querySelector('script[data-otk-adsterra-display="rightRail"]')).toHaveAttribute(
      'src',
      'https://example.test/right-rail.js',
    );

    Object.assign(leftSlot, previousLeft);
    Object.assign(rightSlot, previousRight);
  });

  it('does not render rail or mobile placeholders when display zones are disabled', () => {
    enableAdsterraForTest();
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

    expect(screen.queryByLabelText('Sponsored left rail')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Sponsored right rail')).not.toBeInTheDocument();
    expect(screen.queryByTestId('sponsor-preview-card')).not.toBeInTheDocument();

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

  it('collapses a rail wrapper after display no-fill', async () => {
    enableAdsterraForTest();
    vi.useFakeTimers();
    const leftSlot = siteConfig.ads.providers.adsterra.displayBanners.leftRail;
    const rightSlot = siteConfig.ads.providers.adsterra.displayBanners.rightRail;
    const previousLeft = { ...leftSlot };
    const previousRight = { ...rightSlot };

    Object.assign(leftSlot, {
      enabled: true,
      scriptSrc: 'https://example.test/left-empty.js',
      minViewportWidth: undefined,
      maxViewportWidth: undefined,
      atOptions: {
        key: 'left-empty',
        format: 'iframe',
        width: 160,
        height: 600,
      },
    });
    Object.assign(rightSlot, { enabled: false, scriptSrc: '' });

    render(<SiteMonetizationRails />);

    expect(screen.getByLabelText('Sponsored left rail')).toBeInTheDocument();

    await act(async () => {
      await Promise.resolve();
      vi.advanceTimersByTime(5000);
      await Promise.resolve();
      vi.advanceTimersByTime(5000);
    });

    expect(screen.queryByLabelText('Sponsored left rail')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Desktop left rail')).not.toBeInTheDocument();

    Object.assign(leftSlot, previousLeft);
    Object.assign(rightSlot, previousRight);
    vi.useRealTimers();
  });
});
