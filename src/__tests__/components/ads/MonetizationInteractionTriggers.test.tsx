import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import MonetizationInteractionTriggers from '@/components/ads/MonetizationInteractionTriggers';
import { resetAdsterraRuntimeForTests } from '@/lib/monetization/adsterra-runtime';

const mockMonetizationProfile = vi.fn();

vi.mock('@/hooks/useMonetizationProfile', () => ({
  useMonetizationProfile: () => mockMonetizationProfile(),
}));

beforeEach(() => {
  resetAdsterraRuntimeForTests();
  window.localStorage.clear();
  window.sessionStorage.clear();
  delete window.__OTK_MONETIZATION_DEBUG__;
  mockMonetizationProfile.mockReturnValue({
    country: 'US',
    isUkEea: false,
    isLoading: false,
    previewMode: 'aggressive',
    allowNativeUnits: true,
    allowAggressiveUnits: true,
    allowHardGate: false,
  });
});

describe('MonetizationInteractionTriggers', () => {
  it('fires a popunder on the first trusted button click and lets cooldown block later triggers', () => {
    render(
      <>
        <MonetizationInteractionTriggers />
        <button type="button">Run tool</button>
      </>,
    );

    fireEvent.click(screen.getByRole('button', { name: /run tool/i }));
    fireEvent.click(screen.getByRole('button', { name: /run tool/i }));

    expect(document.querySelectorAll('script[data-otk-adsterra="popunder"]')).toHaveLength(1);
    expect(window.__OTK_MONETIZATION_DEBUG__?.events.some(
      event => event.monetizationEvent === 'popunder_triggered'
        && event.placement === 'first-button-click',
    )).toBe(true);
  });

  it('logs the geo policy block instead of bypassing aggressive-unit rules', () => {
    mockMonetizationProfile.mockReturnValue({
      country: 'GB',
      isUkEea: true,
      isLoading: false,
      previewMode: 'auto',
      allowNativeUnits: true,
      allowAggressiveUnits: false,
      allowHardGate: false,
    });

    render(
      <>
        <MonetizationInteractionTriggers />
        <button type="button">Run tool</button>
      </>,
    );

    fireEvent.click(screen.getByRole('button', { name: /run tool/i }));

    expect(document.querySelector('script[data-otk-adsterra="popunder"]')).toBeNull();
    expect(window.__OTK_MONETIZATION_DEBUG__?.events.some(
      event => event.monetizationEvent === 'monetization_blocked_reason'
        && event.reason === 'uk-eea-native-only'
        && event.placement === 'first-button-click',
    )).toBe(true);
  });
});
