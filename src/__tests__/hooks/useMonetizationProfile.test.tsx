import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useMonetizationProfile } from '@/hooks/useMonetizationProfile';
import { siteConfig } from '@/config/site';

function ProfileProbe() {
  const profile = useMonetizationProfile();

  return (
    <div>
      <span data-testid="preview-mode">{profile.previewMode}</span>
      <span data-testid="allow-aggressive">{String(profile.allowAggressiveUnits)}</span>
      <span data-testid="is-loading">{String(profile.isLoading)}</span>
    </div>
  );
}

beforeEach(() => {
  window.localStorage.clear();
  window.history.pushState({}, '', '/en/?otk_monetization_preview=aggressive');
  vi.stubEnv('NODE_ENV', 'production');
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ country: 'GB', isUkEea: true }),
  }));
});

afterEach(() => {
  window.localStorage.clear();
  window.history.pushState({}, '', '/');
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('useMonetizationProfile', () => {
  it('does not let the public aggressive preview override bypass UK/EEA safety in production', async () => {
    render(<ProfileProbe />);

    await waitFor(() => {
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });

    expect(screen.getByTestId('preview-mode')).toHaveTextContent('auto');
    expect(screen.getByTestId('allow-aggressive')).toHaveTextContent('false');
    expect(window.localStorage.getItem(siteConfig.monetizationRules.previewOverrideStorageKey)).toBe('auto');
  });
});
