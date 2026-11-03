import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const KEY = "fd-theme";
const EVENT = "fd-themechange";

const current = (): Theme => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");

export function setTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* ignora */
  }
  window.dispatchEvent(new Event(EVENT));
}

const subscribe = (listener: () => void) => {
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
};

/** Tema corrente (giorno o notte). Sul server è "light", poi si allinea al tema scelto. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, current, () => "light");
}
