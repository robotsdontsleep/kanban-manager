import { useState } from "react";
import { IoIosArrowForward as ArrowIcon } from "react-icons/io";
import { BiHide as HideIcon } from "react-icons/bi";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import logoDark from "@/assets/logo-dark.svg";
import logoLight from "@/assets/logo-light.svg";
import { useThemeStore } from "@/store/theme/store";
import { selectTheme } from "@/store/theme/selectors";

interface Props {
  children?: React.ReactNode;
}

export const Sidebar = (props: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    const sidebarState = localStorage.getItem("sidebar_expanded");
    return sidebarState === null ? true : JSON.parse(sidebarState);
  });

  const toggleSidebar = () => {
    setIsExpanded((prev) => {
      const sidebarState = !prev;
      localStorage.setItem("sidebar_expanded", JSON.stringify(sidebarState));
      return sidebarState;
    });
  };

  const theme = useThemeStore(selectTheme);
  const logoSrc = theme === "dark" ? logoLight : logoDark;

  const sidebarBase =
    "flex-column w-75 gap-xl h-screen border-r border-lines translate-x-0 will-change-[transform,margin-left] transition-[transform,margin-left] duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]";
  const sidebarHidden = "-translate-x-full -ml-85";

  const btnBase =
    "centered fixed bottom-8 left-0 w-14 h-12 rounded-r-full bg-accent-dark text-text-on-accent transition-all duration-300";
  const btnHidden = "-translate-x-full opacity-0 pointer-events-none";

  return (
    <>
      <aside className={`${sidebarBase} ${isExpanded ? "" : sidebarHidden}`}>
        <header className="centered flex-none h-25 border-b border-lines">
          <img src={logoSrc} alt="Kanban Logo" className="w-50" />
        </header>

        {props.children}

        <footer className="mt-auto flex-column-centered flex-none w-full p-xl pt-0 gap-md">
          <ThemeSwitcher />
          <button className="btn-base gap-sm" onClick={toggleSidebar}>
            <HideIcon /> Hide Sidebar
          </button>
        </footer>
      </aside>

      <button
        className={`${btnBase} ${isExpanded ? btnHidden : ""}`}
        onClick={toggleSidebar}
      >
        <ArrowIcon />
      </button>
    </>
  );
};
