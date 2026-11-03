"use client";

import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
  type Ref,
  type RefObject,
} from "react";
import { BuildingArt } from "./art/Buildings";
import { Ground } from "./art/Ground";
import { PLAYER_FEET, PLAYER_SIZE, PlayerArt } from "./art/Player";
import { FountainArt, LAMP_SIZE, LampArt, TREE_SIZE, TreeArt } from "./art/Props";
import { computeCamera, worldScale } from "./engine/camera";
import { facingFrom, inputVector, moveWithCollision, stepToward, type Facing } from "./engine/movement";
import { nearestFreePoint, planRoute } from "./engine/pathfinding";
import { nearestInteractive } from "./engine/proximity";
import type { Keys, Vec } from "./engine/types";
import {
  FOUNTAIN,
  LAMPS,
  OBSTACLES,
  PLACES,
  PLAYER_HALF,
  TREES,
  WORLD,
  isFreeAt,
  navGrid,
  placeById,
  type Place,
  type PlaceId,
} from "./world";

/** Velocità del personaggio, in unità del mondo al secondo. */
const SPEED = 290;

export interface WorldHandle {
  /** Sposta subito il personaggio (viaggio rapido, focus da tastiera). */
  teleportTo(point: Vec): void;
  /** Lo fa camminare fin lì; `onArrive` parte all'arrivo. */
  walkTo(point: Vec, onArrive?: () => void): void;
  /** Dove si trova ora il personaggio. */
  getPos(): Vec;
}

interface WorldProps {
  ref?: Ref<WorldHandle>;
  initialPos: Vec;
  /** Gioco fermo (pannello, terminale o finestre aperte). */
  paused: boolean;
  input: RefObject<Keys>;
  nearId: PlaceId | null;
  onNearChange: (id: PlaceId | null) => void;
  onEnterPlace: (place: Place) => void;
  /** Nome di ogni luogo, nella lingua corrente. */
  names: Record<PlaceId, string>;
  /** Indirizzo della pagina di un luogo (assente per la scrivania). */
  hrefFor: (place: Place) => string | undefined;
  ariaLabel: string;
  /** Larghezza coperta a destra (il pannello): il personaggio si centra nella parte visibile. */
  insetRight?: number;
  /** Chiamata una sola volta, al primo spostamento del personaggio. */
  onFirstMove?: () => void;
}

const KEYMAP: Record<string, keyof Keys> = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  ArrowDown: "down",
  a: "left",
  d: "right",
  w: "up",
  s: "down",
};

/** Quanto sopra il tetto sta l'etichetta di ogni luogo (antenne e bandiere sporgono). */
const LABEL_LIFT: Partial<Record<PlaceId, number>> = { scuola: 48, accenture: 38, lab: 18, posta: 16 };

const subscribeMotion = (listener: () => void) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
};
const reducedMotionNow = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && !!target.closest("input, textarea, select, [contenteditable='true']");
const isInteractive = (target: EventTarget | null) =>
  target instanceof HTMLElement && !!target.closest("a, button, input, textarea, select, [role='button']");

function cameraTransform(cam: Vec, scale: number): string {
  return `translate3d(${-cam.x * scale}px, ${-cam.y * scale}px, 0) scale(${scale})`;
}

