import type { NextConfig } from "next";

// I redirect tra domini (www.danubbio.it, ronaldocms.it...) non stanno qui: si configurano
// su Vercel/DNS. Due redirect in direzioni opposte mandano il sito in un ciclo infinito.
// Il dominio principale è danubbio.it (vedi SITE_URL in src/i18n/config.ts).
const nextConfig: NextConfig = {
  // Non genera il file AGENTS.md a ogni avvio di `next dev`.
  agentRules: false,
};

export default nextConfig;
