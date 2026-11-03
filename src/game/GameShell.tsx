"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Dialog } from "@/components/Dialog";
import { IconEnter } from "@/components/icons";
import { otherLocale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { localizedPath, splitLocale } from "@/i18n/paths";
import type { Keys } from "./engine/types";
import { Hud } from "./Hud";
import { Panel } from "./Panel";
import { markVisited } from "./progress";
import { Terminal } from "./Terminal";
import { setTheme } from "./theme";
import { PlaceDock } from "./PlaceDock";
import { TouchStick } from "./TouchStick";
import { PLACES, SPAWN, placeById, placeForPath, type Place, type PlaceId } from "./world";
import { WorldView, type WorldHandle } from "./WorldView";

const HELP_SEEN_KEY = "fd-help-seen";
/** Posizione salvata per il tempo di un cambio di lingua (la pagina del mondo si ricostruisce). */
const POS_KEY = "fd-pos";

/**
 * Il sito è un mondo da esplorare. Il mondo resta montato mentre si cambia pagina:
 * la pagina del luogo (già disegnata dal server) compare in un pannello sopra di esso.
 */
export function GameShell({ children }: { children: ReactNode }) {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  const { path } = splitLocale(pathname);
  const currentPlace = placeForPath(path);
  const panelOpen = path !== "/";

  const [nearId, setNearId] = useState<PlaceId | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [fastOpen, setFastOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  /** Dopo il primo passo la scheda di benvenuto si rimpicciolisce e lascia vedere il mondo. */
  const [explored, setExplored] = useState(false);
  // Con un collegamento diretto a un luogo si parte davanti alla sua porta.
  const [initialPos] = useState(() => currentPlace?.door ?? SPAWN);

  const worldRef = useRef<WorldHandle>(null);
  const input = useRef<Keys>({ left: false, right: false, up: false, down: false });
  const nearRef = useRef<PlaceId | null>(null);
  /** Il joystick scrive qui i tasti "premuti", come farebbe la tastiera. */
  const setKeys = useCallback((keys: Keys) => {
    Object.assign(input.current, keys);
  }, []);

  const names = Object.fromEntries(PLACES.map((p) => [p.id, t(`places.${p.id}.name`)])) as Record<PlaceId, string>;

  const goToPage = useCallback((route: string) => router.push(localizedPath(locale, route)), [router, locale]);

  /** Entrare in un luogo: la sua pagina, oppure il terminale per la scrivania. */
  const enterPlace = useCallback(
    (place: Place) => {
      setExplored(true);
      if (place.route) goToPage(place.route);
      else setTerminalOpen(true);
    },
    [goToPage],
  );

  const closePanel = useCallback(() => goToPage("/"), [goToPage]);

  const travelTo = useCallback(
    (place: Place) => {
      setFastOpen(false);
      worldRef.current?.teleportTo(place.door);
      enterPlace(place);
    },
    [enterPlace],
  );

  const switchLocale = useCallback(() => {
    try {
      const pos = worldRef.current?.getPos();
      if (pos) sessionStorage.setItem(POS_KEY, JSON.stringify(pos));
    } catch {
      /* ignora */
    }
    router.push(localizedPath(otherLocale(locale), path));
  }, [router, locale, path]);

  const handleNearChange = useCallback((id: PlaceId | null) => {
    nearRef.current = id;
    setNearId(id);
  }, []);

  // Dopo un cambio di lingua il mondo si ricostruisce: si torna dove si era.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(POS_KEY);
      if (!raw) return;
      sessionStorage.removeItem(POS_KEY);
      const pos = JSON.parse(raw) as { x?: unknown; y?: unknown };
      if (typeof pos.x === "number" && typeof pos.y === "number") worldRef.current?.teleportTo({ x: pos.x, y: pos.y });
    } catch {
      /* ignora */
    }
  }, []);

  // La pagina di un luogo è aperta: lo si segna come visitato e il personaggio sta davanti alla porta.
  const placeId = currentPlace?.id;
  useEffect(() => {
    if (!placeId) return;
    const place = placeById(placeId);
    if (!place) return;
    if (place.counts) markVisited(place.id);
    if (nearRef.current !== place.id) worldRef.current?.teleportTo(place.door);
  }, [placeId]);

  // Il tasto ` apre e chiude il terminale.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "`" || e.ctrlKey || e.metaKey || e.altKey) return;
      const el = document.activeElement;
      const typing = el instanceof HTMLElement && (el.matches("input, textarea, select") || el.isContentEditable);
      if (typing && !el.closest(".terminal")) return;
      e.preventDefault();
      setTerminalOpen((open) => !open);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Alla prima visita si mostra una volta come si gioca.
  useEffect(() => {
    if (path !== "/") return;
    let seen = false;
    try {
      seen = localStorage.getItem(HELP_SEEN_KEY) === "1";
    } catch {
      seen = true;
    }
    if (seen) return;
    const timer = window.setTimeout(() => setHelpOpen(true), 900);
    return () => window.clearTimeout(timer);
    // solo al primo caricamento
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeHelp = useCallback(() => {
    setHelpOpen(false);
    try {
      localStorage.setItem(HELP_SEEN_KEY, "1");
    } catch {
      /* ignora */
    }
  }, []);

  const paused = panelOpen || terminalOpen || helpOpen || fastOpen;
  const nearPlace = nearId ? placeById(nearId) : undefined;

  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        {t("ui.skip")}
      </a>

      <div className="shell__world" inert={panelOpen}>
        <WorldView
          ref={worldRef}
          initialPos={initialPos}
          paused={paused}
          input={input}
          nearId={nearId}
          onNearChange={handleNearChange}
          onEnterPlace={enterPlace}
          names={names}
          hrefFor={(p) => (p.route ? localizedPath(locale, p.route) : undefined)}
          ariaLabel={t("ui.worldLabel")}
          insetRight={panelOpen ? 640 : 0}
          onFirstMove={() => setExplored(true)}
        />
      </div>

      <div className="shell__hud" inert={panelOpen}>
        <Hud
          nearId={nearId}
          onSwitchLocale={switchLocale}
          onFastTravel={() => setFastOpen(true)}
          onHelp={() => setHelpOpen(true)}
          onTerminal={() => setTerminalOpen(true)}
          onEnterNear={() => nearPlace && enterPlace(nearPlace)}
          panelOpen={panelOpen}
          explored={explored}
        />
        {!panelOpen && <TouchStick onKeys={setKeys} />}
        {!panelOpen && <PlaceDock onTravel={travelTo} />}
      </div>

      {panelOpen ? (
        <Panel contentKey={path} onClose={closePanel} onSwitchLocale={switchLocale}>
          {children}
        </Panel>
      ) : (
        <div className={explored ? "intro is-compact" : "intro"} id="main">
          {children}
        </div>
      )}

      <Terminal
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onGo={travelTo}
        onTheme={setTheme}
        onLang={() => switchLocale()}
      />

      <Dialog open={fastOpen} onClose={() => setFastOpen(false)} title={t("hud.fastTravelTitle")}>
        <ul className="travel">
          {PLACES.map((place) => (
            <li key={place.id}>
              <button type="button" className="travel__item" onClick={() => travelTo(place)}>
                <span className="travel__text">
                  <strong>{t(`places.${place.id}.name`)}</strong>
                  <span>{t(`places.${place.id}.hint`)}</span>
                </span>
                <span className="travel__go">
                  {t("hud.go")} <IconEnter />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Dialog>

      <Dialog open={helpOpen} onClose={closeHelp} title={t("help.title")}>
        <ul className="help">
          <li>{t("help.move")}</li>
          <li>{t("help.enter")}</li>
          <li>{t("help.fast")}</li>
          <li>{t("help.extra")}</li>
        </ul>
        <button type="button" className="btn btn--primary" onClick={closeHelp}>
          {t("help.ok")}
        </button>
      </Dialog>
    </div>
  );
}
