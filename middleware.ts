import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const host = request.headers.get('host')?.split(':')[0];
    if (host === siteConfig.apexHost) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.protocol = 'https';
        redirectUrl.host = siteConfig.canonicalHost;
        return NextResponse.redirect(redirectUrl, 301);
    }

    const response = intlMiddleware(request);

    // Keep cross-origin isolation headers out of HTML responses so third-party ad scripts can load.
    response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin');

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next|_vercel|.*\\..*).*)',
    ],
};
