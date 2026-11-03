import type { Rect, Vec } from "./types";

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const distance = (a: Vec, b: Vec): number => Math.hypot(a.x - b.x, a.y - b.y);

export function rectsOverlap(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

export function pointInRect(p: Vec, r: Rect): boolean {
  return p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
}

/** Rettangolo di ingombro di un personaggio con i piedi in `pos`. */
export function hitbox(pos: Vec, half: Vec): Rect {
  return { x: pos.x - half.x, y: pos.y - half.y, w: half.x * 2, h: half.y * 2 };
}

export function inflate(rect: Rect, dx: number, dy: number): Rect {
  return { x: rect.x - dx, y: rect.y - dy, w: rect.w + dx * 2, h: rect.h + dy * 2 };
}

export function rectCenter(rect: Rect): Vec {
  return { x: rect.x + rect.w / 2, y: rect.y + rect.h / 2 };
}
