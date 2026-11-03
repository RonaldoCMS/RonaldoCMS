import { describe, expect, it } from "vitest";
import it_ from "@/messages/it.json";
import en from "@/messages/en.json";
import { localizedPath, splitLocale } from "./paths";
import { translate } from "./translate";

/** Tutte le chiavi foglia di un dizionario, come "a.b.c". */
function leafKeys(node: unknown, prefix = ""): string[] {
  if (node && typeof node === "object") {
    return Object.entries(node).flatMap(([k, v]) => leafKeys(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

describe("translate", () => {
  const dict = { a: { b: "Ciao {name}, hai {n} messaggi" }, c: 1 };

  it("trova chiavi annidate e sostituisce i segnaposto", () => {
    expect(translate(dict, "a.b", { name: "Fabio", n: 3 })).toBe("Ciao Fabio, hai 3 messaggi");
  });

  it("lascia i segnaposto sconosciuti e restituisce la chiave se manca o non è testo", () => {
    expect(translate(dict, "a.b", { name: "Fabio" })).toBe("Ciao Fabio, hai {n} messaggi");
    expect(translate(dict, "x.y")).toBe("x.y");
    expect(translate(dict, "c")).toBe("c");
  });
});

describe("dizionari", () => {
  it("italiano e inglese hanno le stesse chiavi", () => {
    expect(leafKeys(en).sort()).toEqual(leafKeys(it_).sort());
  });

  it("nessuna traduzione è vuota", () => {
    for (const dict of [it_, en]) for (const key of leafKeys(dict)) expect(translate(dict, key).length).toBeGreaterThan(0);
  });
});

describe("percorsi con lingua", () => {
  it("costruisce e separa i percorsi", () => {
    expect(localizedPath("it", "/")).toBe("/it");
    expect(localizedPath("en", "/storia")).toBe("/en/storia");
    expect(splitLocale("/it")).toEqual({ locale: "it", path: "/" });
    expect(splitLocale("/en/progetti/dhonko")).toEqual({ locale: "en", path: "/progetti/dhonko" });
    expect(splitLocale("/xx/storia")).toEqual({ locale: null, path: "/xx/storia" });
  });
});
