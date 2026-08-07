import { useEffect, useRef } from 'react';

const COOLDOWN = 550;
const THRESHOLD = 12;

/* Détecte les tentatives de scroll au-delà du haut ou du bas de la page et
   diffuse un évènement global 'elastic-bounce', pour un rebond élastique
   décoratif plutôt qu'un simple arrêt sec */
const useElasticOverscroll = (enabled) => {
  const lastBounce = useRef(0);

  useEffect(() => {
    if (!enabled) return undefined;

    const handleWheel = (event) => {
      const now = performance.now();
      if (now - lastBounce.current < COOLDOWN) return;

      const doc = document.documentElement;
      const atTop = window.scrollY <= 0;
      const atBottom = Math.ceil(window.scrollY + window.innerHeight) >= doc.scrollHeight;

      if (atTop && event.deltaY < -THRESHOLD) {
        lastBounce.current = now;
        window.dispatchEvent(new CustomEvent('elastic-bounce', { detail: { edge: 'top' } }));
      } else if (atBottom && event.deltaY > THRESHOLD) {
        lastBounce.current = now;
        window.dispatchEvent(new CustomEvent('elastic-bounce', { detail: { edge: 'bottom' } }));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [enabled]);
};

export default useElasticOverscroll;
