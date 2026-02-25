import { MdDarkMode as DarkTheme } from "react-icons/md";
import { CiLight as LightTheme } from "react-icons/ci";

import { useThemeStore } from "@/store/theme/store";
import { selectTheme, selectToggleTheme } from "@/store/theme/selectors";

export const ThemeSwitcher = () => {
  const theme = useThemeStore(selectTheme);
  const toggleTheme = useThemeStore(selectToggleTheme);

  return (
    <div
      className="btn-base h-12 gap-6 bg-accent-lines"
      role="group"
      aria-label="Theme switcher"
    >
      <LightTheme className="size-6 text-text-secondary" aria-hidden="true" />

      <button
        className="relative flex h-5 w-10 items-center rounded-full bg-accent-dark px-1 transition-all hover:brightness-110 outline-none"
        onClick={toggleTheme}
        role="switch"
        aria-checked={theme === "dark"}
        aria-label="Toggle dark mode"
      >
        <span
          className={`h-3.5 w-3.5 rounded-full bg-white transition-transform duration-200 ${
            theme === "dark" ? "translate-x-4.5" : "translate-x-0"
          }`}
        />
      </button>

      <DarkTheme className="size-6 text-text-secondary" aria-hidden="true" />
    </div>
  );
};
