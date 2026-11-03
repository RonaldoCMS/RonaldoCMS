import type { CSSProperties, ReactNode } from "react";
import type { PlaceId } from "../world";

/** Colore del tetto di ogni edificio (la sfumatura scura è calcolata dal CSS). */
export const ROOF: Record<PlaceId, string> = {
  casa: "#d2693f",
  scuola: "#4e6fa3",
  jotto: "#2f8f89",
  accenture: "#5b6b8c",
  promedya: "#f5b942",
  lab: "#8a63b5",
  biblioteca: "#b04a4a",
  posta: "#d9442f",
  scrivania: "#b8844f",
};

const Shadow = ({ w, h }: { w: number; h: number }) => (
  <ellipse className="f-shadow" cx={w / 2} cy={h + 3} rx={w * 0.56} ry={13} />
);

function Win({ x, y, w, h, lit = true, bars = true }: { x: number; y: number; w: number; h: number; lit?: boolean; bars?: boolean }) {
  return (
    <g>
      <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx={4} className="f-wall2" />
      <rect x={x} y={y} width={w} height={h} rx={2} className={lit ? "f-win is-lit" : "f-win"} />
      {bars && <path d={`M${x + w / 2} ${y}V${y + h}M${x} ${y + h / 2}H${x + w}`} className="s-frame" />}
    </g>
  );
}

const Knob = ({ cx, cy }: { cx: number; cy: number }) => <circle cx={cx} cy={cy} r={3} className="f-accent" />;

function Casa() {
  return (
    <>
      <Shadow w={320} h={250} />
      <rect x={232} y={34} width={28} height={70} className="f-wall2" />
      <rect x={227} y={28} width={38} height={10} rx={2} className="f-roof2" />
      <rect x={22} y={112} width={276} height={138} className="f-wall" />
      <rect x={22} y={232} width={276} height={18} className="f-wall2" />
      <path d="M0 128 L160 16 L320 128 Z" className="f-roof" />
      <path d="M160 16 L320 128 L160 128 Z" className="f-roof2" />
      <rect x={0} y={124} width={320} height={10} rx={3} className="f-roof2" />
      <circle cx={160} cy={74} r={17} className="f-wall2" />
      <circle cx={160} cy={74} r={12} className="f-win is-lit" />
      <Win x={48} y={150} w={58} h={54} />
      <Win x={214} y={150} w={58} h={54} />
      <rect x={44} y={208} width={66} height={9} rx={2} className="f-trunk" />
      <rect x={210} y={208} width={66} height={9} rx={2} className="f-trunk" />
      {[52, 66, 80, 94].map((x) => (
        <circle key={x} cx={x} cy={207} r={5} className={x % 28 === 10 ? "f-accent" : "f-leaf"} />
      ))}
      {[218, 232, 246, 260].map((x) => (
        <circle key={x} cx={x} cy={207} r={5} className={x % 28 === 0 ? "f-accent" : "f-leaf"} />
      ))}
      <path d="M134 250 V190 a26 26 0 0 1 52 0 V250 Z" className="f-door" />
      <Knob cx={176} cy={222} />
      <rect x={126} y={246} width={68} height={8} rx={2} className="f-wall2" />
    </>
  );
}

function Scuola() {
  return (
    <>
      <Shadow w={350} h={250} />
      <rect x={0} y={96} width={350} height={154} className="f-wall" />
      <rect x={0} y={232} width={350} height={18} className="f-wall2" />
      <rect x={-8} y={84} width={366} height={20} rx={3} className="f-roof" />
      <path d="M112 96 L175 34 L238 96 Z" className="f-wall2" />
      <path d="M112 96 L175 34 L238 96" className="s-roof" />
      <circle cx={175} cy={72} r={14} className="f-wall" />
      <circle cx={175} cy={72} r={10} className="f-win is-lit" />
      <path d="M175 72V65M175 72L180 75" className="s-ink" />
      <path d="M175 34V-34" className="s-ink" strokeWidth={3} />
      <path d="M177 -32h40l-10 12 10 12h-40Z" className="f-accent" />
      {[22, 74, 126].map((x) => (
        <Win key={x} x={x} y={130} w={34} h={52} />
      ))}
      {[190, 242, 294].map((x) => (
        <Win key={x} x={x} y={130} w={34} h={52} />
      ))}
      <path d="M152 250 V196 a23 23 0 0 1 46 0 V250 Z" className="f-door" />
      <path d="M175 196V250" className="s-door" />
      <rect x={134} y={242} width={82} height={8} rx={2} className="f-wall2" />
      <rect x={124} y={248} width={102} height={6} rx={2} className="f-wall2" />
    </>
  );
}

