import { hitbox, rectsOverlap } from "./geometry";
import type { Rect, Size, Vec } from "./types";

export interface NavGrid {
  cols: number;
  rows: number;
  cell: number;
  /** 1 = non attraversabile per il personaggio. */
  blocked: Uint8Array;
}

/** Griglia di navigazione: una cella è bloccata se il personaggio, al suo centro, urterebbe un ostacolo. */
export function buildNavGrid(obstacles: readonly Rect[], world: Size, cell: number, half: Vec): NavGrid {
  const cols = Math.ceil(world.w / cell);
  const rows = Math.ceil(world.h / cell);
  const blocked = new Uint8Array(cols * rows);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const center = { x: (c + 0.5) * cell, y: (r + 0.5) * cell };
      const box = hitbox(center, half);
      const outside = box.x < 0 || box.y < 0 || box.x + box.w > world.w || box.y + box.h > world.h;
      if (outside || obstacles.some((o) => rectsOverlap(box, o))) blocked[r * cols + c] = 1;
    }
  }
  return { cols, rows, cell, blocked };
}

const cellOf = (grid: NavGrid, p: Vec) => ({
  c: Math.min(grid.cols - 1, Math.max(0, Math.floor(p.x / grid.cell))),
  r: Math.min(grid.rows - 1, Math.max(0, Math.floor(p.y / grid.cell))),
});
const centerOf = (grid: NavGrid, c: number, r: number): Vec => ({ x: (c + 0.5) * grid.cell, y: (r + 0.5) * grid.cell });
const isBlocked = (grid: NavGrid, c: number, r: number) =>
  c < 0 || r < 0 || c >= grid.cols || r >= grid.rows || grid.blocked[r * grid.cols + c] === 1;

/** Cella libera più vicina a quella data (anello crescente), oppure null. */
function nearestFree(grid: NavGrid, c: number, r: number, maxRing = 5): { c: number; r: number } | null {
  if (!isBlocked(grid, c, r)) return { c, r };
  for (let ring = 1; ring <= maxRing; ring++) {
    let best: { c: number; r: number } | null = null;
    let bestD = Infinity;
    for (let dr = -ring; dr <= ring; dr++) {
      for (let dc = -ring; dc <= ring; dc++) {
        if (Math.max(Math.abs(dc), Math.abs(dr)) !== ring) continue;
        if (isBlocked(grid, c + dc, r + dr)) continue;
        const d = dc * dc + dr * dr;
        if (d < bestD) {
          best = { c: c + dc, r: r + dr };
          bestD = d;
        }
      }
    }
    if (best) return best;
  }
  return null;
}

/** Centro della cella libera più vicina a `p` (null se non ce n'è nei dintorni). */
export function nearestFreePoint(grid: NavGrid, p: Vec): Vec | null {
  const { c, r } = cellOf(grid, p);
  const free = nearestFree(grid, c, r, 8);
  return free ? centerOf(grid, free.c, free.r) : null;
}

/** Coda di priorità minima, quanto basta per A*. */
class MinHeap {
  private items: { key: number; value: number }[] = [];
  get size() {
    return this.items.length;
  }
  push(key: number, value: number) {
    const a = this.items;
    a.push({ key, value });
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p].key <= a[i].key) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }
  pop(): number {
    const a = this.items;
    const top = a[0];
    const last = a.pop()!;
    if (a.length > 0) {
      a[0] = last;
      let i = 0;
      for (;;) {
        const l = i * 2 + 1;
        const r = l + 1;
        let m = i;
        if (l < a.length && a[l].key < a[m].key) m = l;
        if (r < a.length && a[r].key < a[m].key) m = r;
        if (m === i) break;
        [a[m], a[i]] = [a[i], a[m]];
        i = m;
      }
    }
    return top.value;
  }
}

const NEIGHBORS = [
  [1, 0, 1],
  [-1, 0, 1],
  [0, 1, 1],
  [0, -1, 1],
  [1, 1, Math.SQRT2],
  [1, -1, Math.SQRT2],
  [-1, 1, Math.SQRT2],
  [-1, -1, Math.SQRT2],
] as const;

