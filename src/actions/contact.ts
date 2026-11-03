"use server";

import { Resend } from "resend";
import { z } from "zod";

export interface ContactValues {
  name: string;
  email: string;
  message: string;
}

export type ContactState =
  | { status: "idle" }
  | { status: "ok" }
  /** In caso di errore si restituiscono i valori inseriti: React azzera il modulo a ogni invio. */
  | { status: "error"; code: "missing" | "email" | "generic" | "notConfigured"; values: ContactValues };

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().max(200).pipe(z.email()),
  message: z.string().trim().min(5).max(5000),
});

/** Un modulo compilato in meno di questo tempo è con ogni probabilità un bot. */
const MIN_FILL_MS = 2500;

const clean = (value: FormDataEntryValue | null) => (typeof value === "string" ? value : "");

/** Toglie i ritorni a capo, per non poter inserire intestazioni nell'oggetto della mail. */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export async function sendContact(_previous: ContactState, formData: FormData): Promise<ContactState> {
  // Trappola per bot: un campo nascosto che una persona non compila mai.
  if (clean(formData.get("website")) !== "") return { status: "ok" };

  const startedAt = Number(clean(formData.get("startedAt")));
  if (startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS) return { status: "ok" };

  const values: ContactValues = {
    name: clean(formData.get("name")),
    email: clean(formData.get("email")),
    message: clean(formData.get("message")),
  };
  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const anyEmpty = !values.name.trim() || !values.email.trim() || values.message.trim().length < 5;
    return { status: "error", code: anyEmpty ? "missing" : "email", values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") console.info("[contatti] RESEND_API_KEY assente: messaggio non inviato.");
    return { status: "error", code: "notConfigured", values };
  }

  const { name, email, message } = parsed.data;
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Sito danubbio.it <noreply@danubbio.it>",
      to: process.env.CONTACT_TO_EMAIL ?? "fabio@danubbio.it",
      replyTo: email,
      subject: `Messaggio dal sito di ${oneLine(name)}`,
      text: `${message}\n\n— ${oneLine(name)} <${email}>`,
    });
    if (error) throw new Error(error.message);
    return { status: "ok" };
  } catch (err) {
    console.error("[contatti] invio non riuscito:", err instanceof Error ? err.message : err);
    return { status: "error", code: "generic", values };
  }
}