function Jotto() {
  return (
    <>
      <Shadow w={300} h={220} />
      <rect x={236} y={0} width={22} height={50} className="f-wall2" />
      <rect x={0} y={72} width={300} height={148} className="f-wall" />
      <rect x={0} y={202} width={300} height={18} className="f-wall2" />
      <path d="M0 72 L0 30 L75 72 L75 30 L150 72 L150 30 L225 72 L225 30 L300 72 Z" className="f-roof" />
      <path d="M0 72h300" className="s-roof" />
      <rect x={26} y={116} width={128} height={104} rx={3} className="f-wall2" />
      <rect x={32} y={122} width={116} height={98} className="f-metal" />
      {[134, 148, 162, 176, 190, 204].map((y) => (
        <path key={y} d={`M32 ${y}H148`} className="s-slat" />
      ))}
      <Win x={176} y={104} w={34} h={42} />
      <circle cx={254} cy={126} r={30} className="f-wall2" />
      <circle cx={254} cy={126} r={25} className="f-wall" />
      <circle cx={254} cy={126} r={25} className="s-ink" fill="none" />
      <circle cx={254} cy={126} r={16} className="f-roof" />
      <path d="M254 126 L262 114" className="s-knob" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <path
          key={a}
          d="M254 104v4"
          className="s-ink"
          strokeWidth={2}
          transform={`rotate(${a} 254 126)`}
        />
      ))}
      <path d="M232 168h44v34h-44Z" className="f-door" />
      <Knob cx={270} cy={186} />
    </>
  );
}

function Accenture() {
  const cols = [86, 126, 166, 206];
  const rows = [66, 104, 142, 180, 218, 256];
  return (
    <>
      <Shadow w={320} h={400} />
      <path d="M160 40V-18" className="s-ink" strokeWidth={3} />
      <circle cx={160} cy={-20} r={5} className="f-beacon" />
      <rect x={52} y={26} width={216} height={16} rx={3} className="f-roof2" />
      <rect x={60} y={40} width={200} height={270} className="f-glass" />
      {rows.flatMap((y, r) =>
        cols.map((x, c) => (
          <rect key={`${r}-${c}`} x={x} y={y} width={32} height={24} rx={2} className={(r * 3 + c * 5) % 7 < 3 ? "f-win is-lit" : "f-win"} />
        )),
      )}
      <path d="M60 40 L150 40 L60 160 Z" className="f-sheen" />
      <rect x={0} y={304} width={320} height={96} rx={3} className="f-wall" />
      <rect x={0} y={382} width={320} height={18} className="f-wall2" />
      <rect x={-6} y={296} width={332} height={14} rx={3} className="f-roof" />
      <rect x={118} y={330} width={84} height={70} rx={3} className="f-glass" />
      <path d="M160 330V400" className="s-frame" />
      <rect x={22} y={332} width={64} height={42} rx={2} className="f-win is-lit" />
      <rect x={234} y={332} width={64} height={42} rx={2} className="f-win is-lit" />
    </>
  );
}

function Promedya() {
  const shutters = Array.from({ length: 8 }, (_, i) => 26 + i * 60);
  return (
    <>
      <Shadow w={520} h={270} />
      <rect x={0} y={96} width={520} height={174} className="f-wall" />
      <rect x={0} y={250} width={520} height={20} className="f-wall2" />
      <path d="M-8 108 L260 20 L528 108 Z" className="f-roof" />
      <path d="M260 20 L528 108 L260 108 Z" className="f-roof2" />
      <rect x={-8} y={104} width={536} height={10} rx={3} className="f-roof2" />
      <rect x={196} y={122} width={128} height={26} rx={4} className="f-wall2" />
      <circle cx={222} cy={135} r={6} className="f-accent" />
      <path d="M238 135h66" className="s-ink" strokeWidth={4} strokeLinecap="round" />
      {shutters.map((x, i) => (
        <g key={x}>
          <rect x={x - 3} y={156} width={54} height={114} className="f-wall2" />
          <rect x={x} y={160} width={48} height={110} className="f-metal" />
          {[172, 184, 196, 208, 220, 232, 244].map((y) => (
            <path key={y} d={`M${x} ${y}H${x + 48}`} className="s-slat" />
          ))}
          <circle cx={x + 24} cy={152} r={2.5} className={i % 2 === 0 ? "f-accent" : "f-leaf"} />
        </g>
      ))}
    </>
  );
}

function Lab() {
  return (
    <>
      <Shadow w={340} h={250} />
      <rect x={292} y={64} width={18} height={70} className="f-wall2" />
      <circle cx={301} cy={52} r={10} className="f-smoke" />
      <circle cx={312} cy={34} r={8} className="f-smoke" />
      <rect x={20} y={116} width={300} height={134} className="f-wall" />
      <rect x={20} y={232} width={300} height={18} className="f-wall2" />
      <path d="M60 120 A110 96 0 0 1 280 120 Z" className="f-roof" />
      <path d="M170 24 A110 96 0 0 1 280 120 L170 120 Z" className="f-roof2" />
      <rect x={52} y={114} width={236} height={10} rx={3} className="f-roof2" />
      <path d="M170 24V4" className="s-ink" strokeWidth={3} />
      <circle cx={170} cy={2} r={4} className="f-beacon" />
      <circle cx={170} cy={70} r={14} className="f-wall2" />
      <circle cx={170} cy={70} r={9} className="f-win is-lit" />
      <rect x={44} y={146} width={84} height={56} rx={4} className="f-wall2" />
      <rect x={49} y={151} width={74} height={46} rx={2} className="f-screen" />
      {[160, 170, 180, 190].map((y, i) => (
        <path key={y} d={`M56 ${y}h${[34, 52, 24, 40][i]}`} className="s-code" />
      ))}
      <rect x={212} y={146} width={84} height={56} rx={4} className="f-wall2" />
      <rect x={217} y={151} width={74} height={46} rx={2} className="f-screen" />
      {[160, 170, 180, 190].map((y, i) => (
        <path key={y} d={`M224 ${y}h${[48, 22, 44, 30][i]}`} className="s-code" />
      ))}
      <circle cx={170} cy={196} r={18} className="s-gear" fill="none" />
      <circle cx={170} cy={196} r={9} className="f-wall2" />
      <path d="M152 250 V224 a18 18 0 0 1 36 0 V250 Z" className="f-door" />
    </>
  );
}

