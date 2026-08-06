import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Asterisk } from 'lucide-react';
import useKonamiCode from '../../hooks/useKonamiCode';
import { usePreferences } from '../../context/preferencesContext';
import { playTick } from '../../lib/sound';
import styles from './EasterEgg.module.css';

const BURST_COUNT = 14;

/* Généré au déclenchement (pas au rendu) : Math.random() n'a rien à faire
   dans le corps du composant, qui doit rester pur */
const createBurst = () =>
  Array.from({ length: BURST_COUNT }, (_, index) => ({
    id: index,
    angle: (360 / BURST_COUNT) * index + Math.random() * 20,
    distance: 120 + Math.random() * 140,
    size: 14 + Math.random() * 18,
    delay: Math.random() * 0.15,
  }));

/* Un petit clin d'œil pour qui explore jusqu'au code Konami */
const EasterEgg = () => {
  const [visible, setVisible] = useState(false);
  const [burst, setBurst] = useState([]);
  const reducedMotion = useReducedMotion();
  const { soundEnabled } = usePreferences();

  const unlock = () => {
    setBurst(createBurst());
    setVisible(true);
  };

  useKonamiCode(unlock);

  useEffect(() => {
    if (!visible) return undefined;
    if (soundEnabled) {
      [520, 660, 780, 960].forEach((freq, index) => {
        setTimeout(() => playTick(freq), index * 90);
      });
    }

    const timeout = setTimeout(() => setVisible(false), 3600);
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setVisible(false);
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, soundEnabled]);

  useEffect(() => {
    console.log(
      '%cToujours curieux, à ce que je vois.',
      'font-size: 14px; font-weight: 600; color: #B5615A;'
    );
    console.log(
      "Un indice pour la suite : ↑ ↑ ↓ ↓ ← → ← → B A. Et si le code vous intéresse, il est sur github.com/ClemLy."
    );
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.overlay}
          role="status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setVisible(false)}
        >
          {!reducedMotion && (
            <div className={styles.burst} aria-hidden="true">
              {burst.map((item) => (
                <motion.span
                  key={item.id}
                  className={styles.asterisk}
                  initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
                  animate={{
                    x: Math.cos((item.angle * Math.PI) / 180) * item.distance,
                    y: Math.sin((item.angle * Math.PI) / 180) * item.distance,
                    opacity: 0,
                    rotate: 180,
                    scale: 1,
                  }}
                  transition={{ duration: 1.4, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Asterisk size={item.size} strokeWidth={1.5} />
                </motion.span>
              ))}
            </div>
          )}

          <motion.div
            className={styles.message}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          >
            <p className={`${styles.title} serif`}>Code secret activé</p>
            <p className={styles.subtitle}>Merci d'avoir exploré jusqu'ici.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterEgg;
