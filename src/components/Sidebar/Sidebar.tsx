import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IoIosArrowForward as ArrowIcon } from 'react-icons/io';
import { BiHide as HideIcon } from 'react-icons/bi';

import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';

import { useThemeStore } from '@/store/theme/store';
import { selectTheme } from '@/store/theme/selectors';

import logoDark from '@/assets/logo-dark.svg';
import logoLight from '@/assets/logo-light.svg';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

interface Props {
  children?: React.ReactNode;
}

export const Sidebar = ({ children }: Props) => {
  const { t } = useTranslation();

  const [isExpanded, setIsExpanded] = useState<boolean>((): boolean => {
    const sidebarState = localStorage.getItem('sidebar_expanded');
    return sidebarState === null ? true : (JSON.parse(sidebarState) as boolean);
  });

  const toggleSidebar = () => {
    setIsExpanded((prev) => {
      const newState = !prev;
      localStorage.setItem('sidebar_expanded', JSON.stringify(newState));
      return newState;
    });
  };

  const theme = useThemeStore(selectTheme);
  const logoSrc = theme === 'dark' ? logoLight : logoDark;

  return (
    <>
      <aside
        aria-expanded={isExpanded}
        className={`fixed inset-y-0 left-0 z-40 flex flex-col shrink-0 border-r border-lines bg-bg-page transition-all duration-300 md:relative md:translate-x-0 ${
          isExpanded
            ? 'w-[300px] translate-x-0 lg:w-[350px]'
            : 'w-[300px] -translate-x-full md:-ml-[300px] lg:w-[350px] lg:-ml-[350px]'
        }`}
      >
        <header className="flex h-16 shrink-0 items-center border-b border-lines px-6 md:h-20 lg:h-24">
          <img src={logoSrc} alt="Kanban Logo" className="w-32 flex-none md:w-36" />
        </header>

        <nav className="flex flex-1 flex-col min-h-0 overflow-hidden py-8">{children}</nav>

        <footer className="flex shrink-0 flex-col gap-4 px-6 py-8">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <button
            className="btn-base note gap-4 h-12 hover:text-accent-dark transition-colors"
            onClick={toggleSidebar}
            aria-label="Hide sidebar"
          >
            <HideIcon className="size-6" aria-hidden="true" />
            <span className="font-bold">{t('ui.hide_sidebar')}</span>
          </button>
        </footer>
      </aside>

      {!isExpanded && (
        <button
          className="fixed bottom-8 left-0 z-50 flex h-12 w-14 items-center justify-center rounded-r-full bg-accent-dark text-text-on-accent shadow-2xl transition-all hover:brightness-110 active:scale-95"
          onClick={toggleSidebar}
          aria-label="Show sidebar"
        >
          <ArrowIcon className="size-6" aria-hidden="true" />
        </button>
      )}
    </>
  );
};
