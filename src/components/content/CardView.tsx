import Link from "next/link";
import type { Card } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/paths";
import { RichText } from "./RichText";

export function CardView({ card, locale }: { card: Card; locale: Locale }) {
  const { title, meta, text, tags, href, hrefLabel } = card;
  const external = href?.startsWith("http");
  return (
    <article className="card">
      {meta && <p className="card__meta">{meta}</p>}
      <h3 className="card__title">{title}</h3>
      <p className="card__text">
        <RichText text={text} locale={locale} />
      </p>
      {tags && tags.length > 0 && (
        <ul className="chips" aria-label="Tag">
          {tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
      )}
      {href &&
        (external ? (
          <a className="card__link" href={href} target="_blank" rel="noopener noreferrer">
            {hrefLabel ?? title} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <Link className="card__link" href={localizedPath(locale, href)}>
            {hrefLabel ?? title} <span aria-hidden="true">→</span>
          </Link>
        ))}
    </article>
  );
}
