import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/* Détermine quelle section est actuellement au centre du viewport, pour
   surligner le lien de navigation correspondant. Se re-synchronise à chaque
   changement de page puisque les sections observées peuvent apparaître ou
   disparaître du DOM (ex: la home a des ancres, la page projet non). */
const useActiveSection = (ids) => {
  const [active, setActive] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) {
      /* Différé pour ne pas déclencher de setState synchrone dans l'effet */
      const timeout = setTimeout(() => setActive(null), 0);
      return () => clearTimeout(timeout);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, pathname]);

  return active;
};

export default useActiveSection;
