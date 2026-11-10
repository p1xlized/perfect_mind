import { useEffect, useState } from "preact/hooks";
import { IconMoon, IconSun } from "@tabler/icons-preact";
import { applyMode, getStoredMode, ThemeMode } from "../theme";

const ThemeSwitcher = () => {
  const [mode, setMode] = useState<ThemeMode>(getStoredMode);

  useEffect(() => {
    const handleModeChange = (event: Event) => {
      setMode((event as CustomEvent<ThemeMode>).detail);
    };

    window.addEventListener("modechange", handleModeChange);
    return () => window.removeEventListener("modechange", handleModeChange);
  }, []);

  const isDark = mode === "dark";

  return (
    <button
      type="button"
      className="rounded-full bg-transparent p-0"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={() => {
        const nextMode = isDark ? "light" : "dark";
        setMode(nextMode);
        applyMode(nextMode);
      }}
    >
      {isDark ? <IconSun className="hover:text-primary/80 rounded-full cursor-pointer transition-colors" size={18} stroke={2} /> : <IconMoon className="hover:text-primary/80 rounded-full cursor-pointer transition-colors" size={18} stroke={2} />}
    </button>
  );
};

export default ThemeSwitcher;
