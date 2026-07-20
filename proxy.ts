import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LANG, isLang } from "@/lib/i18n";

const PUBLIC_FILE = /\.[a-zA-Z0-9]{2,5}$/;

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip static assets, API routes, Next internals, and Next file-conventions.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.svg" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/llms.txt" ||
    pathname.startsWith("/metadata/") ||
    pathname === "/lucas-almeida-cv.pdf" ||
    pathname === "/lucas-portrait.jpg" ||
    pathname.startsWith("/opengraph-image") ||
    pathname.startsWith("/twitter-image") ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/apple-icon") ||
    pathname.startsWith("/manifest") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const seg = pathname.split("/")[1];

  // Already prefixed with a valid lang → continue.
  if (isLang(seg)) return NextResponse.next();

  // Otherwise, pick a lang from Accept-Language (first tag wins) and redirect.
  const accept = req.headers.get("accept-language")?.toLowerCase() ?? "";
  const primary = accept.split(",")[0]?.trim().split(";")[0]?.split("-")[0] ?? "";
  const preferred = isLang(primary) ? primary : DEFAULT_LANG;

  const url = req.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
