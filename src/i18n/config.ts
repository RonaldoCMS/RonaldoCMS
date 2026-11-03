export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

export const isLocale = (value: string | undefined): value is Locale =>
  !!value && (locales as readonly string[]).includes(value);

export const otherLocale = (locale: Locale): Locale => (locale === "it" ? "en" : "it");

/** Indirizzo pubblico del sito (usato per metadati, sitemap e dati strutturati). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://danubbio.it").replace(/\/$/, "");

/** Locale Open Graph per ogni lingua. */
export const ogLocale: Record<Locale, string> = { it: "it_IT", en: "en_GB" };
