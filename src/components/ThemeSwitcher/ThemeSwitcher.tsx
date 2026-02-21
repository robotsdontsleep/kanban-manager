import { MdDarkMode as DarkTheme } from "react-icons/md";
import { CiLight as LightTheme } from "react-icons/ci";

import { useThemeStore } from "@/store/theme/store";
import { selectTheme, selectToggleTheme } from "@/store/theme/selectors";

export const ThemeSwitcher = () => {
  const theme = useThemeStore(selectTheme);
  const toogleTheme = useThemeStore(selectToggleTheme);

  const thumbClass = `w-3.5 h-3.5 bg-text-on-accent rounded-full transition-custom ${
    theme === "dark" ? "translate-x-1" : "translate-x-10"
  }`;

  return (
    <div className="btn-base gap-lg">
      <DarkTheme />
      <button
        className="relative flex items-center bg-accent-dark rounded-full w-15 h-6 hover:brightness-110"
        onClick={toogleTheme}
      >
        <span className={thumbClass}></span>
      </button>
      <LightTheme />
    </div>
  );
};
