import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dictionary } from '../i18n/dictionary';
import { langFromPath, localizePath } from '../i18n/paths';
import { LanguageContext } from './languageContext';

/* Changer de langue ouvre la même page dans l'autre langue, sans remonter en haut */
const LanguageProvider = ({ children }) => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const lang = langFromPath(pathname);

  const toggleLang = useCallback(() => {
    navigate(localizePath(pathname, lang === 'fr' ? 'en' : 'fr') + hash, { state: { keepScroll: true } });
  }, [lang, pathname, hash, navigate]);

  const value = useMemo(() => ({ lang, toggleLang, dict: dictionary[lang] }), [lang, toggleLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
