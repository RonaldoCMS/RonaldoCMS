import { useSyncExternalStore } from "react";

const KEY = "fd-visited";
const EMPTY: readonly string[] = [];

const listeners = new Set<() => void>();
let cache: readonly string[] | null = null;

function read(): readonly string[] {
  if (cache) return cache;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    cache = Array.isArray(raw) ? raw.filter((v): v is string => typeof v === "string") : [];
  } catch {
    cache = [];
  }
  return cache;
}

/** Segna un luogo come visitato (resta salvato nel browser). */
export function markVisited(id: string): void {
  const current = read();
  if (current.includes(id)) return;
  cache = [...current, id];
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    /* modalità privata: il progresso vale solo per questa visita */
  }
  listeners.forEach((l) => l());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** Luoghi visitati finora. Sul server è sempre vuoto, così non ci sono differenze in idratazione. */
export function useVisited(): readonly string[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
