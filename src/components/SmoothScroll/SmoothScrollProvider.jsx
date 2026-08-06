import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePreferences } from '../../context/preferencesContext';
import { LenisContext } from './lenisContext';

const SmoothScrollProvider = ({ children }) => {
  const lenisRef = useRef(null);
  const { reducedMotion } = usePreferences();

  useEffect(() => {
    /* Le réglage manuel peut ajouter de la sobriété, jamais retirer une
       préférence système "mouvement réduit" déjà active */
    const osReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || osReduced) return undefined;

    const instance = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      anchors: false,
    });

    let frame;
    const raf = (time) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    lenisRef.current = instance;

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
};

export default SmoothScrollProvider;
