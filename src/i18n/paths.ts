import { isLocale, type Locale } from "./config";

/** "/storia" + "it" -> "/it/storia"; "/" + "it" -> "/it". */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path === "/" || path === "" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/** "/it/storia" -> { locale: "it", path: "/storia" }; "/it" -> { locale: "it", path: "/" }. */
export function splitLocale(pathname: string): { locale: Locale | null; path: string } {
  const parts = pathname.split("/");
  const first = parts[1];
  if (isLocale(first)) {
    const rest = "/" + parts.slice(2).join("/");
    return { locale: first, path: rest === "/" ? "/" : rest.replace(/\/$/, "") };
  }
  return { locale: null, path: pathname || "/" };
}
