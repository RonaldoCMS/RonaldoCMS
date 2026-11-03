import { clamp, hitbox, rectsOverlap } from "./geometry";
import type { Keys, Rect, Size, Vec } from "./types";

/** Vettore di direzione normalizzato (le diagonali non sono più veloci). */
export function inputVector(keys: Keys): Vec {
  const x = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
  const y = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
  if (x === 0 && y === 0) return { x: 0, y: 0 };
  const len = Math.hypot(x, y);
  return { x: x / len, y: y / len };
}

/**
 * Sposta il personaggio di `delta` fermandosi contro ostacoli e bordi del mondo.
 * Gli assi sono risolti separatamente, così il personaggio scivola lungo i muri.
 */
export function moveWithCollision(
  pos: Vec,
  delta: Vec,
  obstacles: readonly Rect[],
  world: Size,
  half: Vec,
): Vec {
  const blockedAt = (x: number, y: number) => {
    const box = hitbox({ x, y }, half);
    return obstacles.some((o) => rectsOverlap(box, o));
  };

  let { x, y } = pos;

  const nx = clamp(x + delta.x, half.x, world.w - half.x);
  if (!blockedAt(nx, y)) x = nx;

  const ny = clamp(y + delta.y, half.y, world.h - half.y);
  if (!blockedAt(x, ny)) y = ny;

  return { x, y };
}

/** Passo verso un punto, senza superarlo. Restituisce anche se è arrivato. */
export function stepToward(pos: Vec, target: Vec, maxStep: number): { pos: Vec; arrived: boolean } {
  const dx = target.x - pos.x;
  const dy = target.y - pos.y;
  const dist = Math.hypot(dx, dy);
  if (dist <= maxStep || dist === 0) return { pos: { x: target.x, y: target.y }, arrived: true };
  return { pos: { x: pos.x + (dx / dist) * maxStep, y: pos.y + (dy / dist) * maxStep }, arrived: false };
}

export type Facing = "down" | "up" | "left" | "right";

/** Direzione verso cui guarda il personaggio, dato un vettore di movimento. */
export function facingFrom(vec: Vec, previous: Facing): Facing {
  if (vec.x === 0 && vec.y === 0) return previous;
  if (Math.abs(vec.x) > Math.abs(vec.y)) return vec.x > 0 ? "right" : "left";
  return vec.y > 0 ? "down" : "up";
}
