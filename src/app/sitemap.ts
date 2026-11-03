import type { MetadataRoute } from "next";
import { SITE_URL, locales } from "@/i18n/config";
import { localizedPath } from "@/i18n/paths";

const PATHS = [
  "/",
  "/storia",
  "/formazione",
  "/esperienze/jotto",
  "/esperienze/accenture",
  "/esperienze/promedya",
  "/progetti",
  "/progetti/dhonko",
  "/articoli",
  "/contatti",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (locale: (typeof locales)[number], path: string) => `${SITE_URL}${localizedPath(locale, path)}`;
  return locales.flatMap((locale) =>
    PATHS.map((path) => ({
      url: url(locale, path),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: { languages: { it: url("it", path), en: url("en", path) } },
    })),
  );
}
