import { useLayoutEffect } from "react";

import { useThemeStore } from "@/store/theme/store";

import { selectTheme } from "@/store/theme/selectors";

export const useTheme = () => {
  const theme = useThemeStore(selectTheme);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
};
