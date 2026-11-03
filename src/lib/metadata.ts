import type { Metadata } from "next";
import { SITE_URL, locales, ogLocale, type Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/paths";

export const SITE_NAME = "Fabio Danubbio";

const urlFor = (locale: Locale, path: string) => `${SITE_URL}${localizedPath(locale, path)}`;

/** Metadati di una pagina: titolo, descrizione, indirizzo canonico, versioni nelle altre lingue e anteprime social. */
export function buildMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const url = urlFor(locale, path);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        it: urlFor("it", path),
        en: urlFor("en", path),
        "x-default": urlFor("it", path),
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Dati strutturati della persona, per i motori di ricerca. */
export function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    jobTitle: "Full Stack Developer",
    url: urlFor(locale, "/"),
    email: "mailto:fabio@danubbio.it",
    address: { "@type": "PostalAddress", addressLocality: "Nola", addressRegion: "NA", addressCountry: "IT" },
    sameAs: [
      "https://github.com/RonaldoCMS",
      "https://www.linkedin.com/in/fabio-danubbio/",
      "https://www.instagram.com/fabio.danubbio/",
    ],
  };
}
