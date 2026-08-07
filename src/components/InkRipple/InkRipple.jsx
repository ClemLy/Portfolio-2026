import { useCallback, useEffect, useState } from 'react';
import { usePreferences } from '../../context/preferencesContext';
import styles from './InkRipple.module.css';

let uid = 0;

/* Petite tache d'encre qui se diffuse depuis le point de clic, comme une
   goutte tombant sur du papier */
const InkRipple = () => {
  const [ripples, setRipples] = useState([]);
  const { reducedMotion } = usePreferences();

  const spawn = useCallback((event) => {
    if (event.button !== 0) return;
    const id = (uid += 1);
    setRipples((prev) => [...prev, { id, x: event.clientX, y: event.clientY }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;
    document.addEventListener('pointerdown', spawn);
    return () => document.removeEventListener('pointerdown', spawn);
  }, [spawn, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div className={`${styles.layer} print-hide`} aria-hidden="true">
      {ripples.map((r) => (
        <span key={r.id} className={styles.ripple} style={{ left: r.x, top: r.y }} />
      ))}
    </div>
  );
};

export default InkRipple;
