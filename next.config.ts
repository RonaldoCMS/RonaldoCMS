import type { NextConfig } from "next";

const SITE_HOST = "www.danubbio.it";

/** Host come espressione regolare ancorata ("danubbio.it" -> "^danubbio\.it$"). */
const hostPattern = (host: string) => "^" + host.split(".").join("\\.") + "$";

const nextConfig: NextConfig = {
  // Non genera il file AGENTS.md a ogni avvio di `next dev`.
  agentRules: false,
  async redirects() {
    // Il vecchio dominio e il dominio senza "www" finiscono sul sito nuovo.
    return ["ronaldocms.it", "www.ronaldocms.it", "danubbio.it"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: hostPattern(host) }],
      destination: `https://${SITE_HOST}/:path*`,
      permanent: true,
    }));
  },
};

export default nextConfig;
