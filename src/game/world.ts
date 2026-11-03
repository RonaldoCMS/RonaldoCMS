import { hitbox, rectsOverlap } from "./engine/geometry";
import { buildNavGrid, type NavGrid } from "./engine/pathfinding";
import type { Rect, Size, Vec } from "./engine/types";

/** Dimensioni del mondo in unità (1 unità = 1 px a scala 1). */
export const WORLD: Size = { w: 2400, h: 1500 };

/** Mezza ampiezza dell'ingombro dei piedi del personaggio. */
export const PLAYER_HALF: Vec = { x: 12, y: 8 };

/** Punto di partenza: la piazza, sotto la fontana. */
export const SPAWN: Vec = { x: 1200, y: 940 };

export type PlaceId =
  | "casa"
  | "scuola"
  | "jotto"
  | "accenture"
  | "promedya"
  | "lab"
  | "biblioteca"
  | "posta"
  | "scrivania";

export interface Place {
  id: PlaceId;
  /** Percorso della pagina, senza lingua. `null` = nessuna pagina (il terminale). */
  route: string | null;
  /** Edificio: disegno e ingombro. */
  rect: Rect;
  /** Punto del terreno davanti alla porta. */
  door: Vec;
  /** Zona in cui si può entrare. */
  zone: Rect;
  /** Conta per il progresso "luoghi visitati". */
  counts: boolean;
}

function place(id: PlaceId, route: string | null, rect: Rect, counts = true): Place {
  const door = { x: rect.x + rect.w / 2, y: rect.y + rect.h + 40 };
  return {
    id,
    route,
    rect,
    door,
    zone: { x: door.x - 75, y: door.y - 55, w: 150, h: 110 },
    counts,
  };
}

export const PLACES: readonly Place[] = [
  place("casa", "/storia", { x: 170, y: 980, w: 320, h: 250 }),
  place("scuola", "/formazione", { x: 170, y: 470, w: 350, h: 250 }),
  place("jotto", "/esperienze/jotto", { x: 600, y: 1010, w: 300, h: 220 }),
  place("accenture", "/esperienze/accenture", { x: 1040, y: 60, w: 320, h: 400 }),
  place("promedya", "/esperienze/promedya", { x: 1520, y: 120, w: 520, h: 270 }),
  place("lab", "/progetti", { x: 1920, y: 470, w: 340, h: 250 }),
  place("biblioteca", "/articoli", { x: 1830, y: 990, w: 360, h: 240 }),
  place("posta", "/contatti", { x: 1420, y: 1060, w: 200, h: 170 }),
  place("scrivania", null, { x: 960, y: 1090, w: 200, h: 130 }, false),
];

export const placeById = (id: string): Place | undefined => PLACES.find((p) => p.id === id);

/** Luogo la cui pagina è `path` (o una sua sottopagina, per esempio /progetti/dhonko). */
export function placeForPath(path: string): Place | undefined {
  return PLACES.find((p) => p.route && (path === p.route || path.startsWith(`${p.route}/`)));
}

export const COUNTED_PLACES = PLACES.filter((p) => p.counts);

/** Fontana al centro della piazza. */
export const FOUNTAIN: Rect = { x: 1135, y: 715, w: 130, h: 130 };

/** Alberi: la base del tronco (il punto in cui toccano terra). */
export const TREES: readonly Vec[] = [
  { x: 80, y: 250 }, { x: 110, y: 420 }, { x: 80, y: 640 }, { x: 90, y: 880 }, { x: 110, y: 1110 },
  { x: 80, y: 1340 }, { x: 250, y: 1410 }, { x: 520, y: 1400 },
  { x: 650, y: 250 }, { x: 780, y: 380 }, { x: 900, y: 200 },
  { x: 2140, y: 200 }, { x: 2300, y: 300 }, { x: 2330, y: 620 }, { x: 2330, y: 980 },
  { x: 2300, y: 1250 }, { x: 2250, y: 1420 },
  { x: 1690, y: 930 }, { x: 1560, y: 950 },
  { x: 930, y: 620 }, { x: 1470, y: 620 }, { x: 930, y: 960 }, { x: 1470, y: 960 },
  { x: 1000, y: 1420 }, { x: 1700, y: 1420 },
];

/** Lampioni: base del palo (solo decorazione, non bloccano il passaggio). */
export const LAMPS: readonly Vec[] = [
  { x: 1120, y: 570 }, { x: 1280, y: 570 }, { x: 700, y: 735 }, { x: 1700, y: 735 },
  { x: 1120, y: 1310 }, { x: 1280, y: 1310 }, { x: 520, y: 1310 }, { x: 1900, y: 1310 },
  { x: 1000, y: 800 }, { x: 1400, y: 800 },
];

/** Dimensioni dell'ingombro del tronco. */
const TRUNK = { w: 26, h: 20 };

export const OBSTACLES: readonly Rect[] = [
  ...PLACES.map((p) => p.rect),
  FOUNTAIN,
  ...TREES.map((t) => ({ x: t.x - TRUNK.w / 2, y: t.y - TRUNK.h, w: TRUNK.w, h: TRUNK.h })),
];

/** True se il personaggio, con i piedi in `p`, sta dentro il mondo e non urta nulla. */
export function isFreeAt(p: Vec): boolean {
  const box = hitbox(p, PLAYER_HALF);
  if (box.x < 0 || box.y < 0 || box.x + box.w > WORLD.w || box.y + box.h > WORLD.h) return false;
  return !OBSTACLES.some((o) => rectsOverlap(box, o));
}

let grid: NavGrid | null = null;
/** Griglia di navigazione, costruita al primo uso. */
export function navGrid(): NavGrid {
  grid ??= buildNavGrid(OBSTACLES, WORLD, 30, PLAYER_HALF);
  return grid;
}

/** Strade (solo disegno): segmenti tra punti, tracciati con un tratto spesso. */
export const ROADS: readonly (readonly Vec[])[] = [
  [{ x: 345, y: 760 }, { x: 2090, y: 760 }],
  [{ x: 1200, y: 500 }, { x: 1200, y: 1330 }],
  [{ x: 330, y: 1330 }, { x: 2010, y: 1330 }],
  [{ x: 330, y: 1270 }, { x: 330, y: 1330 }],
  [{ x: 750, y: 1270 }, { x: 750, y: 1330 }],
  [{ x: 1060, y: 1260 }, { x: 1060, y: 1330 }],
  [{ x: 1520, y: 1270 }, { x: 1520, y: 1330 }],
  [{ x: 2010, y: 1270 }, { x: 2010, y: 1330 }],
  [{ x: 1780, y: 430 }, { x: 1780, y: 760 }],
];
