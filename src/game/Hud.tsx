"use client";

import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { IconEnter, IconHelp, IconMap, IconPin, IconTerminal } from "@/components/icons";
import { useI18n } from "@/i18n/I18nProvider";
import { LangButton, ThemeButton } from "./Controls";
import { useVisited } from "./progress";
import { COUNTED_PLACES, type PlaceId } from "./world";

interface HudProps {
  nearId: PlaceId | null;
  onSwitchLocale: () => void;
  onFastTravel: () => void;
  onHelp: () => void;
  onTerminal: () => void;
  onEnterNear: () => void;
  /** Con un pannello aperto le indicazioni in basso non servono. */
  panelOpen: boolean;
  /** Dopo il primo passo il suggerimento sparisce. */
  explored: boolean;
}

/** Barra in alto, indicazioni in basso e pulsante di ingresso: tutto ciò che sta sopra al mondo. */
export function Hud({ nearId, onSwitchLocale, onFastTravel, onHelp, onTerminal, onEnterNear, panelOpen, explored }: HudProps) {
  const { t, href } = useI18n();
  const visited = useVisited();
  const count = COUNTED_PLACES.filter((p) => visited.includes(p.id)).length;
  const total = COUNTED_PLACES.length;
  const allDone = count === total;
  const placeName = nearId ? t(`places.${nearId}.name`) : null;

  return (
    <>
      <header className="hud">
        <Link className="brand" href={href("/")} aria-label="Fabio Danubbio">
          <BrandMark variant="tile" size={34} blink />
          <span className="brand__text">
            <span className="brand__name">Fabio Danubbio</span>
            <span className="brand__handle">{t("hud.handle")}</span>
          </span>
        </Link>

        <div className="hud__where" aria-live="polite">
          <IconPin />
          <span>{placeName ? t("hud.nearPlace", { place: placeName }) : t("hud.plaza")}</span>
        </div>

        <div className="hud__tools">
          <span className={`pill${allDone ? " is-done" : ""}`} title={allDone ? t("hud.allDone") : t("hud.visited")}>
            <span className="pill__label">{t("hud.visited")}</span>
            <strong>{t("hud.visitedCount", { n: count, total })}</strong>
          </span>
          <button type="button" className="icon-btn hud-desktop" onClick={onFastTravel} aria-label={t("hud.fastTravel")} title={t("hud.fastTravel")}>
            <IconMap />
          </button>
          <button type="button" className="icon-btn hud-desktop" onClick={onTerminal} aria-label={t("hud.terminal")} title={t("hud.terminal")}>
            <IconTerminal />
          </button>
          <button type="button" className="icon-btn" onClick={onHelp} aria-label={t("hud.help")} title={t("hud.help")}>
            <IconHelp />
          </button>
          <LangButton onSwitch={onSwitchLocale} />
          <ThemeButton />
        </div>
      </header>

      <div className="hud__bottom" hidden={panelOpen}>
        {nearId ? (
          <button type="button" className="enter-btn" onClick={onEnterNear}>
            <kbd>E</kbd>
            <span>{t("hud.prompt", { place: placeName ?? "" })}</span>
            <IconEnter />
          </button>
        ) : explored ? null : (
          <p className="hint">
            <span className="hint__keys">{t("hud.hintKeys")}</span>
            <span className="hint__touch">{t("hud.hintTouch")}</span>
          </p>
        )}
      </div>
    </>
  );
}
