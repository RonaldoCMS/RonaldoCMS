export type InlineToken =
  | { kind: "text"; text: string }
  | { kind: "strong"; text: string }
  | { kind: "em"; text: string }
  | { kind: "link"; text: string; href: string };

const PATTERN = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)\s]+\))/g;

/** Scompone un testo con **grassetto**, *corsivo* e [testo](indirizzo) in pezzi semplici. */
export function parseInline(source: string): InlineToken[] {
  return source
    .split(PATTERN)
    .filter((part) => part !== "")
    .map((part): InlineToken => {
      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        return { kind: "strong", text: part.slice(2, -2) };
      }
      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        return { kind: "em", text: part.slice(1, -1) };
      }
      const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
      if (link) return { kind: "link", text: link[1], href: link[2] };
      return { kind: "text", text: part };
    });
}
