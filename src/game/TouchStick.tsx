"use client";

import { useRef, type PointerEvent } from "react";
import type { Keys } from "./engine/types";

/** Quanto può spostarsi la manopola dal centro, in pixel. */
const TRAVEL = 40;
/** Sotto questa frazione della corsa la manopola non muove il personaggio. */
const DEAD_ZONE = 0.28;

/**
 * Joystick per i telefoni: si trascina il dito e il personaggio cammina in quella direzione,
 * anche in diagonale, senza dover staccare il dito come con quattro frecce separate.
 * È solo per il tocco: da tastiera e con gli screen reader ci sono frecce, Tab e la barra dei luoghi.
 */
export function TouchStick({ onKeys }: { onKeys: (keys: Keys) => void }) {
  const baseRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const activePointer = useRef<number | null>(null);

  const apply = (dx: number, dy: number) => {
    const len = Math.hypot(dx, dy);
    const k = len > TRAVEL ? TRAVEL / len : 1;
    const x = dx * k;
    const y = dy * k;
    if (knobRef.current) knobRef.current.style.transform = `translate(${x}px, ${y}px)`;
    const nx = x / TRAVEL;
    const ny = y / TRAVEL;
    onKeys({ left: nx < -DEAD_ZONE, right: nx > DEAD_ZONE, up: ny < -DEAD_ZONE, down: ny > DEAD_ZONE });
  };

  const follow = (e: PointerEvent<HTMLDivElement>) => {
    const rect = baseRef.current?.getBoundingClientRect();
    if (!rect) return;
    apply(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
  };

  const release = (e: PointerEvent<HTMLDivElement>) => {
    if (activePointer.current !== e.pointerId) return;
    activePointer.current = null;
    apply(0, 0);
  };

  return (
    <div
      ref={baseRef}
      className="stick"
      aria-hidden="true"
      onPointerDown={(e) => {
        e.preventDefault();
        activePointer.current = e.pointerId;
        e.currentTarget.setPointerCapture(e.pointerId);
        follow(e);
      }}
      onPointerMove={(e) => {
        if (activePointer.current === e.pointerId) follow(e);
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onLostPointerCapture={release}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div ref={knobRef} className="stick__knob" />
    </div>
  );
}
