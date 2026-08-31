import { useCallback, useEffect, useState } from 'react';
import { playTick, playTickLow, playPageTurn, startAmbient, stopAmbient } from '../lib/sound';
import { PreferencesContext } from './preferencesContext';

const readStored = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  const stored = window.localStorage.getItem(key);
  return stored === null ? fallback : stored === 'true';
};

/* Préférences : mouvement réduit et son d'interface sont persistés
   (désactivé par défaut, opt-in explicite) ; le son d'ambiance reste
   volontairement propre à la session pour ne jamais démarrer seul au
   chargement d'une page. */
const PreferencesProvider = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = window.localStorage.getItem('prefers-reduced-motion');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [soundEnabled, setSoundEnabled] = useState(() => readStored('sound-enabled', false));
  const [ambientEnabled, setAmbientEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = window.localStorage.getItem('prefers-dark-theme');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    window.localStorage.setItem('prefers-reduced-motion', String(reducedMotion));
    /* Coupe aussi les animations/transitions CSS pures (marquee, curseur
       clignotant…) que Framer Motion ne contrôle pas */
    document.documentElement.classList.toggle('reduced-motion', reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    window.localStorage.setItem('prefers-dark-theme', String(darkMode));
    if (darkMode) document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', darkMode ? '#1B1512' : '#FAF7F3');
  }, [darkMode]);

  useEffect(() => {
    window.localStorage.setItem('sound-enabled', String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => () => stopAmbient(), []);

  const toggleReducedMotion = useCallback(() => {
    setReducedMotion((prev) => !prev);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) playTick();
      return next;
    });
  }, []);

  const toggleAmbient = useCallback(() => {
    setAmbientEnabled((prev) => {
      const next = !prev;
      if (next) startAmbient();
      else stopAmbient();
      return next;
    });
  }, []);

  const tick = useCallback(() => {
    if (soundEnabled) playTick();
  }, [soundEnabled]);

  const tickLow = useCallback(() => {
    if (soundEnabled) playTickLow();
  }, [soundEnabled]);

  const pageTurn = useCallback(() => {
    if (soundEnabled) playPageTurn();
  }, [soundEnabled]);

  return (
    <PreferencesContext.Provider
      value={{
        reducedMotion,
        toggleReducedMotion,
        darkMode,
        toggleDarkMode,
        soundEnabled,
        toggleSound,
        ambientEnabled,
        toggleAmbient,
        tick,
        tickLow,
        pageTurn,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export default PreferencesProvider;
