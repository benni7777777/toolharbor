import { describe, expect, it } from 'vitest';
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
    expect(target.searchParams.get('tool')).toBe('merge-pdf');
    expect(target.searchParams.get('campaign')).toBe('test');
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
});
