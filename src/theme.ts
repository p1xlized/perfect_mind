export type ThemeName = "default" | "forest" | "sunset";

const themeFiles = import.meta.glob("./styles/themes/*.css", { eager: true });
const discoveredThemes = Object.keys(themeFiles).map((path) =>
  path.split("/").pop()?.replace(/\.css$/, ""),
).filter((theme): theme is string => Boolean(theme));

export const themeNames = ["default", ...discoveredThemes] as ThemeName[];

export const getStoredTheme = (): ThemeName => {
  const storedTheme = localStorage.getItem("app-theme") as ThemeName | null;
  return storedTheme && themeNames.includes(storedTheme) ? storedTheme : "default";
};

export const applyTheme = (theme: ThemeName) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("app-theme", theme);
  window.dispatchEvent(new CustomEvent<ThemeName>("themechange", { detail: theme }));
};

export type ThemeMode = "light" | "dark";

export const getStoredMode = (): ThemeMode =>
  localStorage.getItem("color-mode") === "dark" ? "dark" : "light";

export const applyMode = (mode: ThemeMode) => {
  document.documentElement.classList.toggle("dark", mode === "dark");
  localStorage.setItem("color-mode", mode);
  window.dispatchEvent(new CustomEvent<ThemeMode>("modechange", { detail: mode }));
};
