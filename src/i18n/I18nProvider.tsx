"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries";
import { localizedPath } from "./paths";
import { translate, type Vars } from "./translate";

interface I18nValue {
  locale: Locale;
  dict: Dictionary;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ locale, dict, children }: I18nValue & { children: ReactNode }) {
  const value = useMemo(() => ({ locale, dict }), [locale, dict]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n va usato dentro <I18nProvider>");
  const { locale, dict } = ctx;
  const t = useCallback((key: string, vars?: Vars) => translate(dict, key, vars), [dict]);
  const href = useCallback((path: string) => localizedPath(locale, path), [locale]);
  return { locale, t, href };
}
