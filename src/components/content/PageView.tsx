import type { Block, PageContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { CardView } from "./CardView";
import { ContactForm } from "./ContactForm";
import { ProjectsBrowser } from "./ProjectsBrowser";
import { RichText } from "./RichText";

function BlockView({ block, locale }: { block: Block; locale: Locale }) {
  switch (block.type) {
    case "heading":
      return <h2 className="doc__h2">{block.text}</h2>;
    case "p":
      return (
        <p className="doc__p">
          <RichText text={block.text} locale={locale} />
        </p>
      );
    case "quote":
      return (
        <blockquote className="doc__quote">
          <RichText text={block.text} locale={locale} />
        </blockquote>
      );
    case "list":
      return (
        <ul className="doc__list">
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} locale={locale} />
            </li>
          ))}
        </ul>
      );
    case "tags":
      return (
        <ul className="chips chips--block">
          {block.items.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>
      );
    case "cards":
      return (
        <div className="cards">
          {block.items.map((card) => (
            <CardView key={card.title} card={card} locale={locale} />
          ))}
        </div>
      );
    case "projects":
      return <ProjectsBrowser items={block.items} />;
    case "links":
      return (
        <ul className="links">
          {block.items.map((link) => {
            const external = !link.href.startsWith("mailto:");
            return (
              <li key={link.href}>
                <a href={link.href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="links__label">{link.label}</span>
                  {link.meta && <span className="links__meta">{link.meta}</span>}
                  <span className="links__arrow" aria-hidden="true">
                    {external ? "↗" : "→"}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      );
    case "note":
      return (
        <p className="note">
          <RichText text={block.text} locale={locale} />
        </p>
      );
    case "contactForm":
      return <ContactForm />;
  }
}

/** Una pagina di contenuto: la stessa struttura per tutti i luoghi del mondo. */
export function PageView({ page, locale }: { page: PageContent; locale: Locale }) {
  return (
    <article className="doc">
      <header className="doc__head">
        {page.eyebrow && <p className="eyebrow">{page.eyebrow}</p>}
        <h1 className="doc__title" id="panel-title" tabIndex={-1}>
          {page.title}
        </h1>
        {page.lead && (
          <p className="doc__lead">
            <RichText text={page.lead} locale={locale} />
          </p>
        )}
      </header>
      {page.blocks.map((block, i) => (
        <BlockView key={i} block={block} locale={locale} />
      ))}
    </article>
  );
}
