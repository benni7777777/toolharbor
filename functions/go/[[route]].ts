interface Env {
  NEXT_PUBLIC_ADSENSE_REVIEW_MODE?: string;
  ADSENSE_REVIEW_MODE?: string;
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

function createPartnerClickId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function applyPartnerTemplateTokens(value: string, source: string, clickId: string) {
  return value
    .replace(/\{SOURCE_ID\}/g, source)
    .replace(/\{CLICK_ID\}/g, clickId);
}

function isAdsenseReviewMode(env: Env) {
  const raw = (env.NEXT_PUBLIC_ADSENSE_REVIEW_MODE ?? env.ADSENSE_REVIEW_MODE ?? 'true')
    .trim()
    .toLowerCase();

  return raw !== 'false' && raw !== '0' && raw !== 'no';
}

export const onRequest = async (context: PagesFunctionContext<Env>) => {
  const requestUrl = new URL(context.request.url);
  const placement = getRouteSegment(context.params.route);
  const provider = requestUrl.searchParams.get('provider') ?? 'partner';
  const fallbackUrl = context.env.SPONSOR_FALLBACK_URL ?? 'https://www.opentoolskit.com/en/contact';
  const partnerBaseUrl = context.env.PARTNER_REDIRECT_BASE_URL ?? context.env.ZEYDOO_BASE_URL;
  const partnerSource = context.env.PARTNER_REDIRECT_SOURCE ?? context.env.ZEYDOO_SOURCE ?? 'opentoolskit';
  const source = requestUrl.searchParams.get('source') ?? partnerSource;
  const clickId = requestUrl.searchParams.get('subId') ?? requestUrl.searchParams.get('clickId') ?? createPartnerClickId();
  const debugMode = requestUrl.searchParams.get('debug') === '1';
  const headers = {
    'cache-control': 'no-cache, no-store, max-age=0',
    'x-otk-partner-provider': provider,
  };

  if (provider !== 'partner' || !ALLOWED_PLACEMENTS.has(placement)) {
    return redirectTo(fallbackUrl, headers);
  }

  if (isAdsenseReviewMode(context.env)) {
    return redirectTo(fallbackUrl, {
      ...headers,
      'x-otk-partner-redirect': 'disabled-adsense-review-mode',
    });
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
    target = new URL(applyPartnerTemplateTokens(partnerBaseUrl, source, clickId));
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

  target.searchParams.set('placement', placement);
  target.searchParams.set('source', source);
  target.searchParams.set('subId', clickId);

  if (tool) {
    target.searchParams.set('tool', tool);
  }

  for (const [key, value] of target.searchParams.entries()) {
    if (value.includes('{SOURCE_ID}') || value.includes('{CLICK_ID}')) {
      target.searchParams.set(key, applyPartnerTemplateTokens(value, source, clickId));
    }
  }

  const passthroughKeys = ['campaign', 'placementMeta'];
  for (const key of passthroughKeys) {
    const value = requestUrl.searchParams.get(key);
    if (value) {
      target.searchParams.set(key, value);
    }
  }

  if (debugMode) {
    console.info('OpenToolsKit partner redirect_url', {
      placement,
      provider,
      source,
      subId: clickId,
      redirect_url: target.toString(),
    });
  }

  return redirectTo(target.toString(), {
    ...headers,
    'x-otk-partner-redirect': 'success',
  });
};
