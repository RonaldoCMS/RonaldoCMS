"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { IconClose } from "./icons";

/** Finestra modale nativa (<dialog>): il focus resta dentro, Esc chiude e lo sfondo è bloccato. */
export function Dialog({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const { t } = useI18n();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={`dialog${className ? ` ${className}` : ""}`}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => {
        // un clic sullo sfondo (fuori dalla scheda) chiude
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="dialog__card">
        <header className="dialog__head">
          <h2 className="dialog__title">{title}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label={t("ui.close")}>
            <IconClose />
          </button>
        </header>
        {children}
      </div>
    </dialog>
  );
}
