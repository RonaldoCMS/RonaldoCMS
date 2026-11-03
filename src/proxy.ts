import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

/** Sceglie la lingua dall'intestazione Accept-Language: italiano, inglese, altrimenti inglese. */
function pickLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale; // crawler e client senza preferenze
  for (const part of header.split(",")) {
    const tag = part.split(";")[0].trim().toLowerCase().slice(0, 2);
    if (isLocale(tag)) return tag;
  }
  return "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isLocale(pathname.split("/")[1])) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Salta file statici (con estensione), risorse interne, route handler e icone generate (senza estensione).
  matcher: ["/((?!_next|api|apple-icon|icon|opengraph-image|twitter-image|.*\\..*).*)"],
};
