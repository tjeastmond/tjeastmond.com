import type { MouseEvent } from "react";
import { prefersReducedMotion } from "../hooks/prefersReducedMotion";

function scrollToTop(event: MouseEvent<HTMLAnchorElement>) {
  const top = document.getElementById("top");
  if (!top) return;
  event.preventDefault();
  top.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>&copy; {new Date().getFullYear()} TJ Eastmond</span>
      <a href="#top" onClick={scrollToTop} className="back-to-top">
        Back to top &uarr;
      </a>
    </footer>
  );
}
