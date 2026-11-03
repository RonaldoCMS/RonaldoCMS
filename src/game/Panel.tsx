"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { IconClose } from "@/components/icons";
import { useI18n } from "@/i18n/I18nProvider";
import { LangButton, ThemeButton } from "./Controls";

/**
 * Pannello con la pagina del luogo, sopra al mondo. Il contenuto arriva già disegnato dal server.
 * `contentKey` cambia a ogni pagina: porta il focus sul titolo e riporta lo scorrimento in cima.
 */
export function Panel({
  contentKey,
  onClose,
  onSwitchLocale,
  children,
}: {
  contentKey: string;
  onClose: () => void;
  onSwitchLocale: () => void;
  children: ReactNode;
}) {
  const { t } = useI18n();
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
    document.getElementById("panel-title")?.focus({ preventScroll: true });
  }, [contentKey]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !e.defaultPrevented) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <section className="panel" role="dialog" aria-modal="true" aria-labelledby="panel-title" id="main">
      <div className="panel__bar">
        <button type="button" className="btn btn--ghost" onClick={onClose}>
          <span aria-hidden="true">←</span> {t("ui.backToWorld")}
        </button>
        <div className="panel__tools">
          <LangButton onSwitch={onSwitchLocale} />
          <ThemeButton />
          <button type="button" className="icon-btn" onClick={onClose} aria-label={t("ui.close")}>
            <IconClose />
          </button>
        </div>
      </div>
      <div className="panel__body" ref={bodyRef}>
        {children}
      </div>
    </section>
  );
}
