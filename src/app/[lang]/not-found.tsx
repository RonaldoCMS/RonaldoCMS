"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";

/** Pagina inesistente: compare nel pannello, con il ritorno al mondo. */
export default function NotFound() {
  const { t, href } = useI18n();
  return (
    <article className="doc">
      <header className="doc__head">
        <p className="eyebrow">404</p>
        <h1 className="doc__title" id="panel-title" tabIndex={-1}>
          {t("notFound.title")}
        </h1>
        <p className="doc__lead">{t("notFound.text")}</p>
      </header>
      <p className="doc__p">
        <Link className="btn btn--primary" href={href("/")}>
          {t("notFound.back")}
        </Link>
      </p>
    </article>
  );
}
