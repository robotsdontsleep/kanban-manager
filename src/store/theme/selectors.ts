import type { ThemeState } from "./types";

export const selectTheme = (state: ThemeState) => state.activeTheme;
export const selectToggleTheme = (state: ThemeState) => state.toggleTheme;
