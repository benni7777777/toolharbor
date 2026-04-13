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

function getRouteSegment(route: RouteParam): string {
  if (Array.isArray(route) && route.length > 0) {
    return route.join('/');
  }

  if (typeof route === 'string' && route.length > 0) {
    return route;
  }

  return 'post-result-primary';
}

export const onRequest = async (context: PagesFunctionContext<Env>) => {
  const requestUrl = new URL(context.request.url);
  const placement = getRouteSegment(context.params.route);
  const provider = requestUrl.searchParams.get('provider') ?? 'partner';
  const fallbackUrl = context.env.SPONSOR_FALLBACK_URL ?? 'https://www.opentoolskit.com/en/contact';
  const partnerBaseUrl = context.env.PARTNER_REDIRECT_BASE_URL ?? context.env.ZEYDOO_BASE_URL;
  const partnerSource = context.env.PARTNER_REDIRECT_SOURCE ?? context.env.ZEYDOO_SOURCE ?? 'opentoolskit';

  if (provider !== 'partner' || !partnerBaseUrl) {
    return Response.redirect(fallbackUrl, 302);
  }

  const target = new URL(partnerBaseUrl);
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

  return Response.redirect(target.toString(), 302);
};
