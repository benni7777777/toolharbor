import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AdsterraDisplayBanner from '@/components/ads/AdsterraDisplayBanner';
import { siteConfig } from '@/config/site';

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

beforeEach(() => {
  delete window.__OTK_MONETIZATION_DEBUG__;
  delete window.__OTK_ADSTERRA_DISPLAY_CHAIN__;
  restoreAdsterraConfig = null;
  vi.useRealTimers();
});

afterEach(() => {
  restoreAdsterraConfig?.();
  restoreAdsterraConfig = null;
});

describe('AdsterraDisplayBanner', () => {
  it('does not render when a real display zone is not configured', () => {
    enableAdsterraForTest();
    const slot = siteConfig.ads.providers.adsterra.displayBanners.leftRail;
    const previous = { ...slot };
    Object.assign(slot, { enabled: false, scriptSrc: '' });

    render(<AdsterraDisplayBanner slot="leftRail" />);

    expect(screen.queryByLabelText('Desktop left rail')).not.toBeInTheDocument();

    Object.assign(slot, previous);
  });

  it('injects standard display banner options and script inside the slot host', async () => {
    enableAdsterraForTest();
    const slot = siteConfig.ads.providers.adsterra.displayBanners.leftRail;
    const previous = { ...slot };

    Object.assign(slot, {
      enabled: true,
      scriptSrc: 'https://example.test/display.js',
      minViewportWidth: undefined,
      maxViewportWidth: undefined,
      atOptions: {
        key: 'test-zone',
        format: 'iframe',
        width: 160,
        height: 600,
      },
    });

    render(<AdsterraDisplayBanner slot="leftRail" />);

    await act(async () => {
      await Promise.resolve();
    });

    const host = document.getElementById(previous.containerId);
    const script = host?.querySelector('script[data-otk-adsterra-display="leftRail"]');
    const inlineOptions = host?.querySelector('script:not([src])');

    expect(screen.getByLabelText(previous.label)).toBeInTheDocument();
    expect(host).toBeTruthy();
    expect(host).toHaveStyle({ width: '160px', height: '600px', overflow: 'visible' });
    expect(inlineOptions?.textContent).toContain('test-zone');
    expect(script).toHaveAttribute('src', 'https://example.test/display.js');
    expect((script as HTMLScriptElement | undefined)?.async).toBe(true);
    expect(window.__OTK_MONETIZATION_DEBUG__?.events.some(
      event => event.monetizationEvent === 'ad_slot_mount'
        && event.placement === 'leftRail',
    )).toBe(true);
    expect(window.__OTK_MONETIZATION_DEBUG__?.events.some(
      event => event.monetizationEvent === 'ad_script_injected'
        && event.placement === 'leftRail',
    )).toBe(true);

    Object.assign(slot, previous);
  });

  it('collapses the display slot when it stays empty after timeout', async () => {
    enableAdsterraForTest();
    vi.useFakeTimers();
    const slot = siteConfig.ads.providers.adsterra.displayBanners.rightRail;
    const previous = { ...slot };

    Object.assign(slot, {
      enabled: true,
      scriptSrc: 'https://example.test/right-rail.js',
      minViewportWidth: undefined,
      maxViewportWidth: undefined,
      atOptions: {
        key: 'right-rail-zone',
        format: 'iframe',
        width: 160,
        height: 300,
      },
    });

    render(<AdsterraDisplayBanner slot="rightRail" />);

    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.queryByLabelText(previous.label)).not.toBeInTheDocument();
    expect(screen.queryByTestId('adsterra-display-fallback')).not.toBeInTheDocument();
    expect(document.getElementById(previous.containerId)).toBeNull();
    expect(window.__OTK_MONETIZATION_DEBUG__?.events.some(
      event => event.monetizationEvent === 'ad_render_failed'
        && event.placement === 'rightRail'
        && (event.metadata as { containerId?: string } | undefined)?.containerId === previous.containerId,
    )).toBe(true);
    expect(window.__OTK_MONETIZATION_DEBUG__?.events.some(
      event => event.monetizationEvent === 'network_ad_failed'
        && event.placement === 'rightRail',
    )).toBe(true);
    expect(window.__OTK_MONETIZATION_DEBUG__?.events.some(
      event => event.monetizationEvent === 'fallback_shown'
        && event.placement === 'rightRail'
        && (event.metadata as { surface?: string } | undefined)?.surface === 'fallback',
    )).toBe(true);
    expect(window.__OTK_MONETIZATION_DEBUG__?.events.some(
      event => event.monetizationEvent === 'fallback_shown'
        && event.placement === 'rightRail'
        && (event.metadata as { collapsed?: boolean } | undefined)?.collapsed === true,
    )).toBe(true);

    Object.assign(slot, previous);
    vi.useRealTimers();
  });

  it('does not show fallback when a creative appears before the timeout', async () => {
    enableAdsterraForTest();
    vi.useFakeTimers();
    const slot = siteConfig.ads.providers.adsterra.displayBanners.leftRail;
    const previous = { ...slot };

    Object.assign(slot, {
      enabled: true,
      scriptSrc: 'https://example.test/left-rail.js',
      minViewportWidth: undefined,
      maxViewportWidth: undefined,
      atOptions: {
        key: 'left-rail-zone',
        format: 'iframe',
        width: 160,
        height: 600,
      },
    });

    render(<AdsterraDisplayBanner slot="leftRail" />);

    await act(async () => {
      await Promise.resolve();
    });

    const host = document.getElementById(siteConfig.ads.providers.adsterra.displayBanners.leftRail.containerId);
    const creative = document.createElement('iframe');
    host?.appendChild(creative);

    await act(async () => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.queryByTestId('adsterra-display-fallback')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Desktop left rail')).toHaveAttribute('data-otk-ad-status', 'rendered');
    expect(window.__OTK_MONETIZATION_DEBUG__?.events.some(
      event => event.monetizationEvent === 'network_ad_rendered'
        && event.placement === 'leftRail',
    )).toBe(true);

    Object.assign(slot, previous);
    vi.useRealTimers();
  });

  it('supports the optional 468x60 display slot through the same env-backed loader', async () => {
    enableAdsterraForTest();
    const slot = siteConfig.ads.providers.adsterra.displayBanners.banner468x60;
    const previous = { ...slot };

    Object.assign(slot, {
      enabled: true,
      scriptSrc: 'https://example.test/468x60.js',
      minViewportWidth: undefined,
      maxViewportWidth: undefined,
      atOptions: {
        key: 'tablet-strip-zone',
        format: 'iframe',
        width: 468,
        height: 60,
      },
    });

    render(<AdsterraDisplayBanner slot="banner468x60" />);

    await act(async () => {
      await Promise.resolve();
    });

    const host = document.getElementById(previous.containerId);
    const script = host?.querySelector('script[data-otk-adsterra-display="banner468x60"]');

    expect(screen.getByLabelText(previous.label)).toHaveStyle({ width: '468px', minHeight: '60px' });
    expect(host).toHaveStyle({ width: '468px', height: '60px' });
    expect(script).toHaveAttribute('src', 'https://example.test/468x60.js');

    Object.assign(slot, previous);
  });
});
