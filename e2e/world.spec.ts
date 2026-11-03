import { expect, test, type Page } from "@playwright/test";

/** Posizione del personaggio sullo schermo (il suo elemento si sposta con transform). */
const playerPosition = (page: Page) =>
  page.locator(".player").evaluate((el) => (el as HTMLElement).style.transform);

test.describe("il mondo", () => {
  test("la pagina iniziale si carica senza errori e mostra il benvenuto", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

    await page.goto("/it");
    await expect(page.getByRole("heading", { level: 1, name: /Ciao, sono Fabio/ })).toBeVisible();
    await expect(page.locator(".player")).toBeVisible();
    await expect(page.locator('a.hotspot[aria-label="Magazzino Promedya"]')).toBeAttached();
    expect(errors).toEqual([]);
  });

  test("le frecce muovono il personaggio", async ({ page }) => {
    await page.goto("/it");
    const before = await playerPosition(page);
    await page.keyboard.down("ArrowRight");
    await page.waitForTimeout(600);
    await page.keyboard.up("ArrowRight");
    expect(await playerPosition(page)).not.toBe(before);
  });

  test("il personaggio si ferma contro la fontana", async ({ page }) => {
    await page.goto("/it");
    // Parte sotto la fontana: salendo non può attraversarla.
    await page.keyboard.down("ArrowUp");
    await page.waitForTimeout(1500);
    await page.keyboard.up("ArrowUp");
    const y = await page.locator(".player").evaluate((el) => Number((el as HTMLElement).style.zIndex));
    expect(y).toBeGreaterThan(850); // la fontana occupa y 715-845: i piedi restano sotto
  });

  test("il viaggio rapido porta a un luogo e Esc torna al mondo", async ({ page }) => {
    await page.goto("/it");
    await page.getByRole("button", { name: "Viaggio rapido" }).click();
    await page.getByRole("button", { name: /Scuola/ }).click();
    await expect(page).toHaveURL(/\/it\/formazione$/);
    await expect(page.getByRole("heading", { level: 1, name: "Formazione e certificazioni" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page).toHaveURL(/\/it$/);
  });

  test("un clic su un edificio fa camminare fin lì e apre la sua pagina", async ({ page }) => {
    await page.goto("/it");
    // la torre è fuori dallo schermo: si simula il clic sul suo collegamento
    await page.locator('a.hotspot[aria-label="Torre Accenture"]').dispatchEvent("click");
    await expect(page).toHaveURL(/\/it\/esperienze\/accenture$/, { timeout: 15_000 });
    await expect(page.getByRole("heading", { level: 1, name: "Full Stack Developer" })).toBeVisible();
  });

  test("da tastiera: focus su un luogo ed Invio aprono la pagina", async ({ page }) => {
    await page.goto("/it");
    await page.locator('a.hotspot[aria-label="Casa"]').focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/it\/storia$/, { timeout: 15_000 });
  });

  test("con un collegamento diretto la pagina si apre già al suo posto", async ({ page }) => {
    await page.goto("/it/esperienze/promedya");
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Full Stack Developer");
    await expect(page.getByText("Smart Server").first()).toBeVisible();
    // il mondo dietro al pannello non è raggiungibile con la tastiera
    await expect(page.locator(".shell__world")).toHaveAttribute("inert", "");
  });

  test("il progresso conta i luoghi visitati", async ({ page }) => {
    await page.goto("/it/storia");
    await page.goto("/it/formazione");
    await page.keyboard.press("Escape");
    await expect(page.locator(".pill strong")).toHaveText("2/8");
  });
});

