import { describe, expect, it } from "vitest";
import { computeCamera, worldScale } from "./camera";
import { facingFrom, inputVector, moveWithCollision, stepToward } from "./movement";
import { buildNavGrid, findGridPath, planRoute, segmentClear, smoothPath } from "./pathfinding";
import { nearestInteractive } from "./proximity";
import type { Rect } from "./types";

const half = { x: 12, y: 8 };
const world = { w: 400, h: 300 };

describe("inputVector", () => {
  it("è nullo senza tasti e opposti si annullano", () => {
    expect(inputVector({ left: false, right: false, up: false, down: false })).toEqual({ x: 0, y: 0 });
    expect(inputVector({ left: true, right: true, up: false, down: false })).toEqual({ x: 0, y: 0 });
  });

  it("normalizza le diagonali", () => {
    const v = inputVector({ left: false, right: true, up: false, down: true });
    expect(Math.hypot(v.x, v.y)).toBeCloseTo(1);
    expect(v.x).toBeGreaterThan(0);
    expect(v.y).toBeGreaterThan(0);
  });
});

describe("moveWithCollision", () => {
  const wall: Rect = { x: 200, y: 0, w: 20, h: 200 };

  it("si muove liberamente in uno spazio vuoto", () => {
    expect(moveWithCollision({ x: 50, y: 50 }, { x: 10, y: 5 }, [], world, half)).toEqual({ x: 60, y: 55 });
  });

  it("si ferma contro un muro sull'asse x", () => {
    const next = moveWithCollision({ x: 180, y: 100 }, { x: 30, y: 0 }, [wall], world, half);
    expect(next).toEqual({ x: 180, y: 100 });
  });

  it("scivola lungo il muro sull'altro asse", () => {
    const next = moveWithCollision({ x: 180, y: 100 }, { x: 30, y: 20 }, [wall], world, half);
    expect(next.x).toBe(180);
    expect(next.y).toBe(120);
  });

  it("non esce dai bordi del mondo", () => {
    expect(moveWithCollision({ x: 20, y: 20 }, { x: -50, y: -50 }, [], world, half)).toEqual({ x: half.x, y: half.y });
    expect(moveWithCollision({ x: 380, y: 290 }, { x: 50, y: 50 }, [], world, half)).toEqual({
      x: world.w - half.x,
      y: world.h - half.y,
    });
  });
});

describe("stepToward e facingFrom", () => {
  it("arriva senza superare il bersaglio", () => {
    expect(stepToward({ x: 0, y: 0 }, { x: 3, y: 4 }, 10)).toEqual({ pos: { x: 3, y: 4 }, arrived: true });
    const partial = stepToward({ x: 0, y: 0 }, { x: 30, y: 40 }, 10);
    expect(partial.arrived).toBe(false);
    expect(partial.pos.x).toBeCloseTo(6);
    expect(partial.pos.y).toBeCloseTo(8);
  });

  it("sceglie la direzione dall'asse dominante e la mantiene da fermo", () => {
    expect(facingFrom({ x: 1, y: 0.2 }, "down")).toBe("right");
    expect(facingFrom({ x: -0.1, y: -1 }, "down")).toBe("up");
    expect(facingFrom({ x: 0, y: 0 }, "left")).toBe("left");
  });
});

describe("computeCamera", () => {
  const big = { w: 2400, h: 1500 };

  it("segue il giocatore e resta dentro il mondo", () => {
    const view = { w: 1000, h: 600 };
    expect(computeCamera({ x: 1200, y: 750 }, view, big, 1)).toEqual({ x: 700, y: 450 });
    expect(computeCamera({ x: 10, y: 10 }, view, big, 1)).toEqual({ x: 0, y: 0 });
    expect(computeCamera({ x: 2390, y: 1490 }, view, big, 1)).toEqual({ x: 1400, y: 900 });
  });

  it("centra il mondo se la vista è più grande", () => {
    const cam = computeCamera({ x: 100, y: 100 }, { w: 3000, h: 2000 }, big, 1);
    expect(cam.x).toBeCloseTo(-300);
    expect(cam.y).toBeCloseTo(-250);
  });

  it("la scala resta tra i limiti", () => {
    expect(worldScale(200)).toBe(0.6);
    expect(worldScale(5000)).toBe(1);
  });
});

describe("pathfinding", () => {
  // un muro verticale con un varco in basso
  const obstacles: Rect[] = [{ x: 190, y: 0, w: 20, h: 240 }];
  const grid = buildNavGrid(obstacles, world, 20, half);

  it("la linea retta attraverso il muro non è libera", () => {
    expect(segmentClear({ x: 100, y: 100 }, { x: 300, y: 100 }, obstacles, world, half)).toBe(false);
    expect(segmentClear({ x: 100, y: 270 }, { x: 300, y: 270 }, obstacles, world, half)).toBe(true);
  });

  it("trova un percorso che aggira il muro", () => {
    const path = findGridPath(grid, { x: 100, y: 100 }, { x: 300, y: 100 });
    expect(path.length).toBeGreaterThan(2);
    // passa dal varco (y sotto il muro)
    expect(path.some((p) => p.y > 240)).toBe(true);
  });

  it("il percorso completo finisce esattamente sul bersaglio ed è percorribile", () => {
    const target = { x: 300, y: 100 };
    const route = planRoute({ grid, obstacles, world, half }, { x: 100, y: 100 }, target);
    expect(route[route.length - 1]).toEqual(target);
    let from = { x: 100, y: 100 };
    for (const p of route) {
      expect(segmentClear(from, p, obstacles, world, half)).toBe(true);
      from = p;
    }
  });

  it("restituisce un solo punto quando la linea retta è libera", () => {
    const route = planRoute({ grid, obstacles, world, half }, { x: 100, y: 100 }, { x: 150, y: 150 });
    expect(route).toEqual([{ x: 150, y: 150 }]);
  });

  it("è vuoto se il bersaglio è irraggiungibile", () => {
    const closed: Rect[] = [{ x: 190, y: 0, w: 20, h: 300 }];
    const g = buildNavGrid(closed, world, 20, half);
    expect(planRoute({ grid: g, obstacles: closed, world, half }, { x: 100, y: 100 }, { x: 300, y: 100 })).toEqual([]);
  });

  it("smoothPath toglie i punti intermedi in un corridoio libero", () => {
    const pts = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 20, y: 0 },
      { x: 30, y: 0 },
    ];
    expect(smoothPath(pts, () => true)).toEqual([pts[0], pts[3]]);
  });
});

describe("nearestInteractive", () => {
  const items = [
    { id: "a", zone: { x: 0, y: 0, w: 100, h: 100 }, door: { x: 50, y: 50 } },
    { id: "b", zone: { x: 60, y: 0, w: 100, h: 100 }, door: { x: 110, y: 50 } },
  ];

  it("restituisce null fuori da ogni zona", () => {
    expect(nearestInteractive({ x: 500, y: 500 }, items)).toBeNull();
  });

  it("sceglie il più vicino quando le zone si sovrappongono", () => {
    expect(nearestInteractive({ x: 70, y: 50 }, items)?.id).toBe("a");
    expect(nearestInteractive({ x: 100, y: 50 }, items)?.id).toBe("b");
  });
});
