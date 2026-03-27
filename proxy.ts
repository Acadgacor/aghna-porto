import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'id'];
const defaultLocale = 'id';

function getLocale(request: NextRequest): string {
    // Cek apakah ada header accept-language
    const acceptLanguageHeader = request.headers.get('accept-language');

    if (acceptLanguageHeader) {
        // acceptLanguageHeader formatnya misal: 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
        const requestedLocales = acceptLanguageHeader
            .split(',')
            .map(lang => lang.split(';')[0].trim().substring(0, 2).toLowerCase()); // Ambil 2 karakter pertama ('id', 'en')

        for (const locale of requestedLocales) {
            if (locales.includes(locale)) {
                return locale;
            }
        }
    }

    // Kembalikan default jika tidak direkognisi
    return defaultLocale;
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Cek apakah pathname sudah memiliki salah satu locale di awal (misal: /en/about atau /id/contact)
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // Redirect jika tidak ada locale di pathname
    const locale = getLocale(request);

    // Bentuk URL baru dengan menyisipkan locale, e.g. /resume => /id/resume
    request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;

    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        /*
         * Cocokkan semua request path KECUALI yang berawalan dengan:
         * - api (API routes)
         * - _next/static (file statis dari Next.js)
         * - _next/image (file optimasi gambar Next.js)
         * - favicon.ico (favicon)
         * - Atau file-file yang memiliki ekstensi (seperti .png, .svg, .jpg, dll) 
         *   untuk memastikan public assets aman dari redirect.
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
};
