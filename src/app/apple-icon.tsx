import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Icona per la schermata Home di iOS: il monogramma `_R` su tessera ambra. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#F5B942" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
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
      </div>
    ),
    size,
  );
}
