import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PAGES = ["/it", "/it/storia", "/it/esperienze/promedya", "/it/progetti", "/it/contatti", "/en/progetti/dhonko"];

for (const theme of ["light", "dark"] as const) {
  test.describe(`accessibilità (${theme})`, () => {
    test.use({ colorScheme: theme });

    for (const path of PAGES) {
      test(`${path} non ha violazioni WCAG A/AA`, async ({ page }) => {
        await page.goto(path);
        await page.waitForTimeout(500);
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
        const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length} elementi, es. ${v.nodes[0]?.target.join(" ")}`);
        expect(summary).toEqual([]);
      });
    }
  });
}
