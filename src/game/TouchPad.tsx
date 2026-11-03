"use client";

import type { PointerEvent, RefObject } from "react";
import { IconArrow } from "@/components/icons";
import { useI18n } from "@/i18n/I18nProvider";
import type { Keys } from "./engine/types";

const BUTTONS: { dir: keyof Keys; label: string; arrow: "up" | "down" | "left" | "right" }[] = [
  { dir: "up", label: "hud.up", arrow: "up" },
  { dir: "left", label: "hud.left", arrow: "left" },
  { dir: "right", label: "hud.right", arrow: "right" },
  { dir: "down", label: "hud.down", arrow: "down" },
];

/** Croce direzionale per i telefoni: tenere premuto per camminare. */
export function TouchPad({ input }: { input: RefObject<Keys> }) {
  const { t } = useI18n();
  const set = (dir: keyof Keys, value: boolean) => () => {
    input.current[dir] = value;
  };
  const press = (dir: keyof Keys) => (e: PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    input.current[dir] = true;
  };

  return (
    <div className="dpad" role="group" aria-label={t("hud.dpad")}>
      {BUTTONS.map(({ dir, label, arrow }) => (
        <button
          key={dir}
          type="button"
          className={`dpad__btn dpad__btn--${dir}`}
          aria-label={t(label)}
          onPointerDown={press(dir)}
          onPointerUp={set(dir, false)}
          onPointerCancel={set(dir, false)}
          onLostPointerCapture={set(dir, false)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <IconArrow dir={arrow} />
        </button>
      ))}
    </div>
  );
}
