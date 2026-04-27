import { useSyncExternalStore } from "react";

export function useSupportsHover(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mediaQuery = window.matchMedia("(hover: hover)");
      mediaQuery.addEventListener("change", onChange);
      return () => {
        mediaQuery.removeEventListener("change", onChange);
      };
    },
    () => window.matchMedia("(hover: hover)").matches,
    () => false,
  );
}
