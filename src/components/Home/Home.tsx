import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center shrink-0">
      <header className="flex flex-col justify-center items-center gap-6 md:gap-8">
        <h1 className="flex flex-col gap-2 text-4xl font-bold tracking-tight text-text-primary md:flex-row md:gap-4 md:text-5xl lg:text-6xl">
          <span className="text-accent-dark">{t('ui.slogan.focus')}</span>
          <span className="text-accent-dark">{t('ui.slogan.plan')}</span>
          <span className="text-accent-dark">{t('ui.slogan.achieve')}</span>
        </h1>
        <div className="flex flex-col gap-2">
          <h2 className="subtitle text-xl md:text-2xl">
            <span className="font-bold text-text-primary">Kanban</span>
            {`: ${t('ui.welcome_title')}`}
          </h2>
          <p className="note text-text-secondary">{t('ui.welcome_subtitle')}</p>
        </div>
      </header>
    </div>
  );
};
