import { useEffect, useRef } from 'react';

const SNAP_THRESHOLD = 90;
const IDLE_DELAY = 160;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/* Aimante doucement le scroll vers le haut de la section la plus proche une
   fois que l'utilisateur s'est arrêté juste à côté d'une frontière, sans
   jamais interrompre un scroll en cours ni forcer un défilement long.
   Boucle rAF plutôt qu'un abonnement à l'évènement Lenis : l'instance est
   créée de façon asynchrone par un effet ancêtre, donc lenisRef.current
   peut encore valoir null au moment où cet effet se déclenche. */
const useSoftScrollSnap = (lenisRef, selector, enabled) => {
  const lastY = useRef(null);
  const idleSince = useRef(0);
  const snapping = useRef(false);
  const snapReleaseAt = useRef(0);

  useEffect(() => {
    if (!enabled) return undefined;
    let frame;

    const tick = (time) => {
      frame = requestAnimationFrame(tick);
      const instance = lenisRef?.current;
      if (!instance) return;

      const y = window.scrollY;
      if (lastY.current === null || Math.abs(y - lastY.current) > 0.3) {
        idleSince.current = time;
      }
      lastY.current = y;

      if (snapping.current) {
        if (time > snapReleaseAt.current) snapping.current = false;
        return;
      }

      if (time - idleSince.current < IDLE_DELAY) return;
      if (Math.abs(instance.velocity) > 0.05 || instance.isScrolling === 'smooth') return;

      const sections = Array.from(document.querySelectorAll(selector));
      if (!sections.length) return;
      let nearestTop = null;
      let nearestDist = Infinity;
      sections.forEach((el) => {
        const top = el.getBoundingClientRect().top + y;
        const dist = Math.abs(top - y);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestTop = top;
        }
      });

      if (nearestTop !== null && nearestDist > 4 && nearestDist < SNAP_THRESHOLD) {
        snapping.current = true;
        snapReleaseAt.current = time + 750;
        instance.scrollTo(nearestTop, { duration: 0.7, easing: easeOutCubic });
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [lenisRef, selector, enabled]);
};

export default useSoftScrollSnap;
