import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AdsterraNativeBanner from '@/components/ads/AdsterraNativeBanner';
import { resetAdsterraRuntimeForTests } from '@/lib/monetization/adsterra-runtime';
import { siteConfig } from '@/config/site';

beforeEach(() => {
  vi.useFakeTimers();
  resetAdsterraRuntimeForTests();
  delete window.__OTK_MONETIZATION_DEBUG__;
});

afterEach(() => {
  resetAdsterraRuntimeForTests();
  vi.useRealTimers();
});

describe('AdsterraNativeBanner', () => {
  it('keeps React content outside the third-party native host and falls back on no-fill', async () => {
    render(
      <AdsterraNativeBanner
        slotName="homepage-native"
        title="Native placement"
        description="Native placement test"
      />,
    );

    const host = screen.getByTestId('adsterra-native-host');
    expect(host).toBeEmptyDOMElement();
    expect(screen.getByText('Loading sponsored placement...')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(100);
    });

    const script = document.querySelector('script[data-otk-adsterra="native-banner"]');
    const container = document.getElementById(siteConfig.ads.providers.adsterra.nativeBanner.containerId);

    expect(script).toBeTruthy();
    expect(container).toBeTruthy();
    expect(host).toContainElement(script);
    expect(host).toContainElement(container);

    await act(async () => {
      script?.dispatchEvent(new Event('load'));
      vi.advanceTimersByTime(9100);
    });

    expect(screen.getByTestId('adsterra-native-fallback')).toBeInTheDocument();
    expect(host).toHaveClass('hidden');
  });
});
