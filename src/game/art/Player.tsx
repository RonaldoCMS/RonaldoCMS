import type { Facing } from "../engine/movement";

/** Dimensioni dell'immagine del personaggio: i piedi stanno in basso al centro. */
export const PLAYER_SIZE = { w: 44, h: 64 };
export const PLAYER_FEET = { x: 22, y: 60 };

export function PlayerArt({ facing }: { facing: Facing }) {
  const up = facing === "up";
  const eyeX = facing === "down" ? 18 : 24;
  return (
    <svg
      className="player__art"
      width={PLAYER_SIZE.w}
      height={PLAYER_SIZE.h}
      viewBox="0 0 44 64"
      overflow="visible"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse className="f-shadow" cx={22} cy={60} rx={15} ry={5} />
      {/* esterno: specchia il personaggio quando va a sinistra; interno: il saltello del passo */}
      <g style={{ transform: facing === "left" ? "scaleX(-1)" : undefined, transformOrigin: "22px 32px" }}>
        <g className="player__bob">
          <rect className="player__leg player__leg--l" x={14} y={44} width={7} height={15} rx={3} />
          <rect className="player__leg player__leg--r" x={23} y={44} width={7} height={15} rx={3} />
          <rect className="player__arm player__arm--l" x={7} y={27} width={6} height={18} rx={3} />
          <rect className="player__arm player__arm--r" x={31} y={27} width={6} height={18} rx={3} />
          <rect className="player__torso" x={11} y={24} width={22} height={24} rx={8} />
          <path d="M22 26V48" className="player__zip" />
          <circle className="player__head" cx={22} cy={16} r={11} />
          {up ? (
            <path className="player__hair" d="M11 16a11 11 0 0 1 22 0c0 5-3 9-11 9s-11-4-11-9Z" />
          ) : (
            <>
              <path className="player__hair" d="M11 15a11 11 0 0 1 22 0c-3-3-8-5-11-5s-8 2-11 5Z" />
              <circle className="player__eye" cx={eyeX} cy={17} r={1.5} />
              {facing === "down" && <circle className="player__eye" cx={26} cy={17} r={1.5} />}
              <path className="player__smile" d={facing === "down" ? "M19 22q3 2.5 6 0" : "M22 22q3 2 5 0"} />
            </>
          )}
        </g>
      </g>
    </svg>
  );
}
