import { createContext, useContext } from 'react';

/* Le contexte transporte une ref stable : l'instance Lenis est lue au moment
   de l'action (clic, navigation), jamais pendant le rendu */
export const LenisContext = createContext({ current: null });

export const useLenis = () => useContext(LenisContext);

/* Scroll top ou vers une cible, avec repli natif si Lenis est désactivé */
export const scrollTo = (lenisRef, target, options = {}) => {
  const lenis = lenisRef?.current;
  if (lenis) {
    lenis.scrollTo(target, {
      offset: options.offset ?? 0,
      duration: options.duration ?? 1.2,
      immediate: options.immediate ?? false,
    });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: options.immediate ? 'auto' : 'smooth' });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: options.immediate ? 'auto' : 'smooth' });
};
