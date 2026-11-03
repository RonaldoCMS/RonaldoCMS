import Link from "next/link";
import { parseInline } from "@/content/inline";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/paths";

/** Testo con marcatori minimi. Gli indirizzi che iniziano con "/" sono pagine del sito. */
export function RichText({ text, locale }: { text: string; locale: Locale }) {
  return (
    <>
      {parseInline(text).map((token, i) => {
        switch (token.kind) {
          case "strong":
            return <strong key={i}>{token.text}</strong>;
          case "em":
            return <em key={i}>{token.text}</em>;
          case "link":
            return token.href.startsWith("/") ? (
              <Link key={i} href={localizedPath(locale, token.href)}>
                {token.text}
              </Link>
            ) : (
              <a key={i} href={token.href} target="_blank" rel="noopener noreferrer">
                {token.text}
              </a>
            );
          default:
            return <span key={i}>{token.text}</span>;
        }
      })}
    </>
  );
}
