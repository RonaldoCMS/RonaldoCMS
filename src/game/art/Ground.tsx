import { PLACES, ROADS, WORLD } from "../world";

/** Generatore pseudo-casuale deterministico: server e client disegnano gli stessi ciuffi d'erba. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const TUFTS = (() => {
  const rand = seeded(20260311);
  return Array.from({ length: 260 }, () => ({ x: 20 + rand() * (WORLD.w - 40), y: 20 + rand() * (WORLD.h - 40) }));
})();

const FLOWERS = (() => {
  const rand = seeded(42);
  return Array.from({ length: 70 }, () => ({
    x: 30 + rand() * (WORLD.w - 60),
    y: 30 + rand() * (WORLD.h - 60),
    accent: rand() > 0.5,
  }));
})();

/** Terreno: erba, strade, piazza e zone davanti alle porte. Un solo SVG, sotto a tutto il resto. */
export function Ground({ nearId }: { nearId: string | null }) {
  const road = (points: readonly { x: number; y: number }[]) =>
    points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");

  return (
    <svg
      className="ground"
      width={WORLD.w}
      height={WORLD.h}
      viewBox={`0 0 ${WORLD.w} ${WORLD.h}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect width={WORLD.w} height={WORLD.h} className="f-grass" />
      {TUFTS.map((t, i) => (
        <path key={i} d={`M${t.x} ${t.y}l-4-9M${t.x} ${t.y}l0-12M${t.x} ${t.y}l4-9`} className="s-tuft" />
      ))}
      {FLOWERS.map((f, i) => (
        <circle key={i} cx={f.x} cy={f.y} r={3.2} className={f.accent ? "f-accent" : "f-flower"} />
      ))}

      {/* strade: bordo e fondo */}
      {ROADS.map((r, i) => (
        <path key={`e${i}`} d={road(r)} className="s-road-edge" />
      ))}
      {ROADS.map((r, i) => (
        <path key={`r${i}`} d={road(r)} className="s-road" />
      ))}

      {/* piazza */}
      <ellipse cx={1200} cy={780} rx={340} ry={238} className="f-plaza-edge" />
      <ellipse cx={1200} cy={780} rx={322} ry={222} className="f-plaza" />
      <ellipse cx={1200} cy={780} rx={190} ry={130} fill="none" className="s-plaza-ring" />

      {/* zone davanti alle porte */}
      {PLACES.map((p) => (
        <g key={p.id}>
          <ellipse cx={p.door.x} cy={p.door.y} rx={52} ry={22} className="f-mat" />
          <ellipse
            cx={p.door.x}
            cy={p.door.y}
            rx={66}
            ry={29}
            fill="none"
            className={nearId === p.id ? "door-hint is-near" : "door-hint"}
          />
        </g>
      ))}

      {/* siepe lungo il bordo del mondo */}
      <rect x={6} y={6} width={WORLD.w - 12} height={WORLD.h - 12} rx={26} fill="none" className="s-hedge" />
    </svg>
  );
}
