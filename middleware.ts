import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
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
