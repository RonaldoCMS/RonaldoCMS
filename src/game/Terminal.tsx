"use client";

import { useEffect, useRef, useState } from "react";
import { IconClose } from "@/components/icons";
import { useI18n } from "@/i18n/I18nProvider";
import { COUNTED_PLACES, placeById, type Place } from "./world";

/** Nomi alternativi con cui si può chiamare un luogo dal terminale (anche i nomi delle pagine). */
const ALIASES: Record<string, string> = {
  storia: "casa",
  formazione: "scuola",
  progetti: "lab",
  laboratorio: "lab",
  articoli: "biblioteca",
  contatti: "posta",
  contact: "posta",
  projects: "lab",
  home: "casa",
  school: "scuola",
  library: "biblioteca",
  mailbox: "posta",
};

interface TerminalProps {
  open: boolean;
  onClose: () => void;
  onGo: (place: Place) => void;
  onTheme: (theme: "light" | "dark") => void;
  onLang: (locale: "it" | "en") => void;
}

interface Line {
  text: string;
  kind?: "cmd" | "ok" | "muted";
}

/** Terminale nascosto nella scrivania: un omaggio a chi vive nella riga di comando. */
export function Terminal({ open, onClose, onGo, onTheme, onLang }: TerminalProps) {
  const { t, locale } = useI18n();
  const [lines, setLines] = useState<Line[]>(() => [{ text: t("terminal.welcome"), kind: "muted" }]);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const cursor = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement;
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (lastFocus.current instanceof HTMLElement) {
      lastFocus.current.focus();
      lastFocus.current = null;
    }
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const print = (text: string, kind?: Line["kind"]) => setLines((prev) => [...prev, { text, kind }]);

  const run = (raw: string) => {
    const [cmdRaw = "", ...args] = raw.trim().split(/\s+/);
    const cmd = cmdRaw.toLowerCase();
    const arg = (args[0] ?? "").toLowerCase();
    print(`$ ${raw}`, "cmd");

    switch (cmd) {
      case "help":
      case "?":
        return print(t("terminal.help"));
      case "about":
      case "whoami":
        return print(t("terminal.about"));
      case "stack":
      case "skills":
        return print(t("terminal.stack"));
      case "projects":
        return print(t("terminal.projects"));
      case "contact":
        return print(t("terminal.contact"));
      case "ls":
      case "dir":
        return print(COUNTED_PLACES.map((p) => p.id).join("  "));
      case "go":
      case "cd":
      case "open": {
        const id = ALIASES[arg] ?? arg.replace(/^\/|\/$/g, "");
        const place = placeById(id);
        if (!place) return print(t("terminal.noPlace", { place: args[0] ?? "" }));
        print(t("terminal.going", { place: t(`places.${place.id}.name`) }), "ok");
        onClose();
        onGo(place);
        return;
      }
      case "theme":
        if (arg === "light" || arg === "dark") {
          onTheme(arg);
          return print(t("terminal.theme", { theme: arg }), "ok");
        }
        return print(t("terminal.themeUsage"));
      case "lang":
        if (arg === "it" || arg === "en") {
          if (arg !== locale) onLang(arg);
          return print(t("terminal.lang", { lang: arg }), "ok");
        }
        return print(t("terminal.langUsage"));
      case "clear":
      case "cls":
        return setLines([]);
      case "exit":
      case "quit":
      case "q":
        return onClose();
      case "sudo":
        return print(t("terminal.sudo"));
      default:
        return print(t("terminal.unknown", { cmd: cmdRaw }));
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const text = value.trim();
      setValue("");
      if (!text) return;
      history.current.push(text);
      cursor.current = history.current.length;
      run(text);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.current.length) {
        cursor.current = Math.max(0, cursor.current - 1);
        setValue(history.current[cursor.current]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      cursor.current = Math.min(history.current.length, cursor.current + 1);
      setValue(history.current[cursor.current] ?? "");
    }
  };

  return (
    <div className="terminal" hidden={!open} role="dialog" aria-label={t("hud.terminal")}>
      <div className="terminal__bar">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>{t("terminal.title")}</span>
        <button type="button" className="icon-btn" onClick={onClose} aria-label={t("ui.close")}>
          <IconClose />
        </button>
      </div>
      <div className="terminal__log" ref={logRef} aria-live="polite">
        {lines.map((line, i) => (
          <div key={i} className={line.kind ? `terminal__line ${line.kind}` : "terminal__line"}>
            {line.text}
          </div>
        ))}
      </div>
      <label className="terminal__input">
        <span aria-hidden="true">$</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label={t("terminal.input")}
        />
      </label>
    </div>
  );
}
