export interface Vec {
  x: number;
  y: number;
}

/** Rettangolo con origine in alto a sinistra. */
export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Size {
  w: number;
  h: number;
}

export interface Keys {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
}
