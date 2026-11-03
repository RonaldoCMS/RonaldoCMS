import { clamp } from "./geometry";
import type { Size, Vec } from "./types";

/**
 * Angolo in alto a sinistra della vista, in unità del mondo.
 * Segue il giocatore senza uscire dal mondo; se il mondo è più piccolo della vista, lo centra.
 */
export function computeCamera(player: Vec, view: Size, world: Size, scale: number): Vec {
  const visibleW = view.w / scale;
  const visibleH = view.h / scale;
  const axis = (p: number, visible: number, total: number) =>
    visible >= total ? (total - visible) / 2 : clamp(p - visible / 2, 0, total - visible);
  return { x: axis(player.x, visibleW, world.w), y: axis(player.y, visibleH, world.h) };
}

/** Scala del mondo in base alla larghezza della finestra: stesso campo visivo su schermi diversi. */
export function worldScale(viewWidth: number): number {
  return clamp(viewWidth / 1200, 0.5, 1);
}
