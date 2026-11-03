import { distance, pointInRect } from "./geometry";
import type { Rect, Vec } from "./types";

export interface Interactive {
  id: string;
  /** Zona davanti alla porta in cui si può entrare. */
  zone: Rect;
  /** Punto della porta, usato per scegliere il più vicino. */
  door: Vec;
}

/** Il luogo con cui si può interagire (il più vicino tra quelli la cui zona contiene i piedi). */
export function nearestInteractive<T extends Interactive>(pos: Vec, items: readonly T[]): T | null {
  let best: T | null = null;
  let bestDistance = Infinity;
  for (const item of items) {
    if (!pointInRect(pos, item.zone)) continue;
    const d = distance(pos, item.door);
    if (d < bestDistance) {
      best = item;
      bestDistance = d;
    }
  }
  return best;
}
