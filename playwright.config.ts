import { defineConfig, devices } from "@playwright/test";

const PORT = 3200;
/** Con E2E_BASE_URL i test girano su un server già avviato (per esempio `next dev`). */
const baseURL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    // il messaggio "come si gioca" della prima visita non deve coprire i test
    storageState: { cookies: [], origins: [{ origin: baseURL, localStorage: [{ name: "fd-help-seen", value: "1" }] }] },
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } }, testIgnore: /mobile\.spec\.ts/ },
    // il telefono esegue i suoi test e anche i controlli di accessibilità
    { name: "mobile", use: { ...devices["Pixel 7"] }, testMatch: /(mobile|a11y)\.spec\.ts/ },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `npm run build && npm run start -- -p ${PORT}`,
        url: `http://localhost:${PORT}/it`,
        reuseExistingServer: true,
        timeout: 300_000,
      },
});
