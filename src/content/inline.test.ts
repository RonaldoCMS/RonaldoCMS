import { describe, expect, it } from "vitest";
import { getContent } from "./index";
import { parseInline } from "./inline";

describe("parseInline", () => {
  it("riconosce grassetto, corsivo e link", () => {
    expect(parseInline("a **b** *c* [d](/e) f")).toEqual([
      { kind: "text", text: "a " },
      { kind: "strong", text: "b" },
      { kind: "text", text: " " },
      { kind: "em", text: "c" },
      { kind: "text", text: " " },
      { kind: "link", text: "d", href: "/e" },
      { kind: "text", text: " f" },
    ]);
  });

  it("lascia intatto il testo senza marcatori", () => {
    expect(parseInline("solo testo")).toEqual([{ kind: "text", text: "solo testo" }]);
  });
});

/** Contenuti: stessa struttura in italiano e inglese e regole di prudenza concordate. */
describe("contenuti", () => {
  const it_ = getContent("it");
  const en = getContent("en");

  it("italiano e inglese hanno le stesse pagine con gli stessi tipi di blocco", () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(it_).sort());
    for (const key of Object.keys(it_) as (keyof typeof it_)[]) {
      expect(en[key].blocks.map((b) => b.type), key).toEqual(it_[key].blocks.map((b) => b.type));
    }
  });

  it("non contiene frasi o nomi vietati dalle regole di prudenza", () => {
    const forbidden = [
      /clean architecture/i,
      /mongodb/i,
      /github actions/i,
      /gitflow/i,
      /scrum/i,
      /cordova/i,
      /spoofing/i,
      /gdg/i,
      /google developer group/i,
      /mepa/i,
      /damarila/i,
      /de stefano/i,
      /webticket/i,
      /transcriber/i,
      /gmail/i,
      /\+39/,
    ];
    const text = JSON.stringify([it_, en]);
    for (const rule of forbidden) expect(text, String(rule)).not.toMatch(rule);
  });

  it("usa l'email del dominio nuovo", () => {
    expect(JSON.stringify(it_.contatti)).toContain("fabio@danubbio.it");
  });
});
