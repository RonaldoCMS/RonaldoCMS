/**
 * Testo con marcatori minimi: **grassetto**, *corsivo*, [testo](indirizzo).
 * Gli indirizzi che iniziano con "/" sono pagine del sito e ricevono la lingua.
 */
export type Inline = string;

export type ProjectCategory = "web" | "mobile" | "backend" | "games";

export interface Card {
  title: string;
  /** Riga piccola sopra il titolo (periodo, ruolo, stato). */
  meta?: string;
  text: Inline;
  tags?: string[];
  /** Pagina interna ("/progetti/dhonko") o indirizzo esterno. */
  href?: string;
  hrefLabel?: string;
  categories?: ProjectCategory[];
}

export type Block =
  | { type: "heading"; text: string }
  | { type: "p"; text: Inline }
  | { type: "quote"; text: Inline }
  | { type: "list"; items: Inline[] }
  | { type: "tags"; items: string[] }
  | { type: "cards"; items: Card[] }
  | { type: "projects"; items: Card[] }
  | { type: "links"; items: { label: string; href: string; meta?: string }[] }
  | { type: "note"; text: Inline }
  | { type: "contactForm" };

export interface PageContent {
  /** Riga sopra il titolo, per esempio "Promedya S.r.l. · ottobre 2022 – oggi". */
  eyebrow?: string;
  title: string;
  /** Titolo della scheda del browser e delle anteprime. */
  metaTitle: string;
  /** Testo breve per i motori di ricerca e le anteprime. */
  description: string;
  lead?: Inline;
  blocks: Block[];
}

export type PageKey =
  | "storia"
  | "formazione"
  | "jotto"
  | "accenture"
  | "promedya"
  | "progetti"
  | "dhonko"
  | "articoli"
  | "contatti";

export type SiteContent = Record<PageKey, PageContent>;
