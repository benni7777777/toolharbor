import { describe, expect, it, vi } from 'vitest';
import { onRequest } from '../../../functions/go/[[route]]';

function createContext({
  route = 'post-result-primary',
  url = 'https://www.opentoolskit.com/go/post-result-primary?tool=merge-pdf&provider=partner&campaign=test',
  env = {},
}: {
  route?: string;
  url?: string;
  env?: Record<string, string | undefined>;
}) {
  return {
    request: new Request(url),
    env: {
      NEXT_PUBLIC_ADSENSE_REVIEW_MODE: 'false',
      SPONSOR_FALLBACK_URL: 'https://www.opentoolskit.com/en/contact',
      ...env,
    },
    params: {
      route,
    },
  };
}

describe('partner redirect function', () => {
  it('prefers PARTNER_REDIRECT_BASE_URL and preserves safe metadata', async () => {
    const response = await onRequest(createContext({
      env: {
        PARTNER_REDIRECT_BASE_URL: 'https://partner.example/smartlink?existing=1',
        ZEYDOO_BASE_URL: 'https://legacy.example/should-not-win',
        PARTNER_REDIRECT_SOURCE: 'opentoolskit',
      },
    }));

    const location = response.headers.get('location');
    expect(response.status).toBe(302);
    expect(response.headers.get('cache-control')).toContain('no-cache');
    expect(response.headers.get('x-otk-partner-redirect')).toBe('success');
    expect(location).toBeTruthy();

    const target = new URL(location ?? '');
    expect(target.origin).toBe('https://partner.example');
    expect(target.searchParams.get('existing')).toBe('1');
    expect(target.searchParams.get('placement')).toBe('post-result-primary');
    expect(target.searchParams.get('source')).toBe('opentoolskit');
    expect(target.searchParams.get('subId')).toBeTruthy();
    expect(target.searchParams.get('tool')).toBe('merge-pdf');
    expect(target.searchParams.get('campaign')).toBe('test');
  });

  it('replaces Zeydoo-style source and click placeholders before redirecting', async () => {
    const response = await onRequest(createContext({
      url: 'https://www.opentoolskit.com/go/post-result-primary?tool=merge-pdf&provider=partner&source=tool:merge-pdf:post-result-primary&subId=session-click-123',
      env: {
        PARTNER_REDIRECT_BASE_URL: 'https://partner.example/link?z=10822537&var={SOURCE_ID}&ymid={CLICK_ID}',
        PARTNER_REDIRECT_SOURCE: 'opentoolskit',
      },
    }));

    const target = new URL(response.headers.get('location') ?? '');

    expect(response.status).toBe(302);
    expect(response.headers.get('x-otk-partner-redirect')).toBe('success');
    expect(target.origin).toBe('https://partner.example');
    expect(target.searchParams.get('z')).toBe('10822537');
    expect(target.searchParams.get('var')).toBe('tool:merge-pdf:post-result-primary');
    expect(target.searchParams.get('ymid')).toBe('session-click-123');
    expect(target.searchParams.get('subId')).toBe('session-click-123');
    expect(target.searchParams.get('source')).toBe('tool:merge-pdf:post-result-primary');
  });

  it('logs the resolved redirect URL only when debug mode is requested', async () => {
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined);

    const response = await onRequest(createContext({
      url: 'https://www.opentoolskit.com/go/post-result-primary?tool=merge-pdf&provider=partner&source=debug-source&subId=debug-click&debug=1',
      env: {
        PARTNER_REDIRECT_BASE_URL: 'https://partner.example/link?var={SOURCE_ID}&ymid={CLICK_ID}',
      },
    }));

    expect(response.status).toBe(302);
    expect(infoSpy).toHaveBeenCalledWith(
      'OpenToolsKit partner redirect_url',
      expect.objectContaining({
        placement: 'post-result-primary',
        source: 'debug-source',
        subId: 'debug-click',
        redirect_url: expect.stringContaining('debug-click'),
      }),
    );

    infoSpy.mockRestore();
  });

  it('falls back safely for disallowed placements', async () => {
    const response = await onRequest(createContext({
      route: 'unknown-placement',
      url: 'https://www.opentoolskit.com/go/unknown-placement?provider=partner',
      env: {
        PARTNER_REDIRECT_BASE_URL: 'https://partner.example/smartlink',
      },
    }));

    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toBe('https://www.opentoolskit.com/en/contact');
  });

  it('falls back safely when the secret is missing', async () => {
    const response = await onRequest(createContext({ env: {} }));

    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toBe('https://www.opentoolskit.com/en/contact');
    expect(response.headers.get('x-otk-partner-redirect')).toBe('fallback-missing-secret');
  });

  it('disables partner redirects during AdSense review mode', async () => {
    const response = await onRequest(createContext({
      env: {
        NEXT_PUBLIC_ADSENSE_REVIEW_MODE: 'true',
        PARTNER_REDIRECT_BASE_URL: 'https://partner.example/smartlink',
      },
    }));

    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toBe('https://www.opentoolskit.com/en/contact');
    expect(response.headers.get('x-otk-partner-redirect')).toBe('disabled-adsense-review-mode');
  });
});
