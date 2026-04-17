interface Env {
  PARTNER_REDIRECT_BASE_URL?: string;
  PARTNER_REDIRECT_SOURCE?: string;
  ZEYDOO_BASE_URL?: string;
  ZEYDOO_SOURCE?: string;
  SPONSOR_FALLBACK_URL?: string;
}

interface PagesFunctionContext<TEnv> {
  request: Request;
  env: TEnv;
  params: Record<string, string | string[] | undefined>;
}

type RouteParam = string | string[] | undefined;
const ALLOWED_PLACEMENTS = new Set([
  'post-result-primary',
  'upload-offer',
  'next-step',
  'result-gate',
  'result-drawer',
]);

function getRouteSegment(route: RouteParam): string {
  if (Array.isArray(route) && route.length > 0) {
    return route.join('/');
  }

  if (typeof route === 'string' && route.length > 0) {
    return route;
  }

  return 'post-result-primary';
}

function redirectTo(location: string, headers: Record<string, string>) {
  return new Response(null, {
    status: 302,
    headers: {
      ...headers,
      location,
    },
  });
}

export const onRequest = async (context: PagesFunctionContext<Env>) => {
  const requestUrl = new URL(context.request.url);
  const placement = getRouteSegment(context.params.route);
  const provider = requestUrl.searchParams.get('provider') ?? 'partner';
  const fallbackUrl = context.env.SPONSOR_FALLBACK_URL ?? 'https://www.opentoolskit.com/en/contact';
  const partnerBaseUrl = context.env.PARTNER_REDIRECT_BASE_URL ?? context.env.ZEYDOO_BASE_URL;
  const partnerSource = context.env.PARTNER_REDIRECT_SOURCE ?? context.env.ZEYDOO_SOURCE ?? 'opentoolskit';
  const headers = {
    'cache-control': 'no-cache, no-store, max-age=0',
    'x-otk-partner-provider': provider,
  };

  if (provider !== 'partner' || !ALLOWED_PLACEMENTS.has(placement)) {
    return redirectTo(fallbackUrl, headers);
  }

  if (!partnerBaseUrl) {
    console.warn('OpenToolsKit partner redirect missing PARTNER_REDIRECT_BASE_URL/ZEYDOO_BASE_URL', {
      placement,
      provider,
    });
    return redirectTo(fallbackUrl, {
      ...headers,
      'x-otk-partner-redirect': 'fallback-missing-secret',
    });
  }

  let target: URL;
  try {
    target = new URL(partnerBaseUrl);
  } catch {
    console.warn('OpenToolsKit partner redirect has invalid base URL secret', {
      placement,
      provider,
    });
    return redirectTo(fallbackUrl, {
      ...headers,
      'x-otk-partner-redirect': 'fallback-invalid-secret',
    });
  }

  const tool = requestUrl.searchParams.get('tool');
  const source = requestUrl.searchParams.get('source') ?? partnerSource;

  target.searchParams.set('placement', placement);
  target.searchParams.set('source', source);

  if (tool) {
    target.searchParams.set('tool', tool);
  }

  const passthroughKeys = ['campaign', 'subId', 'placementMeta'];
  for (const key of passthroughKeys) {
    const value = requestUrl.searchParams.get(key);
    if (value) {
      target.searchParams.set(key, value);
    }
  }

  return redirectTo(target.toString(), {
    ...headers,
    'x-otk-partner-redirect': 'success',
  });
};
