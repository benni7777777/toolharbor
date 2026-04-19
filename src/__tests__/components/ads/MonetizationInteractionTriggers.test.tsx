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
  it('fires aggressive scripts on the first explicit primary CTA click and lets cooldown block later triggers', () => {
    render(
      <>
        <MonetizationInteractionTriggers />
        <button type="button" data-otk-monetization-trigger="primary-cta">Run tool</button>
      </>,
    );

    fireEvent.click(screen.getByRole('button', { name: /run tool/i }));
    fireEvent.click(screen.getByRole('button', { name: /run tool/i }));

    expect(document.querySelectorAll('script[data-otk-adsterra="popunder"]')).toHaveLength(1);
    expect(document.querySelectorAll('script[data-otk-adsterra="socialbar"]')).toHaveLength(1);
    expect(window.__OTK_MONETIZATION_DEBUG__?.events.some(
      event => event.monetizationEvent === 'popunder_triggered'
        && event.placement === 'primary-cta-click',
    )).toBe(true);
    expect(window.__OTK_MONETIZATION_DEBUG__?.events.some(
      event => event.monetizationEvent === 'socialbar_triggered'
        && event.placement === 'primary-cta-click',
    )).toBe(true);
  });

  it('does not fire aggressive scripts on an unmarked generic button click', () => {
    render(
      <>
        <MonetizationInteractionTriggers />
        <button type="button">Run tool</button>
      </>,
    );

    fireEvent.click(screen.getByRole('button', { name: /run tool/i }));

    expect(document.querySelector('script[data-otk-adsterra="popunder"]')).toBeNull();
    expect(document.querySelector('script[data-otk-adsterra="socialbar"]')).toBeNull();
  });

  it('does not consume the first-click trigger while geo policy is still loading', () => {
    mockMonetizationProfile.mockReturnValue({
      country: 'unknown',
      isUkEea: true,
      isLoading: true,
      previewMode: 'auto',
      allowNativeUnits: true,
      allowAggressiveUnits: false,
      allowHardGate: false,
    });

    const { rerender } = render(
      <>
        <MonetizationInteractionTriggers />
        <button type="button" data-otk-monetization-trigger="primary-cta">Run tool</button>
      </>,
    );

    fireEvent.click(screen.getByRole('button', { name: /run tool/i }));
    expect(document.querySelector('script[data-otk-adsterra="popunder"]')).toBeNull();

    mockMonetizationProfile.mockReturnValue({
      country: 'US',
      isUkEea: false,
      isLoading: false,
      previewMode: 'auto',
      allowNativeUnits: true,
      allowAggressiveUnits: true,
      allowHardGate: false,
    });

    rerender(
      <>
        <MonetizationInteractionTriggers />
        <button type="button" data-otk-monetization-trigger="primary-cta">Run tool</button>
      </>,
    );
    fireEvent.click(screen.getByRole('button', { name: /run tool/i }));

    expect(document.querySelectorAll('script[data-otk-adsterra="popunder"]')).toHaveLength(1);
    expect(window.__OTK_MONETIZATION_DEBUG__?.events.some(
      event => event.monetizationEvent === 'monetization_blocked_reason'
        && event.reason === 'profile-loading',
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
        <button type="button" data-otk-monetization-trigger="primary-cta">Run tool</button>
      </>,
    );

    fireEvent.click(screen.getByRole('button', { name: /run tool/i }));

    expect(document.querySelector('script[data-otk-adsterra="popunder"]')).toBeNull();
    expect(window.__OTK_MONETIZATION_DEBUG__?.events.some(
      event => event.monetizationEvent === 'monetization_blocked_reason'
        && event.reason === 'uk-eea-native-only'
        && event.placement === 'primary-cta-click',
    )).toBe(true);
  });
});
