/**
 * Genera il curriculum in PDF (italiano e inglese) a partire da `content.mjs`.
 *
 *   npm run cv                       scrive cv/Fabio-Danubbio-CV-it.pdf e -en.pdf
 *   node cv/build.mjs --preview=DIR  salva anche un'immagine di ogni foglio, per controllarli a occhio
 *
 * Usa Chromium di Playwright (npx playwright install chromium) e carica i font da Google Fonts:
 * serve quindi la rete. Se un foglio è troppo pieno, la generazione si ferma con un errore.
 */
import { mkdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { cv } from "./content.mjs";
import { renderCv } from "./template.mjs";

const outDir = fileURLToPath(new URL(".", import.meta.url));
const previewDir = process.argv.find((a) => a.startsWith("--preview="))?.slice("--preview=".length);

const browser = await chromium.launch();
try {
  const context = await browser.newContext({ viewport: { width: 794, height: 1123 } });
  for (const lang of Object.keys(cv)) {
    const page = await context.newPage();
    await page.setContent(renderCv(cv[lang]), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    // ogni colonna deve stare nel suo foglio: altrimenti il testo verrebbe tagliato
    const overflow = await page.evaluate(() =>
      [...document.querySelectorAll(".sheet")].flatMap((sheet, i) =>
        [".main", ".side"].flatMap((sel) => {
          const el = sheet.querySelector(sel);
          return el && el.scrollHeight > el.clientHeight + 1
            ? [`foglio ${i + 1}, ${sel}: ${el.scrollHeight - el.clientHeight}px di troppo`]
            : [];
        }),
      ),
    );
    if (overflow.length) throw new Error(`Il curriculum "${lang}" non sta nei fogli:\n  ${overflow.join("\n  ")}`);

    const file = `${outDir}Fabio-Danubbio-CV-${lang}.pdf`;
    await page.pdf({ path: file, width: "210mm", height: "297mm", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });

    const pages = (await readFile(file)).toString("latin1").match(/\/Type\s*\/Page[^s]/g)?.length ?? 0;
    if (pages !== 2) throw new Error(`Il curriculum "${lang}" ha ${pages} pagine invece di 2`);
    console.log(`${file.replace(outDir, "cv/")}  (${pages} pagine)`);

    if (previewDir) {
      await mkdir(previewDir, { recursive: true });
      for (const n of [1, 2]) await page.locator(`#sheet-${n}`).screenshot({ path: `${previewDir}/cv-${lang}-${n}.png` });
    }
    await page.close();
  }
} finally {
  await browser.close();
}