export function WorldView({
  ref,
  initialPos,
  paused,
  input,
  nearId,
  onNearChange,
  onEnterPlace,
  names,
  hrefFor,
  ariaLabel,
  insetRight = 0,
  onFirstMove,
}: WorldProps) {
  const reduced = useSyncExternalStore(subscribeMotion, reducedMotionNow, () => false);

  const viewportEl = useRef<HTMLDivElement>(null);
  const worldEl = useRef<HTMLDivElement>(null);
  const groundEl = useRef<HTMLDivElement>(null);
  const playerEl = useRef<HTMLDivElement>(null);

  const pos = useRef<Vec>(initialPos);
  // Prima del calcolo con le misure reali si assume una finestra di 1280x720.
  const initialCam = computeCamera(initialPos, { w: 1280, h: 720 }, WORLD, 1);
  const cam = useRef<Vec>(initialCam);
  const view = useRef({ w: 1280, h: 720 });
  const scale = useRef(1);
  const route = useRef<{ points: Vec[]; onArrive?: () => void } | null>(null);
  const stuck = useRef(0);
  const near = useRef<PlaceId | null>(null);
  const facingRef = useRef<Facing>("down");
  const [facing, setFacing] = useState<Facing>("down");

  // Gli ultimi valori delle proprietà, letti dal ciclo senza doverlo riavviare.
  const pausedRef = useRef(paused);
  const reducedRef = useRef(reduced);
  const onNearRef = useRef(onNearChange);
  const onEnterRef = useRef(onEnterPlace);
  const insetRef = useRef(insetRight);
  const onFirstMoveRef = useRef(onFirstMove);
  const movedOnce = useRef(false);
  useEffect(() => {
    insetRef.current = insetRight;
    onFirstMoveRef.current = onFirstMove;
    pausedRef.current = paused;
    reducedRef.current = reduced;
    onNearRef.current = onNearChange;
    onEnterRef.current = onEnterPlace;
  });

  const apply = useCallback(() => {
    if (worldEl.current) worldEl.current.style.transform = cameraTransform(cam.current, scale.current);
    const el = playerEl.current;
    if (el) {
      const p = pos.current;
      el.style.transform = `translate3d(${p.x - PLAYER_FEET.x}px, ${p.y - PLAYER_FEET.y}px, 0)`;
      el.style.zIndex = String(Math.round(p.y));
    }
  }, []);

  /** Area realmente visibile: con il pannello aperto, solo se lo schermo è abbastanza largo da mostrare anche il mondo. */
  const visibleView = useCallback(() => {
    const { w, h } = view.current;
    return { w: w > 900 ? Math.max(300, w - insetRef.current) : w, h };
  }, []);

  const snapCamera = useCallback(() => {
    cam.current = computeCamera(pos.current, visibleView(), WORLD, scale.current);
  }, [visibleView]);

  const teleportTo = useCallback(
    (point: Vec) => {
      pos.current = { ...point };
      route.current = null;
      snapCamera();
      apply();
    },
    [apply, snapCamera],
  );

  const walkTo = useCallback(
    (point: Vec, onArrive?: () => void) => {
      if (reducedRef.current) {
        teleportTo(point);
        onArrive?.();
        return;
      }
      const goal = isFreeAt(point) ? point : nearestFreePoint(navGrid(), point);
      if (!goal) return;
      const points = planRoute({ grid: navGrid(), obstacles: OBSTACLES, world: WORLD, half: PLAYER_HALF }, pos.current, goal);
      if (points.length === 0) return;
      route.current = { points, onArrive };
    },
    [teleportTo],
  );

  useImperativeHandle(ref, () => ({ teleportTo, walkTo, getPos: () => pos.current }), [teleportTo, walkTo]);

  // Dimensioni della vista e scala.
  useLayoutEffect(() => {
    const el = viewportEl.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      view.current = { w: rect.width, h: rect.height };
      scale.current = worldScale(rect.width);
      snapCamera();
      apply();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [apply, snapCamera]);

  // Ciclo di gioco.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const setMoving = (moving: boolean, vec?: Vec) => {
      playerEl.current?.setAttribute("data-moving", moving ? "true" : "false");
      if (moving && vec) {
        const next = facingFrom(vec, facingRef.current);
        if (next !== facingRef.current) {
          facingRef.current = next;
          setFacing(next);
        }
      }
    };

    const stepGame = (dt: number) => {
      const keys = input.current;
      const vec = inputVector(keys);
      let move: Vec = { x: 0, y: 0 };
      let arrivedCallback: (() => void) | undefined;

      if (vec.x !== 0 || vec.y !== 0) {
        route.current = null;
        move = { x: vec.x * SPEED * dt, y: vec.y * SPEED * dt };
      } else if (route.current) {
        const target = route.current.points[0];
        const step = stepToward(pos.current, target, SPEED * dt);
        move = { x: step.pos.x - pos.current.x, y: step.pos.y - pos.current.y };
        if (step.arrived) {
          route.current.points.shift();
          if (route.current.points.length === 0) {
            arrivedCallback = route.current.onArrive;
            route.current = null;
          }
        }
      }

      if (move.x !== 0 || move.y !== 0) {
        const before = pos.current;
        const after = moveWithCollision(before, move, OBSTACLES, WORLD, PLAYER_HALF);
        pos.current = after;
        const wanted = Math.hypot(move.x, move.y);
        const done = Math.hypot(after.x - before.x, after.y - before.y);
        if (route.current && done < wanted * 0.2) {
          stuck.current += dt;
          if (stuck.current > 0.35) {
            route.current = null;
            stuck.current = 0;
          }
        } else {
          stuck.current = 0;
        }
        setMoving(true, move);
        if (!movedOnce.current) {
          movedOnce.current = true;
          onFirstMoveRef.current?.();
        }
      } else {
        setMoving(false);
      }

      arrivedCallback?.();
    };

    /** Il luogo davanti al quale ci si trova: si aggiorna anche a gioco fermo (per esempio con un pannello aperto). */
    const updateNear = () => {
      const id = (nearestInteractive(pos.current, PLACES)?.id as PlaceId | undefined) ?? null;
      if (id !== near.current) {
        near.current = id;
        onNearRef.current(id);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!pausedRef.current) stepGame(dt);
      updateNear();

      const target = computeCamera(pos.current, visibleView(), WORLD, scale.current);
      const k = reducedRef.current ? 1 : 1 - Math.exp(-9 * dt);
      const c = cam.current;
      const nx = c.x + (target.x - c.x) * k;
      const ny = c.y + (target.y - c.y) * k;
      cam.current = Math.abs(target.x - nx) < 0.25 && Math.abs(target.y - ny) < 0.25 ? target : { x: nx, y: ny };
      apply();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [apply, input, visibleView]);

  // Tastiera.
  useEffect(() => {
    const reset = () => {
      input.current.left = input.current.right = input.current.up = input.current.down = false;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || isTyping(e.target)) return;
      const dir = KEYMAP[e.key.length === 1 ? e.key.toLowerCase() : e.key];
      if (dir) {
        if (pausedRef.current) return;
        input.current[dir] = true;
        e.preventDefault();
        return;
      }
      const wantsEnter = e.key === "e" || e.key === "E" || e.key === "Enter" || e.key === " ";
      if (wantsEnter && !pausedRef.current && !isInteractive(e.target) && near.current) {
        const place = placeById(near.current);
        if (place) {
          e.preventDefault();
          onEnterRef.current(place);
        }
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const dir = KEYMAP[e.key.length === 1 ? e.key.toLowerCase() : e.key];
      if (dir) input.current[dir] = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", reset);
    };
  }, [input]);

  // Tocco o clic sul terreno: il personaggio ci cammina.
  const onGroundPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (pausedRef.current || e.button !== 0) return;
    const rect = groundEl.current?.getBoundingClientRect();
    if (!rect) return;
    const s = scale.current;
    walkTo({ x: (e.clientX - rect.left) / s, y: (e.clientY - rect.top) / s });
  };

  const onHotspotClick = (place: Place) => (e: MouseEvent<HTMLElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (near.current === place.id) {
      onEnterRef.current(place);
      return;
    }
    walkTo(place.door, () => onEnterRef.current(place));
  };

  // Con la tastiera, mettere a fuoco un luogo porta il personaggio davanti alla sua porta.
  const onHotspotFocus = (place: Place) => (e: FocusEvent<HTMLElement>) => {
    if (e.currentTarget.matches(":focus-visible")) teleportTo(place.door);
  };

  const initialStyle = { width: WORLD.w, height: WORLD.h, transform: cameraTransform(initialCam, 1) };

  return (
    <div className="viewport" ref={viewportEl} role="group" aria-label={ariaLabel}>
      <div className="world" ref={worldEl} style={initialStyle}>
        <div className="world__ground" ref={groundEl} onPointerDown={onGroundPointerDown}>
          <Ground nearId={nearId} />
        </div>

        {TREES.map((t, i) => (
          <div
            key={`t${i}`}
            className="entity"
            style={{ left: t.x - TREE_SIZE.w / 2, top: t.y - (TREE_SIZE.h - 4), zIndex: t.y }}
          >
            <TreeArt variant={i} />
          </div>
        ))}

        {LAMPS.map((l, i) => (
          <div
            key={`l${i}`}
            className="entity"
            style={{ left: l.x - LAMP_SIZE.w / 2, top: l.y - (LAMP_SIZE.h - 4), zIndex: l.y }}
          >
            <LampArt />
          </div>
        ))}

        <div className="entity" style={{ left: FOUNTAIN.x, top: FOUNTAIN.y, zIndex: FOUNTAIN.y + FOUNTAIN.h }}>
          <FountainArt />
        </div>

        {PLACES.map((p) => (
          <div
            key={p.id}
            className="entity"
            style={{ left: p.rect.x, top: p.rect.y, width: p.rect.w, height: p.rect.h, zIndex: p.rect.y + p.rect.h }}
          >
            <BuildingArt id={p.id} w={p.rect.w} h={p.rect.h} />
          </div>
        ))}

        {PLACES.map((p) => (
          <div
            key={`label-${p.id}`}
            className={nearId === p.id ? "place-label is-near" : "place-label"}
            style={{ left: p.rect.x + p.rect.w / 2, top: p.rect.y - (LABEL_LIFT[p.id] ?? 10) }}
            aria-hidden="true"
          >
            {names[p.id]}
          </div>
        ))}

        <div
          className="player"
          ref={playerEl}
          data-moving="false"
          style={{
            width: PLAYER_SIZE.w,
            height: PLAYER_SIZE.h,
            transform: `translate3d(${initialPos.x - PLAYER_FEET.x}px, ${initialPos.y - PLAYER_FEET.y}px, 0)`,
            zIndex: Math.round(initialPos.y),
          }}
        >
          <PlayerArt facing={facing} />
        </div>

        {PLACES.map((p) => {
          const href = hrefFor(p);
          const common = {
            className: "hotspot",
            style: { left: p.rect.x, top: p.rect.y, width: p.rect.w, height: p.rect.h },
            "aria-label": names[p.id],
            onClick: onHotspotClick(p),
            onFocus: onHotspotFocus(p),
          };
          return href ? (
            <a key={`h-${p.id}`} href={href} {...common} />
          ) : (
            <button key={`h-${p.id}`} type="button" {...common} />
          );
        })}
      </div>
      <div className="world__tint" aria-hidden="true" />
    </div>
  );
}
