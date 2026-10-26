import { useRef, useState, type PointerEvent } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ContactSection from "@components/ContactSection";
import FocusSection from "@components/FocusSection";
import Hero from "@components/Hero";
import SiteFooter from "@components/SiteFooter";
import SiteHeader from "@components/SiteHeader";
// Hidden until posts are ready; re-enable with the Writing nav link in SiteHeader.tsx.
// import WritingSection from "@components/WritingSection";
import { prefersReducedMotion } from "./hooks/prefersReducedMotion";
import { useOcean } from "./hooks/useOcean";
import "@styles/global.css";

const INTERACTIVE = 'a[href],button,[role="button"],label[for],summary';

export default function App() {
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const { hostRef, canvasRef, oceanRef } = useOcean(playing);
  const cursorRef = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const cursor = cursorRef.current;
    if (cursor && event.pointerType === "mouse") {
      cursor.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
      cursor.classList.add("on");
      const target = event.target as Element;
      const hot = target.closest?.(INTERACTIVE) != null;
      cursor.classList.toggle("hot", hot);
      cursor.classList.toggle("on-cta", hot && target.closest(".cta") != null);
    }
    const host = hostRef.current;
    if (!oceanRef.current || !host) return;
    const rect = host.getBoundingClientRect();
    oceanRef.current.setPointer(event.clientX - rect.left, event.clientY - rect.top);
  };

  const onPointerLeave = () => {
    cursorRef.current?.classList.remove("on", "hot", "on-cta");
    oceanRef.current?.setPointer(-1e5, -1e5);
  };

  return (
    <>
      <div id="top" className="site has-cursor" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
        <div className="ocean" ref={hostRef} aria-hidden="true">
          <canvas ref={canvasRef} />
        </div>
        <div className="cursor" ref={cursorRef} aria-hidden="true" />
        <div className="shade" aria-hidden="true" />

        <div className="container">
          <SiteHeader motionPlaying={playing} onToggleMotion={() => setPlaying((p) => !p)} />
          <main>
            <Hero />
            <FocusSection />
            {/* <WritingSection /> */}
            <ContactSection />
          </main>
          <SiteFooter />
        </div>
      </div>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
