import { describe, expect, it } from "vitest";
import { hitbox, pointInRect, rectsOverlap } from "./engine/geometry";
import { planRoute, segmentClear } from "./engine/pathfinding";
import { OBSTACLES, PLACES, PLAYER_HALF, SPAWN, WORLD, navGrid, placeForPath } from "./world";

const ctx = () => ({ grid: navGrid(), obstacles: OBSTACLES, world: WORLD, half: PLAYER_HALF });
const free = (p: { x: number; y: number }) => !OBSTACLES.some((o) => rectsOverlap(hitbox(p, PLAYER_HALF), o));

describe("mondo", () => {
  it("il punto di partenza è libero", () => {
    expect(free(SPAWN)).toBe(true);
  });

  it("le porte sono libere e dentro la propria zona", () => {
    for (const p of PLACES) {
      expect(free(p.door), `porta di ${p.id}`).toBe(true);
      expect(pointInRect(p.door, p.zone), `zona di ${p.id}`).toBe(true);
    }
  });

  it("ogni edificio sta dentro il mondo e non si sovrappone agli altri", () => {
    for (const a of PLACES) {
      expect(a.rect.x).toBeGreaterThanOrEqual(0);
      expect(a.rect.y).toBeGreaterThanOrEqual(0);
      expect(a.rect.x + a.rect.w).toBeLessThanOrEqual(WORLD.w);
      expect(a.rect.y + a.rect.h).toBeLessThanOrEqual(WORLD.h);
      for (const b of PLACES) if (a !== b) expect(rectsOverlap(a.rect, b.rect), `${a.id} / ${b.id}`).toBe(false);
    }
  });

  it("ogni porta si raggiunge dalla partenza e da ogni altra porta", () => {
    const route = (from: { x: number; y: number }, to: { x: number; y: number }) => planRoute(ctx(), from, to);
    for (const a of PLACES) {
      expect(route(SPAWN, a.door).length, `partenza -> ${a.id}`).toBeGreaterThan(0);
      for (const b of PLACES) {
        if (a === b) continue;
        const r = route(a.door, b.door);
        expect(r.length, `${a.id} -> ${b.id}`).toBeGreaterThan(0);
        let from = a.door;
        for (const p of r) {
          expect(segmentClear(from, p, OBSTACLES, WORLD, PLAYER_HALF)).toBe(true);
          from = p;
        }
      }
    }
  });

  it("i percorsi sono unici e le sottopagine appartengono al loro luogo", () => {
    const routes = PLACES.map((p) => p.route).filter(Boolean);
    expect(new Set(routes).size).toBe(routes.length);
    expect(placeForPath("/progetti/dhonko")?.id).toBe("lab");
    expect(placeForPath("/storia")?.id).toBe("casa");
    expect(placeForPath("/")).toBeUndefined();
  });
});
