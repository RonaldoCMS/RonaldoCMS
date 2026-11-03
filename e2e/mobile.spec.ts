import { expect, test, type Page } from "@playwright/test";

const playerTransform = (page: Page) => page.locator(".player").evaluate((el) => (el as HTMLElement).style.transform);

/** Trascina il joystick di `dx` pixel verso destra (o sinistra) e lo tiene premuto per `ms`. */
async function dragStick(page: Page, dx: number, dy = 0, ms = 600) {
  const box = (await page.locator(".stick").boundingBox())!;
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  await page.mouse.move(cx + dx, cy + dy, { steps: 4 });
  await page.waitForTimeout(ms);
  await page.mouse.up();
}

test.describe("telefono in verticale", () => {
  test("il joystick muove il personaggio e si può cambiare direzione senza staccare il dito", async ({ page }) => {
    await page.goto("/it");
    const before = await playerTransform(page);
    await dragStick(page, 38);
    const afterRight = await playerTransform(page);
    expect(afterRight).not.toBe(before);

    await dragStick(page, 0, 38);
    expect(await playerTransform(page)).not.toBe(afterRight);
  });

  test("toccare il terreno fa camminare e mostra un segno nel punto toccato", async ({ page }) => {
    await page.goto("/it");
    const before = await playerTransform(page);
    const viewport = page.viewportSize()!;
    await page.touchscreen.tap(viewport.width * 0.8, viewport.height * 0.35);
    await expect(page.locator(".tap-marker")).toBeAttached();
    await page.waitForTimeout(700);
    expect(await playerTransform(page)).not.toBe(before);
  });

  test("la barra dei luoghi porta subito a un luogo", async ({ page }) => {
    await page.goto("/it");
    const dock = page.getByRole("navigation", { name: "Dove vuoi andare?" });
    await expect(dock).toBeVisible();
    await dock.getByRole("button", { name: "Scuola" }).click();
    await expect(page).toHaveURL(/\/it\/formazione$/);
    // con il pannello aperto la barra e il joystick non servono e spariscono
    await expect(page.locator(".dock")).toHaveCount(0);
    await expect(page.locator(".stick")).toHaveCount(0);
    await page.getByRole("button", { name: "Torna al mondo" }).click();
    await expect(page.locator(".dock")).toBeVisible();
    // il luogo visitato ha il suo punto
    await expect(dock.getByRole("button", { name: "Scuola" })).toHaveClass(/is-visited/);
  });

  test("il pannello occupa lo schermo e si chiude", async ({ page }) => {
    await page.goto("/it/storia");
    const panel = page.getByRole("dialog");
    await expect(panel).toBeVisible();
    const viewport = page.viewportSize()!;
    const box = (await panel.boundingBox())!;
    expect(box.width).toBeGreaterThanOrEqual(viewport.width - 1);
    await page.getByRole("button", { name: "Chiudi" }).click();
    await expect(page).toHaveURL(/\/it$/);
  });

  test("il menu in alto resta dentro lo schermo e i pulsanti sono abbastanza grandi per il dito", async ({ page }) => {
    await page.goto("/it");
    const viewport = page.viewportSize()!;
    for (const name of ["Come si gioca", /Lingua/, /tema/]) {
      const box = (await page.getByRole("button", { name }).first().boundingBox())!;
      expect(box.x + box.width, String(name)).toBeLessThanOrEqual(viewport.width);
      expect(box.width, String(name)).toBeGreaterThanOrEqual(40);
      expect(box.height, String(name)).toBeGreaterThanOrEqual(40);
    }
    for (const item of await page.locator(".dock__item").all()) {
      expect((await item.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
  });

  test("la scheda di benvenuto è compatta e dopo il primo passo si ritira", async ({ page }) => {
    await page.goto("/it");
    const viewport = page.viewportSize()!;
    const card = (await page.locator(".intro__card").boundingBox())!;
    expect(card.height).toBeLessThan(viewport.height * 0.22);
    await dragStick(page, 38, 0, 300);
    await expect(page.locator(".intro")).toHaveClass(/is-compact/);
    await expect(page.locator(".hint")).toHaveCount(0);
    // il titolo resta nella pagina per i lettori di schermo
    await expect(page.getByRole("heading", { level: 1 })).toBeAttached();
  });

  test("nessuno scorrimento orizzontale e nessun elemento oltre i bordi", async ({ page }) => {
    for (const path of ["/it", "/it/esperienze/promedya", "/it/progetti", "/it/contatti"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });

  test("il modulo di contatto si compila senza che la tastiera o i bordi lo coprano", async ({ page }) => {
    await page.goto("/it/contatti");
    const viewport = page.viewportSize()!;
    for (const label of ["Nome", "Messaggio"]) {
      const box = (await page.getByLabel(label, { exact: true }).boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
    }
  });
});

test.describe("telefono in orizzontale", () => {
  test.use({ viewport: { width: 844, height: 390 } });

  test("restano solo barra dei luoghi e joystick, dentro lo schermo e senza coprirsi", async ({ page }) => {
    await page.goto("/it");
    await expect(page.locator(".intro")).toBeHidden();
    const dock = (await page.locator(".dock").boundingBox())!;
    const stick = (await page.locator(".stick").boundingBox())!;
    expect(dock.y + dock.height).toBeLessThanOrEqual(390 + 1);
    expect(stick.y + stick.height).toBeLessThanOrEqual(dock.y); // il joystick sta sopra la barra
    expect(stick.y).toBeGreaterThanOrEqual(0);
    // il mondo ha ancora spazio per essere visto
    expect(dock.height + stick.height).toBeLessThan(390 * 0.7);
  });

  test("il pannello occupa tutta la larghezza", async ({ page }) => {
    await page.goto("/it/storia");
    const box = (await page.getByRole("dialog").boundingBox())!;
    expect(box.width).toBeGreaterThanOrEqual(843);
  });
});
