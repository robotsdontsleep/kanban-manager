import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage?.(lng);
  };

  const languages = [
    { code: 'uk', label: 'UA' },
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
  ];

  return (
    <div className="btn-base h-12 gap-6 bg-accent-lines" role="group" aria-label="Select language">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => void changeLanguage(code)}
          aria-pressed={i18n.language === code}
          className={`note flex size-10 shrink-0 items-center justify-center rounded-full font-bold outline-none transition-all hover:brightness-110 active:scale-95 ${
            i18n.language === code
              ? 'bg-accent-dark text-text-on-accent'
              : 'bg-accent-light text-text-secondary hover:text-accent-dark'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
