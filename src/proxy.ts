import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { locales, defaultLocale } from "./i18n/config";

function getLocale(request: NextRequest): string {
  // 1. Check if user already has a saved locale preference
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Match browser language against supported locales using proper intl matching
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    return match(languages, [...locales], defaultLocale);
  } catch {
    return defaultLocale;
  }
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname starts with a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale (e.g. going to "/" or "/contact")
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    const redirectUrl = new URL(
      `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
      request.url
    );
    redirectUrl.search = request.nextUrl.search; // Preserve query params

    return NextResponse.redirect(redirectUrl);
  }

  // If path has a valid locale, update the user's cookie to remember it
  const response = NextResponse.next();
  const currentLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (currentLocale) {
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
