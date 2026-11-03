import { notFound } from "next/navigation";

/** Qualunque indirizzo sconosciuto: si mostra la pagina "non trovata" dentro il mondo, nel pannello. */
export default function CatchAll() {
  notFound();
}
