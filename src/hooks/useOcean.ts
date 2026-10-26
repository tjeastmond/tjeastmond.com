import { useEffect, useRef } from "react";
import { createOcean, type Ocean } from "@components/ocean/createOcean";

/** Mounts the jellyfish ocean on the host/canvas pair and keeps its play state in sync. */
export function useOcean(playing: boolean) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const oceanRef = useRef<Ocean | null>(null);
  const playingRef = useRef(playing);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ocean = createOcean(host, canvas, "biolum", playingRef.current);
    oceanRef.current = ocean;
    return () => {
      ocean.destroy();
      oceanRef.current = null;
    };
  }, []);

  useEffect(() => {
    playingRef.current = playing;
    oceanRef.current?.setPlaying(playing);
  }, [playing]);

  return { hostRef, canvasRef, oceanRef };
}
