import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { ThemeState, ThemeStore } from "./types";

const themeStore: ThemeStore = (set) => ({
  activeTheme: "light",
  toggleTheme: () => {
    set((state) => {
      state.activeTheme = state.activeTheme === "light" ? "dark" : "light";
    });
  },
});

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(immer(themeStore), {
      name: "theme-storage",
      partialize: (state) => ({
        activeTheme: state.activeTheme,
      }),
    }),
    { name: "ThemeStore" },
  ),
);
