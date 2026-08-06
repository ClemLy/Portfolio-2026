import { useCallback, useEffect, useState } from 'react';
import { playTick, playTickLow, startAmbient, stopAmbient } from '../lib/sound';
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

  useEffect(() => {
    window.localStorage.setItem('prefers-reduced-motion', String(reducedMotion));
  }, [reducedMotion]);

  useEffect(() => {
    window.localStorage.setItem('sound-enabled', String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => () => stopAmbient(), []);

  const toggleReducedMotion = useCallback(() => {
    setReducedMotion((prev) => !prev);
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

  return (
    <PreferencesContext.Provider
      value={{
        reducedMotion,
        toggleReducedMotion,
        soundEnabled,
        toggleSound,
        ambientEnabled,
        toggleAmbient,
        tick,
        tickLow,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export default PreferencesProvider;
