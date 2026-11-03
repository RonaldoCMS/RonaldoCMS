/** Albero: il punto (x, y) del mondo è la base del tronco, in basso al centro dell'immagine. */
export const TREE_SIZE = { w: 90, h: 120 };

export function TreeArt({ variant = 0 }: { variant?: number }) {
  const big = variant % 3 === 0;
  return (
    <svg width={TREE_SIZE.w} height={TREE_SIZE.h} viewBox="0 0 90 120" overflow="visible" aria-hidden="true" focusable="false">
      <ellipse className="f-shadow" cx={45} cy={116} rx={26} ry={8} />
      <rect x={39} y={70} width={12} height={46} rx={3} className="f-trunk" />
      {big ? (
        <>
          <circle cx={45} cy={44} r={34} className="f-leaf2" />
          <circle cx={30} cy={52} r={24} className="f-leaf" />
          <circle cx={62} cy={50} r={24} className="f-leaf" />
          <circle cx={46} cy={30} r={22} className="f-leaf" />
        </>
      ) : (
        <>
          <path d="M45 6 L78 70 L12 70 Z" className="f-leaf2" />
          <path d="M45 26 L74 88 L16 88 Z" className="f-leaf" />
        </>
      )}
    </svg>
  );
}

export const LAMP_SIZE = { w: 90, h: 130 };

/** Lampione: il punto (x, y) è la base del palo. La luce si vede di notte. */
export function LampArt() {
  return (
    <svg width={LAMP_SIZE.w} height={LAMP_SIZE.h} viewBox="0 0 90 130" overflow="visible" aria-hidden="true" focusable="false">
      <ellipse className="f-shadow" cx={45} cy={126} rx={12} ry={4} />
      <defs>
        <radialGradient id="lamp-gradient">
          <stop offset="0" stopColor="#ffd479" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffd479" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle className="lamp-glow" cx={45} cy={34} r={62} fill="url(#lamp-gradient)" />
      <rect x={42} y={36} width={6} height={90} rx={2} className="f-metal" />
      <rect x={34} y={118} width={22} height={8} rx={3} className="f-metal" />
      <path d="M32 36 L58 36 L52 20 L38 20 Z" className="f-metal" />
      <rect x={38} y={22} width={14} height={14} rx={3} className="lamp-bulb" />
    </svg>
  );
}

export const FOUNTAIN_SIZE = { w: 130, h: 130 };

export function FountainArt() {
  return (
    <svg width={FOUNTAIN_SIZE.w} height={FOUNTAIN_SIZE.h} viewBox="0 0 130 130" overflow="visible" aria-hidden="true" focusable="false">
      <ellipse className="f-shadow" cx={65} cy={118} rx={70} ry={14} />
      <ellipse cx={65} cy={92} rx={64} ry={36} className="f-stone" />
      <ellipse cx={65} cy={86} rx={64} ry={36} className="f-stone-light" />
      <ellipse cx={65} cy={86} rx={52} ry={28} className="f-water" />
      <ellipse className="ripple" cx={65} cy={90} rx={30} ry={14} fill="none" />
      <rect x={58} y={40} width={14} height={50} rx={4} className="f-stone" />
      <ellipse cx={65} cy={44} rx={22} ry={8} className="f-stone-light" />
      <path className="jet" d="M65 40 C65 18 48 18 40 44 M65 40 C65 18 82 18 90 44 M65 40 V12" fill="none" />
    </svg>
  );
}
