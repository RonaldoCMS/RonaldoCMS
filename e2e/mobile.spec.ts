import { expect, test } from "@playwright/test";

test.describe("telefono", () => {
  test("la croce direzionale muove il personaggio", async ({ page }) => {
    await page.goto("/it");
    const before = await page.locator(".player").evaluate((el) => (el as HTMLElement).style.transform);
    const right = page.getByRole("button", { name: "Destra" });
    await expect(right).toBeVisible();
    const box = (await right.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(600);
    await page.mouse.up();
    expect(await page.locator(".player").evaluate((el) => (el as HTMLElement).style.transform)).not.toBe(before);
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

  test("il menu in alto resta dentro lo schermo", async ({ page }) => {
    await page.goto("/it");
    const viewport = page.viewportSize()!;
    for (const name of ["Viaggio rapido", "Terminale", "Come si gioca"]) {
      const box = (await page.getByRole("button", { name }).boundingBox())!;
      expect(box.x + box.width, name).toBeLessThanOrEqual(viewport.width);
    }
  });
});
