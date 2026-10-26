import type { MouseEvent } from "react";
import { prefersReducedMotion } from "./prefersReducedMotion";

/**
 * Click handler for `#top` links. Scrolls in JS instead of following the fragment: navigating to
 * `#top` makes the `.site` wrapper the `:target`, which can leave the glass panels inside it
 * rendering opaque instead of blurring the jellyfish behind them.
 */
export function scrollToTop(event: MouseEvent<HTMLAnchorElement>) {
  const top = document.getElementById("top");
  if (!top) return;
  event.preventDefault();
  top.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}
