import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import AdsterraDisplayBanner from '@/components/ads/AdsterraDisplayBanner';
import { siteConfig } from '@/config/site';

beforeEach(() => {
  delete window.__OTK_MONETIZATION_DEBUG__;
});

describe('AdsterraDisplayBanner', () => {
  it('does not render when a real display zone is not configured', () => {
    render(<AdsterraDisplayBanner slot="leftRail" />);

    expect(screen.queryByLabelText('Desktop left rail')).not.toBeInTheDocument();
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
    expect(inlineOptions?.textContent).toContain('test-zone');
    expect(script).toHaveAttribute('src', 'https://example.test/display.js');
    expect(window.__OTK_MONETIZATION_DEBUG__?.events.some(
      event => event.monetizationEvent === 'display_banner_mount_attempted'
        && event.placement === 'leftRail',
    )).toBe(true);

    Object.assign(slot, previous);
  });
});