function Biblioteca() {
  return (
    <>
      <Shadow w={360} h={240} />
      <rect x={20} y={92} width={320} height={148} className="f-wall" />
      <path d="M6 92 L180 18 L354 92 Z" className="f-wall2" />
      <path d="M6 92 L180 18 L354 92" className="s-roof" />
      <path d="M0 98 H360" className="s-roof" strokeWidth={8} />
      <path d="M180 76 C164 58 140 56 126 62 V84 C140 78 164 80 180 92 C196 80 220 78 234 84 V62 C220 56 196 58 180 76 Z" className="f-roof" />
      {[34, 92, 150, 208, 266, 320].map((x) => (
        <g key={x}>
          <rect x={x - 2} y={100} width={22} height={9} rx={2} className="f-wall" />
          <rect x={x} y={108} width={18} height={116} className="f-wall" />
          <path d={`M${x + 6} 112V222M${x + 12} 112V222`} className="s-flute" />
          <rect x={x - 2} y={222} width={22} height={9} rx={2} className="f-wall" />
        </g>
      ))}
      <rect x={20} y={92} width={320} height={148} fill="none" />
      <path d="M156 240 V190 a24 24 0 0 1 48 0 V240 Z" className="f-door" />
      <rect x={124} y={236} width={112} height={8} rx={2} className="f-wall2" />
      <rect x={110} y={242} width={140} height={6} rx={2} className="f-wall2" />
    </>
  );
}

function Posta() {
  return (
    <>
      <Shadow w={200} h={170} />
      <rect x={91} y={96} width={18} height={74} className="f-trunk" />
      <rect x={70} y={160} width={60} height={10} rx={3} className="f-wall2" />
      <path d="M30 100 V64 a70 56 0 0 1 140 0 V100 Z" className="f-roof" />
      <path d="M100 8 a70 56 0 0 1 70 56 V100 H100 Z" className="f-roof2" />
      <rect x={52} y={64} width={96} height={12} rx={6} className="f-slot" />
      <rect x={62} y={52} width={76} height={20} rx={2} className="f-letter" transform="rotate(-6 100 62)" />
      <path d="M62 52 L100 66 L138 52" className="s-ink" fill="none" transform="rotate(-6 100 62)" />
      <rect x={168} y={50} width={5} height={52} className="f-metal" />
      <rect x={173} y={50} width={24} height={16} rx={2} className="f-accent" />
      <rect x={52} y={84} width={96} height={16} rx={3} className="f-wall2" />
    </>
  );
}

function Scrivania() {
  return (
    <>
      <Shadow w={200} h={130} />
      <rect x={14} y={92} width={10} height={38} className="f-trunk" />
      <rect x={176} y={92} width={10} height={38} className="f-trunk" />
      <rect x={0} y={76} width={200} height={16} rx={4} className="f-wood" />
      <rect x={86} y={58} width={28} height={20} className="f-metal" />
      <rect x={42} y={0} width={116} height={64} rx={7} className="f-ink-body" />
      <rect x={48} y={6} width={104} height={50} rx={3} className="f-screen" />
      <path d="M58 22l9 7-9 7" className="s-prompt" fill="none" />
      <rect className="f-cursor" x={74} y={34} width={14} height={4} rx={1} />
      <rect x={52} y={66} width={96} height={10} rx={3} className="f-wall2" />
      <path d="M62 71h76" className="s-slat" />
      <rect x={160} y={58} width={16} height={18} rx={3} className="f-accent" />
    </>
  );
}

const ART: Record<PlaceId, () => ReactNode> = {
  casa: Casa,
  scuola: Scuola,
  jotto: Jotto,
  accenture: Accenture,
  promedya: Promedya,
  lab: Lab,
  biblioteca: Biblioteca,
  posta: Posta,
  scrivania: Scrivania,
};

/** Disegno di un edificio: occupa esattamente il suo rettangolo, con tetto e ombra che possono sporgere. */
export function BuildingArt({ id, w, h }: { id: PlaceId; w: number; h: number }) {
  const Art = ART[id];
  return (
    <svg
      className="building"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      overflow="visible"
      aria-hidden="true"
      focusable="false"
      style={{ "--roof": ROOF[id] } as CSSProperties}
    >
      <Art />
    </svg>
  );
}
