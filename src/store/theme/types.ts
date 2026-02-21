import type { StateCreator } from "zustand";

export interface ThemeState {
  activeTheme: "light" | "dark";
  toggleTheme: () => void;
}

export type ThemeStore = StateCreator<
  ThemeState,
  [
    ["zustand/devtools", never],
    ["zustand/persist", unknown],
    ["zustand/immer", never],
  ]
>;
