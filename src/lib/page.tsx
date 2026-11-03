import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageView } from "@/components/content/PageView";
import { getContent, type PageKey } from "@/content";
import { isLocale } from "@/i18n/config";
import { buildMetadata } from "./metadata";

type Params = { params: Promise<{ lang: string }> };

/** `generateMetadata` di una pagina di contenuto. */
export function pageMetadata(key: PageKey, path: string) {
  return async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { lang } = await params;
    if (!isLocale(lang)) return {};
    const page = getContent(lang)[key];
    return buildMetadata(lang, path, page.metaTitle, page.description);
  };
}

/** La pagina di un luogo del mondo: la stessa struttura per tutti, i testi vengono dai contenuti. */
export function renderPage(key: PageKey) {
  return async function Page({ params }: Params) {
    const { lang } = await params;
    if (!isLocale(lang)) notFound();
    return <PageView page={getContent(lang)[key]} locale={lang} />;
  };
}
