export type Vars = Record<string, string | number>;

/** Cerca una chiave con punti ("places.casa.name") in un dizionario annidato e sostituisce {segnaposto}. */
export function translate(dict: unknown, key: string, vars?: Vars): string {
  let node: unknown = dict;
  for (const part of key.split(".")) {
    if (node && typeof node === "object" && part in (node as Record<string, unknown>)) {
      node = (node as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  if (typeof node !== "string") return key;
  if (!vars) return node;
  return node.replace(/\{(\w+)\}/g, (match, name: string) => (name in vars ? String(vars[name]) : match));
}
