import { ImageResponse } from "next/og";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Fabio Danubbio — Full Stack Developer";

/** Immagine di anteprima per i social: marchio, nome e frase di presentazione. */
export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(isLocale(lang) ? lang : defaultLocale);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 72,
          background: "#0B0E14",
          color: "#E8EAF0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="96" height="96" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="16" fill="#F5B942" />
            <path
              d="M30 15V49M30 15H43a10 10 0 0 1 0 20H30M41 35l11 14"
              fill="none"
              stroke="#1C1300"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="8" y="50" width="16" height="6" rx="3" fill="#1C1300" />
          </svg>
          <div style={{ display: "flex", fontSize: 34, color: "#AAB1C0" }}>danubbio.it</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, letterSpacing: -2 }}>Fabio Danubbio</div>
          <div style={{ display: "flex", fontSize: 42, color: "#FFC961", lineHeight: 1.25 }}>{dict.home.tagline}</div>
          <div style={{ display: "flex", fontSize: 30, color: "#AAB1C0" }}>{dict.home.lead}</div>
        </div>
      </div>
    ),
    size,
  );
}
