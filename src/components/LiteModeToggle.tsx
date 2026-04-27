import { useCallback, useEffect, useState } from "react";
import { IconMoon, IconSun } from "./SiteIcons";

const STORAGE_KEY = "tjeastmond-theme";
const DARK_COLOR = "#1d1e22";
const LITE_COLOR = "#fffcf7";

function setMetaThemeColor(hex: string) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", hex);
  }
}

export default function LiteModeToggle() {
  const [lite, setLite] = useState(() => document.documentElement.getAttribute("data-theme") === "lite");

  const apply = useCallback((enableLite: boolean) => {
    if (enableLite) {
      document.documentElement.setAttribute("data-theme", "lite");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    setLite(enableLite);
    setMetaThemeColor(enableLite ? LITE_COLOR : DARK_COLOR);
    try {
      localStorage.setItem(STORAGE_KEY, enableLite ? "lite" : "dark");
    } catch {}
  }, []);

  useEffect(() => {
    const isLite = document.documentElement.getAttribute("data-theme") === "lite";
    setMetaThemeColor(isLite ? LITE_COLOR : DARK_COLOR);
  }, []);

  const Icon = lite ? IconMoon : IconSun;

  return (
    <div className="theme-toggle-wrap">
      <button
        type="button"
        className="theme-toggle-button"
        onClick={() => apply(!lite)}
        aria-pressed={lite}
        aria-label={lite ? "Switch to dark theme" : "Switch to light theme"}
      >
        <Icon className="theme-toggle-icon" aria-hidden="true" focusable="false" />
      </button>
    </div>
  );
}
