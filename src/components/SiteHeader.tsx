import { scrollToTop } from "../hooks/scrollToTop";
import { IconPause, IconPlay } from "./SiteIcons";

type SiteHeaderProps = {
  motionPlaying: boolean;
  onToggleMotion: () => void;
};

export default function SiteHeader({ motionPlaying, onToggleMotion }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a href="#top" onClick={scrollToTop} className="brand">
        <span aria-hidden="true" className="brand-prompt">
          ~/
        </span>
        tjeastmond
      </a>
      <nav aria-label="Primary" className="site-nav">
        <div className="pill nav-links">
          {/* Hidden until posts are ready; re-enable with <WritingSection /> in App.tsx.
          <a href="#writing" className="nav-link">
            Writing
          </a>
          */}
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </div>
        <button type="button" className="pill motion-toggle" onClick={onToggleMotion} aria-pressed={!motionPlaying}>
          {motionPlaying ? <IconPause /> : <IconPlay />}
          <span>{motionPlaying ? "Pause jellyfish" : "Play jellyfish"}</span>
        </button>
      </nav>
    </header>
  );
}