/** A* sulla griglia: punti al centro delle celle dall'inizio alla fine, oppure [] se irraggiungibile. */
export function findGridPath(grid: NavGrid, from: Vec, to: Vec): Vec[] {
  const sc = cellOf(grid, from);
  const gc = cellOf(grid, to);
  const start = nearestFree(grid, sc.c, sc.r);
  const goal = nearestFree(grid, gc.c, gc.r);
  if (!start || !goal) return [];

  const { cols } = grid;
  const total = grid.cols * grid.rows;
  const g = new Float32Array(total).fill(Infinity);
  const parent = new Int32Array(total).fill(-1);
  const closed = new Uint8Array(total);
  const idx = (c: number, r: number) => r * cols + c;
  const h = (c: number, r: number) => {
    const dx = Math.abs(c - goal.c);
    const dy = Math.abs(r - goal.r);
    return dx + dy + (Math.SQRT2 - 2) * Math.min(dx, dy);
  };

  const open = new MinHeap();
  const s = idx(start.c, start.r);
  g[s] = 0;
  open.push(h(start.c, start.r), s);

  const goalIndex = idx(goal.c, goal.r);
  while (open.size > 0) {
    const current = open.pop();
    if (closed[current]) continue;
    closed[current] = 1;
    if (current === goalIndex) break;
    const cr = Math.floor(current / cols);
    const cc = current - cr * cols;
    for (const [dc, dr, cost] of NEIGHBORS) {
      const nc = cc + dc;
      const nr = cr + dr;
      if (isBlocked(grid, nc, nr)) continue;
      // niente scorciatoie in diagonale attraverso gli spigoli
      if (dc !== 0 && dr !== 0 && (isBlocked(grid, cc + dc, cr) || isBlocked(grid, cc, cr + dr))) continue;
      const n = idx(nc, nr);
      if (closed[n]) continue;
      const tentative = g[current] + cost;
      if (tentative < g[n]) {
        g[n] = tentative;
        parent[n] = current;
        open.push(tentative + h(nc, nr), n);
      }
    }
  }

  if (!closed[goalIndex]) return [];
  const path: Vec[] = [];
  for (let i = goalIndex; i !== -1; i = parent[i]) {
    const r = Math.floor(i / cols);
    path.push(centerOf(grid, i - r * cols, r));
  }
  return path.reverse();
}

/** True se il personaggio può percorrere il segmento a-b senza urtare nulla (campionamento a passo fisso). */
export function segmentClear(
  a: Vec,
  b: Vec,
  obstacles: readonly Rect[],
  world: Size,
  half: Vec,
  step = 8,
): boolean {
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const n = Math.max(1, Math.ceil(dist / step));
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const p = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    const box = hitbox(p, half);
    if (box.x < 0 || box.y < 0 || box.x + box.w > world.w || box.y + box.h > world.h) return false;
    if (obstacles.some((o) => rectsOverlap(box, o))) return false;
  }
  return true;
}

/** Elimina i punti intermedi inutili: da ogni punto si va direttamente al più lontano raggiungibile in linea retta. */
export function smoothPath(points: readonly Vec[], clear: (a: Vec, b: Vec) => boolean, lookahead = 40): Vec[] {
  if (points.length <= 2) return [...points];
  const out: Vec[] = [points[0]];
  let anchor = 0;
  while (anchor < points.length - 1) {
    let next = anchor + 1;
    for (let j = Math.min(points.length - 1, anchor + lookahead); j > anchor + 1; j--) {
      if (clear(points[anchor], points[j])) {
        next = j;
        break;
      }
    }
    out.push(points[next]);
    anchor = next;
  }
  return out;
}

export interface RouteContext {
  grid: NavGrid;
  obstacles: readonly Rect[];
  world: Size;
  half: Vec;
}

/** Percorso completo dal punto `from` al punto `to`: l'ultimo punto è esattamente `to`. Vuoto se non esiste. */
export function planRoute(ctx: RouteContext, from: Vec, to: Vec): Vec[] {
  const clear = (a: Vec, b: Vec) => segmentClear(a, b, ctx.obstacles, ctx.world, ctx.half);
  if (clear(from, to)) return [to];
  const raw = findGridPath(ctx.grid, from, to);
  if (raw.length === 0) return [];
  const withEnds = [from, ...raw.slice(1), to];
  return smoothPath(withEnds, clear).slice(1);
}
