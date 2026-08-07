import { useEffect } from 'react';
import useElasticOverscroll from '../../hooks/useElasticOverscroll';
import { usePreferences } from '../../context/preferencesContext';

/* Applique un léger rebond élastique sur la page entière lorsqu'on tire
   au-delà du haut ou du bas, à la place d'un arrêt sec */
const ElasticOverscroll = () => {
  const { reducedMotion } = usePreferences();
  useElasticOverscroll(!reducedMotion);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const { body } = document;
    body.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)';

    const onBounce = (event) => {
      const { edge } = event.detail;
      body.style.transformOrigin = edge === 'top' ? 'top center' : 'bottom center';
      body.style.transform = 'scaleY(0.985)';
      requestAnimationFrame(() => {
        setTimeout(() => {
          body.style.transform = 'scaleY(1)';
        }, 30);
      });
    };

    window.addEventListener('elastic-bounce', onBounce);
    return () => {
      window.removeEventListener('elastic-bounce', onBounce);
      body.style.transition = '';
      body.style.transform = '';
    };
  }, [reducedMotion]);

  return null;
};

export default ElasticOverscroll;
