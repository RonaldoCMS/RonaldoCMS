export type BrandVariant = "plain" | "tile" | "cursor";

/**
 * Monogramma `_R`: un underscore da cursore di terminale e la R, tracciati con linee geometriche.
 * - plain: `_R` senza sfondo
 * - tile: `_R` scuro su tessera ambra arrotondata
 * - cursor: `R_` con il cursore dopo la lettera
 */
export function BrandMark({
  variant = "tile",
  size = 32,
  blink = false,
  className,
}: {
  variant?: BrandVariant;
  size?: number;
  blink?: boolean;
  className?: string;
}) {
  const ink = variant === "tile" ? "var(--brand-ink, #1c1300)" : "currentColor";
  const underscoreFill = variant === "tile" ? "var(--brand-ink, #1c1300)" : "var(--accent-fill, #f5b942)";
  // Con il cursore dopo la lettera la R si sposta a sinistra e l'underscore a destra.
  const cursorAfter = variant === "cursor";
  const rShift = cursorAfter ? -10 : 0;
  const underscoreX = cursorAfter ? 42 : 8;

  return (
    <svg
      className={`brand-mark${className ? ` ${className}` : ""}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="_R"
    >
      {variant === "tile" && <rect width="64" height="64" rx="16" fill="var(--accent-fill, #f5b942)" />}
      <g transform={`translate(${rShift} 0)`}>
        <path
          d="M30 15V49M30 15H43a10 10 0 0 1 0 20H30M41 35l11 14"
          fill="none"
          stroke={ink}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <rect
        className={blink ? "brand-mark__cursor is-blinking" : "brand-mark__cursor"}
        x={underscoreX}
        y="50"
        width="16"
        height="6"
        rx="3"
        fill={underscoreFill}
      />
    </svg>
  );
}