test.describe("lingua e tema", () => {
  test("il cambio di lingua mantiene la pagina", async ({ page }) => {
    await page.goto("/it/storia");
    await page.getByRole("dialog").getByRole("button", { name: /Lingua: EN/ }).click();
    await expect(page).toHaveURL(/\/en\/storia$/);
    await expect(page.getByRole("heading", { level: 1, name: "My story" })).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("il tema si cambia e resta salvato", async ({ page }) => {
    await page.goto("/it");
    await page.emulateMedia({ colorScheme: "light" });
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.getByRole("button", { name: /tema scuro/ }).first().click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });
});

test.describe("terminale", () => {
  test("si apre con il tasto ` e risponde ai comandi", async ({ page }) => {
    await page.goto("/it");
    await page.keyboard.press("`");
    const terminal = page.getByRole("dialog", { name: "Terminale" });
    await expect(terminal).toBeVisible();
    const input = terminal.getByRole("textbox", { name: "Comando" });
    await input.fill("help");
    await input.press("Enter");
    await expect(terminal).toContainText("comandi disponibili");
    await input.fill("go scuola");
    await input.press("Enter");
    await expect(page).toHaveURL(/\/it\/formazione$/);
  });
});

test.describe("progetti e contatti", () => {
  test("i filtri dei progetti nascondono quelli di altre categorie", async ({ page }) => {
    await page.goto("/it/progetti");
    await expect(page.getByRole("heading", { level: 3, name: "GigliGame" })).toBeVisible();
    await page.getByRole("button", { name: "App mobile", exact: true }).click();
    await expect(page.getByRole("heading", { level: 3, name: "Dhonko" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "GigliGame" })).toHaveCount(0);
  });

  test("il modulo segnala i campi mancanti", async ({ page }) => {
    await page.goto("/it/contatti");
    await page.waitForTimeout(3000); // un modulo compilato prima di 2,5 s è scartato come bot
    await page.getByRole("button", { name: "Invia" }).click();
    await expect(page.getByRole("status")).toContainText("Compila nome, email e messaggio.");
  });

  test("il modulo controlla l'email e, senza chiave di invio, avvisa che non è attivo", async ({ page }) => {
    await page.goto("/it/contatti");
    await page.waitForTimeout(3000);
    await page.getByLabel("Nome").fill("Mario Rossi");
    await page.getByLabel("Email", { exact: true }).fill("non-un-indirizzo");
    await page.getByLabel("Messaggio").fill("Ciao, vorrei parlarti di un progetto.");
    await page.getByRole("button", { name: "Invia" }).click();
    await expect(page.getByRole("status")).toContainText("Controlla l'indirizzo email.");

    await page.getByLabel("Email", { exact: true }).fill("mario@example.com");
    await page.getByRole("button", { name: "Invia" }).click();
    await expect(page.getByRole("status")).toContainText(/non è ancora attivo|Messaggio inviato/);
  });
});

test.describe("contenuti e SEO", () => {
  test("il root reindirizza in base alla lingua del browser", async ({ request }) => {
    const en = await request.get("/", { headers: { "accept-language": "en-US,en;q=0.9" }, maxRedirects: 0 });
    expect(en.status()).toBe(307);
    expect(en.headers()["location"]).toMatch(/\/en$/);
    const it = await request.get("/", { headers: { "accept-language": "it-IT,it;q=0.9" }, maxRedirects: 0 });
    expect(it.headers()["location"]).toMatch(/\/it$/);
  });

  test("il testo delle pagine è già nell'HTML del server", async ({ request }) => {
    const res = await request.get("/it/esperienze/promedya");
    const html = await res.text();
    expect(html).toContain("Smart Server");
    expect(html).toContain("Integrazione Cashmatic");
    expect(html).toContain('lang="it"');
    expect(html).toContain("application/ld+json");
    expect(html).toContain("fabio@danubbio.it");
  });

  test("ogni pagina ha titolo, descrizione e versioni nelle due lingue", async ({ request }) => {
    const html = await (await request.get("/en/progetti/dhonko")).text();
    expect(html).toMatch(/<title>Dhonko: sole developer<\/title>/);
    expect(html).toMatch(/hreflang="it"/i);
    expect(html).toMatch(/hreflang="en"/i);
    expect(html).toContain('rel="canonical"');
  });

  test("sitemap e robots rispondono con l'indirizzo del sito", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("https://www.danubbio.it/it/storia");
    expect(sitemap).toContain("https://www.danubbio.it/en/contatti");
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Sitemap: https://www.danubbio.it/sitemap.xml");
  });

  test("l'immagine di anteprima e le icone si generano", async ({ request }) => {
    const og = await request.get("/it/opengraph-image");
    expect(og.status()).toBe(200);
    expect(og.headers()["content-type"]).toContain("image/png");
    expect((await request.get("/icon.svg")).status()).toBe(200);
    expect((await request.get("/apple-icon")).status()).toBe(200);
  });

  test("una pagina inesistente mostra il messaggio nel pannello", async ({ page }) => {
    await page.goto("/it/non-esiste");
    await expect(page.getByRole("heading", { level: 1, name: "Qui non c'è niente" })).toBeVisible();
  });

  test("nessun nome di cliente né frase vietata compare nell'HTML", async ({ request }) => {
    for (const path of ["/it", "/it/storia", "/it/esperienze/promedya", "/it/progetti", "/en/progetti", "/it/progetti/dhonko"]) {
      const html = (await (await request.get(path)).text()).toLowerCase();
      for (const word of ["mepa", "damarila", "destefano", "de stefano", "clean architecture", "mongodb", "gmail"]) {
        expect(html, `${path}: ${word}`).not.toContain(word);
      }
    }
  });
});
