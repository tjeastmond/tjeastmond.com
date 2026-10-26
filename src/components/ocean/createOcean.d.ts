export type OceanMode = "biolum" | "reef" | "dusk";

export type Ocean = {
  setPlaying(playing: boolean): void;
  setPointer(x: number, y: number): void;
  setMode(mode: OceanMode): void;
  destroy(): void;
};

export function createOcean(
  host: HTMLElement,
  canvas: HTMLCanvasElement,
  startMode: OceanMode,
  startPlaying: boolean,
): Ocean;
