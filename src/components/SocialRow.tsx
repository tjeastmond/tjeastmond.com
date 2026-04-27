import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { useSupportsHover } from "../hooks/useSupportsHover";
import { SOCIAL_ATTRIBUTION_LABELS, type SocialAttribution } from "./socialLinkData";
import SocialLinks from "./SocialLinks";

type Segment = SocialAttribution;

const ATTRIBUTION_LABELS: Record<Segment, string> = SOCIAL_ATTRIBUTION_LABELS;

type Timers = {
  labelSwap: ReturnType<typeof setTimeout> | null;
  exitClear: ReturnType<typeof setTimeout> | null;
  rowLeave: ReturnType<typeof setTimeout> | null;
};

type SwapPair = {
  out: Segment | null;
  inc: Segment;
};

function labelSwapOutMs(): number {
  if (typeof window === "undefined") return 130;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 55 : 130;
}

function rowRevealMs(): number {
  if (typeof window === "undefined") return 280;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 280;
}

function segmentFromEvent(event: MouseEvent): Segment | null {
  const target = event.target as HTMLElement;
  const element = target.closest("[data-attribution-hover]");
  const value = element?.getAttribute("data-attribution-hover");

  if (value === "github" || value === "linkedin" || value === "steam" || value === "bluesky" || value === "swoo") {
    return value;
  }

  return null;
}

function clearTimer(timers: { current: Timers }, key: keyof Timers) {
  const id = timers.current[key];
  if (id !== null) {
    clearTimeout(id);
    timers.current[key] = null;
  }
}

function clearAllTimers(timers: { current: Timers }) {
  (Object.keys(timers.current) as (keyof Timers)[]).forEach((key) => {
    clearTimer(timers, key);
  });
}

function AttributionLine({ segment }: { segment: Segment }) {
  return (
    <>
      <span className="social-attribution__arrow" aria-hidden="true">
        {"\u2192"}
      </span>
      {ATTRIBUTION_LABELS[segment]}
    </>
  );
}

export default function SocialRow() {
  const supportsHover = useSupportsHover();

  if (!supportsHover) {
    return (
      <div className="social-row">
        <SocialLinks />
      </div>
    );
  }

  return <SocialRowHoverLabels />;
}

function SocialRowHoverLabels() {
  const [committedSegment, setCommittedSegment] = useState<Segment | null>(null);
  const [swapPair, setSwapPair] = useState<SwapPair | null>(null);
  const [attributionConcealed, setAttributionConcealed] = useState(false);

  const visibleSegmentRef = useRef<Segment | null>(null);
  const swapPairRef = useRef<SwapPair | null>(null);
  const pointerSegmentRef = useRef<Segment | null | undefined>(undefined);
  const timers = useRef<Timers>({ labelSwap: null, exitClear: null, rowLeave: null });

  useEffect(() => {
    return () => {
      clearAllTimers(timers);
    };
  }, []);

  const syncToPointer = useCallback((next: Segment) => {
    clearAllTimers(timers);

    let from = visibleSegmentRef.current;
    const midSwap = swapPairRef.current;
    if (midSwap !== null) {
      from = midSwap.inc;
    }
    if (from === next) {
      return;
    }

    const pair: SwapPair = { out: from, inc: next };
    swapPairRef.current = pair;
    setSwapPair(pair);

    timers.current.labelSwap = setTimeout(() => {
      visibleSegmentRef.current = next;
      swapPairRef.current = null;
      setCommittedSegment(next);
      setSwapPair(null);
      timers.current.labelSwap = null;
    }, labelSwapOutMs());
  }, []);

  const onRowLeave = useCallback(() => {
    clearAllTimers(timers);
    swapPairRef.current = null;
    setSwapPair(null);
    pointerSegmentRef.current = undefined;

    timers.current.rowLeave = setTimeout(() => {
      visibleSegmentRef.current = null;
      setCommittedSegment(null);
      setAttributionConcealed(false);
      timers.current.rowLeave = null;
    }, rowRevealMs());
  }, []);

  const onDeadZone = useCallback(() => {
    clearTimer(timers, "labelSwap");
    clearTimer(timers, "rowLeave");
    swapPairRef.current = null;
    setSwapPair(null);
    setAttributionConcealed(true);
    pointerSegmentRef.current = null;

    if (visibleSegmentRef.current === null || timers.current.exitClear !== null) return;

    timers.current.exitClear = setTimeout(() => {
      visibleSegmentRef.current = null;
      setCommittedSegment(null);
      timers.current.exitClear = null;
    }, rowRevealMs());
  }, []);

  const onPointer = useCallback(
    (event: MouseEvent) => {
      clearTimer(timers, "rowLeave");

      const next = segmentFromEvent(event);
      if (next === null) {
        onDeadZone();
        return;
      }
      if (next === pointerSegmentRef.current) return;

      clearTimer(timers, "exitClear");
      setAttributionConcealed(false);
      pointerSegmentRef.current = next;
      syncToPointer(next);
    },
    [onDeadZone, syncToPointer],
  );

  return (
    <div className="social-row" onMouseEnter={onPointer} onMouseMove={onPointer} onMouseLeave={onRowLeave}>
      <SocialLinks />
      <span
        className={`social-attribution${attributionConcealed ? " social-attribution--concealed" : ""}`}
        aria-hidden="true"
      >
        <span className="social-attribution__content">
          {swapPair !== null ? (
            <span className="social-attribution__stack">
              {swapPair.out !== null && (
                <span className="social-attribution__swap social-attribution__swap--out" key={`out-${swapPair.out}`}>
                  <AttributionLine segment={swapPair.out} />
                </span>
              )}
              <span
                className={`social-attribution__swap social-attribution__swap--in${
                  swapPair.out === null ? " social-attribution__swap--in-only" : ""
                }`}
                key={`in-${swapPair.inc}`}
              >
                <AttributionLine segment={swapPair.inc} />
              </span>
            </span>
          ) : committedSegment !== null ? (
            <span className="social-attribution__idle" key={`idle-${committedSegment}`}>
              <AttributionLine segment={committedSegment} />
            </span>
          ) : null}
        </span>
      </span>
    </div>
  );
}
