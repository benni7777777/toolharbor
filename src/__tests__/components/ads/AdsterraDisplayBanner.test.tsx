import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AdsterraDisplayBanner from '@/components/ads/AdsterraDisplayBanner';
import { siteConfig } from '@/config/site';

beforeEach(() => {
  delete window.__OTK_MONETIZATION_DEBUG__;
  vi.useRealTimers();
});

describe('AdsterraDisplayBanner', () => {
  it('does not render when a real display zone is not configured', () => {
    const slot = siteConfig.ads.providers.adsterra.displayBanners.leftRail;
    const previous = { ...slot };
    Object.assign(slot, { enabled: false, scriptSrc: '' });

    render(<AdsterraDisplayBanner slot="leftRail" />);

    expect(screen.queryByLabelText('Desktop left rail')).not.toBeInTheDocument();

    Object.assign(slot, previous);
  });

  it('injects standard display banner options and script inside the slot host', () => {
    const slot = siteConfig.ads.providers.adsterra.displayBanners.leftRail;
    const previous = { ...slot };

    Object.assign(slot, {
      enabled: true,
      scriptSrc: 'https://example.test/display.js',
      atOptions: {
      key: 'test-zone',
      format: 'iframe',
      width: 160,
      height: 600,
      },
    });

    render(<AdsterraDisplayBanner slot="leftRail" />);

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

  it('shows a same-size network fallback when the display slot stays empty after timeout', async () => {
    vi.useFakeTimers();
    const slot = siteConfig.ads.providers.adsterra.displayBanners.rightRail;
    const previous = { ...slot };

    Object.assign(slot, {
      enabled: true,
      scriptSrc: 'https://example.test/right-rail.js',
      atOptions: {
        key: 'right-rail-zone',
        format: 'iframe',
        width: 160,
        height: 300,
      },
    });

    render(<AdsterraDisplayBanner slot="rightRail" />);

    await act(async () => {
      vi.advanceTimersByTime(5000);
    });

    const fallback = screen.getByTestId('adsterra-display-fallback');
    const host = document.getElementById(previous.containerId);

    expect(screen.getByLabelText(previous.label)).toHaveAttribute('data-otk-ad-status', 'failed');
    expect(fallback).toHaveStyle({ width: '160px', height: '300px' });
    expect(fallback).toHaveAttribute('data-otk-ad-fallback-slot', 'rightRail');
    expect(fallback).toHaveAttribute('data-otk-monetization-surface', 'fallback');
    expect(fallback.querySelector('a')).toBeNull();
    expect(host?.querySelector('script[data-otk-adsterra-display="rightRail"]')).toBeTruthy();
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

    Object.assign(slot, previous);
    vi.useRealTimers();
  });

  it('does not show fallback when a creative appears before the timeout', async () => {
    vi.useFakeTimers();

    render(<AdsterraDisplayBanner slot="leftRail" />);

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

    vi.useRealTimers();
  });
});
