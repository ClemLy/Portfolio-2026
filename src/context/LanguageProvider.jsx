import { useCallback, useMemo, useState } from 'react';
import { dictionary } from '../i18n/dictionary';
import { LanguageContext } from './languageContext';

const readInitialLang = () => {
  if (typeof window === 'undefined') return 'fr';
  const stored = window.localStorage.getItem('language');
  if (stored === 'fr' || stored === 'en') return stored;
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en';
};

/* Langue du site : fr par défaut, en sinon détectée depuis le navigateur,
   toujours persistée une fois choisie manuellement */
const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(readInitialLang);

  const setLang = useCallback((next) => {
    setLangState(next);
    window.localStorage.setItem('language', next);
    document.documentElement.setAttribute('lang', next);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  }, [lang, setLang]);

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, dict: dictionary[lang] }),
    [lang, setLang, toggleLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
