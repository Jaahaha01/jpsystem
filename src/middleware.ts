import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Negotiator from "negotiator";
import { locales, defaultLocale } from "./i18n/config";

function getLocale(request: NextRequest): string {
  // 1. Check if user already has a saved locale preference
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Check browser language
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  // 3. Exception for Japanese users: If 'ja' is the top matched language among our supported ones
  // We check if 'ja' is the most preferred language
  const isJapanese = languages.some(lang => lang.startsWith('ja'));
  
  // If they have Japanese in their accept-language, we can route them to JA
  // But strictly speaking, if they prefer Japanese over English.
  // A simple check: if 'ja' is in their preferred languages, show 'ja'.
  // Otherwise default to 'en'.
  if (isJapanese) {
    return "ja";
  }

  // 4. Everyone else (including Thai users) gets EN
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Security Headers
  const requestHeaders = new Headers(request.headers);
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  
  // Create response to allow adding headers
  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Basic security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  );

  // Check if pathname starts with a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale (e.g. going to "/" or "/contact")
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // Create a redirect response
    const redirectUrl = new URL(
      `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
      request.url
    );
    redirectUrl.search = request.nextUrl.search; // Preserve query params
    
    return NextResponse.redirect(redirectUrl);
  }

  // If path has a valid locale, update the user's cookie to remember it
  const currentLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (currentLocale) {
    // Setting maxAge to 1 year
    response.cookies.set("NEXT_LOCALE", currentLocale, { path: "/", maxAge: 31536000 });
  }

  return response;
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, `/studio/`, and static files (e.g., images)
  matcher: [
    "/((?!api|_next/static|_next/image|studio|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
