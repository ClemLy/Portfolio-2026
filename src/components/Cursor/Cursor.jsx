import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useFinePointer } from '../../hooks/useFinePointer';
import styles from './Cursor.module.css';

/* Curseur personnalisé : point qui suit la souris, s'étire sur les liens,
   se transforme en pastille de texte sur les éléments data-cursor-label,
   et traîne deux points fantômes derrière lui à l'état neutre */
const Cursor = () => {
  const [variant, setVariant] = useState('default');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const enabled = finePointer && !reducedMotion;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 45, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 45, mass: 0.5 });
  const trailX1 = useSpring(x, { stiffness: 260, damping: 38, mass: 0.6 });
  const trailY1 = useSpring(y, { stiffness: 260, damping: 38, mass: 0.6 });
  const trailX2 = useSpring(x, { stiffness: 140, damping: 36, mass: 0.8 });
  const trailY2 = useSpring(y, { stiffness: 140, damping: 36, mass: 0.8 });

  useEffect(() => {
    if (!enabled) return undefined;

    const handleMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const handleOver = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const labelled = target?.closest('[data-cursor-label]');
      if (labelled) {
        setVariant('label');
        setLabel(labelled.getAttribute('data-cursor-label'));
        return;
      }
      setLabel('');
      setVariant(target?.closest('a, button') ? 'hover' : 'default');
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const trailVisible = visible && variant === 'default';

  return (
    <div className="print-hide" aria-hidden="true">
      <motion.div className={styles.trail} style={{ x: trailX2, y: trailY2 }}>
        <motion.span
          className={styles.trailDot}
          animate={{ scale: trailVisible ? 1 : 0, opacity: trailVisible ? 0.25 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </motion.div>
      <motion.div className={styles.trail} style={{ x: trailX1, y: trailY1 }}>
        <motion.span
          className={styles.trailDot}
          animate={{ scale: trailVisible ? 1 : 0, opacity: trailVisible ? 0.45 : 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30 }}
        />
      </motion.div>
      <motion.div className={styles.root} style={{ x: springX, y: springY }}>
        <motion.div
          className={`${styles.dot} ${variant === 'label' ? styles.pill : ''}`}
          animate={{
            scale: visible ? (variant === 'hover' ? 2.4 : 1) : 0,
            opacity: visible ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          {variant === 'label' && <span className={styles.label}>{label}</span>}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Cursor;
