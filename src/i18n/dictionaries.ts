import type { Locale } from "./config";

const loaders = {
  it: () => import("@/messages/it.json").then((m) => m.default),
  en: () => import("@/messages/en.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof loaders)["it"]>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
