"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContact, type ContactState } from "@/actions/contact";
import { useI18n } from "@/i18n/I18nProvider";

const initial: ContactState = { status: "idle" };

const ERROR_KEY = {
  missing: "contact.errorMissing",
  email: "contact.errorEmail",
  generic: "contact.errorGeneric",
  notConfigured: "contact.errorNotConfigured",
} as const;

export function ContactForm() {
  const { t } = useI18n();
  const [state, action, pending] = useActionState(sendContact, initial);
  const values = state.status === "error" ? state.values : undefined;
  const formRef = useRef<HTMLFormElement>(null);
  const startedRef = useRef<HTMLInputElement>(null);

  // L'ora di apertura serve al server per scartare i moduli compilati troppo in fretta.
  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
  }, []);
  useEffect(() => {
    if (state.status !== "ok") return;
    formRef.current?.reset();
    if (startedRef.current) startedRef.current.value = String(Date.now());
  }, [state]);

  return (
    <form ref={formRef} action={action} className="form" noValidate>
      <h2 className="form__title">{t("contact.formTitle")}</h2>
      <div className="field">
        <label htmlFor="c-name">{t("contact.name")}</label>
        <input id="c-name" name="name" type="text" autoComplete="name" required maxLength={120} defaultValue={values?.name} />
      </div>
      <div className="field">
        <label htmlFor="c-email">{t("contact.email")}</label>
        <input id="c-email" name="email" type="email" autoComplete="email" required maxLength={200} defaultValue={values?.email} />
      </div>
      <div className="field">
        <label htmlFor="c-message">{t("contact.message")}</label>
        <textarea id="c-message" name="message" required rows={5} maxLength={5000} defaultValue={values?.message} />
      </div>
      {/* Trappola per bot: nascosta alle persone e agli screen reader */}
      <div className="hp" aria-hidden="true">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input ref={startedRef} type="hidden" name="startedAt" defaultValue="0" />
      <div className="form__foot">
        <button type="submit" className="btn btn--primary" disabled={pending}>
          {pending ? t("contact.sending") : t("contact.send")}
        </button>
        <p
          className={`form__status${state.status === "ok" ? " is-ok" : state.status === "error" ? " is-err" : ""}`}
          role="status"
          aria-live="polite"
        >
          {state.status === "ok" && t("contact.success")}
          {state.status === "error" && t(ERROR_KEY[state.code])}
        </p>
      </div>
      <p className="note">{t("contact.note")}</p>
    </form>
  );
}
