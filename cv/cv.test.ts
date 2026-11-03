import { describe, expect, it } from "vitest";
import { cv } from "./content.mjs";

/** Stesse regole del sito: nessun nome di cliente, nessuna affermazione non dimostrabile. */
describe("curriculum", () => {
  it("italiano e inglese hanno la stessa struttura", () => {
    expect(cv.en.jobs.map((j) => j.bullets.length)).toEqual(cv.it.jobs.map((j) => j.bullets.length));
    expect(cv.en.projects.length).toBe(cv.it.projects.length);
    expect(cv.en.skills.map((s) => s.label.length > 0)).toEqual(cv.it.skills.map(() => true));
    expect(cv.en.education.length).toBe(cv.it.education.length);
    expect(cv.en.certs.length).toBe(cv.it.certs.length);
  });

  it("riporta gli stessi periodi e le stesse aziende nelle due lingue", () => {
    expect(cv.en.jobs.map((j) => j.org)).toEqual(cv.it.jobs.map((j) => j.org));
    expect(cv.it.jobs.map((j) => j.org)).toEqual(["Promedya S.r.l.", "Dhonko", "Accenture Italia", "Jotto S.r.l."]);
  });

  it("usa l'email del dominio nuovo e non pubblica il telefono", () => {
    for (const lang of ["it", "en"] as const) {
      const text = JSON.stringify(cv[lang]);
      expect(text).toContain("fabio@danubbio.it");
      expect(text).not.toMatch(/gmail|\+39|\b340\b/i);
    }
  });

  it("non contiene nomi di clienti né frasi vietate", () => {
    const forbidden = [
      /clean architecture/i,
      /mongodb/i,
      /github actions/i,
      /gitflow/i,
      /scrum/i,
      /cordova/i,
      /spoofing/i,
      /gdg/i,
      /google developer group/i,
      /vincitore|winner|won the/i,
      /mepa/i,
      /damarila/i,
      /de stefano/i,
      /webticket/i,
      /transcriber/i,
    ];
    const text = JSON.stringify(cv);
    for (const rule of forbidden) expect(text, String(rule)).not.toMatch(rule);
  });

  it("dichiara l'assistenza AI dove c'è", () => {
    for (const lang of ["it", "en"] as const) {
      const projects = cv[lang].projects.join(" ");
      expect(projects).toMatch(/AI/);
      expect(cv[lang].profile).toMatch(/AI/);
    }
  });
});
