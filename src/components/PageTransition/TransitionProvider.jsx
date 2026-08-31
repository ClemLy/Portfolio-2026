import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLenis, scrollTo } from '../SmoothScroll/lenisContext';
import { usePreferences } from '../../context/preferencesContext';
import { TransitionContext } from './transitionContext';
import styles from './TransitionProvider.module.css';

const CURTAIN_DURATION = 0.7;
const CURTAIN_EASE = [0.76, 0, 0.24, 1];
const SPLIT_DURATION = 0.85;

const curtainVariants = {
  idle: { y: '100%', transition: { duration: 0 } },
  cover: { y: '0%', transition: { duration: CURTAIN_DURATION, ease: CURTAIN_EASE } },
  reveal: { y: '-100%', transition: { duration: CURTAIN_DURATION, ease: CURTAIN_EASE } },
};

const TransitionProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const lenis = useLenis();
  const { reducedMotion } = usePreferences();
  const [phase, setPhase] = useState('idle');
  /* Rideau simple pour la navigation entre pages, écran scindé réservé au
     tout premier chargement */
  const [introPhase, setIntroPhase] = useState('cover');
  const timers = useRef([]);

  const later = useCallback((fn, ms) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  /* Écran scindé au premier chargement : les deux panneaux s'écartent pour
     révéler la page, plutôt que le rideau vertical utilisé en navigation */
  useEffect(() => {
    history.scrollRestoration = 'manual';
    if (reducedMotion) {
      later(() => setIntroPhase('done'), 0);
      return undefined;
    }
    later(() => setIntroPhase('split'), 850);
    later(() => setIntroPhase('done'), 850 + SPLIT_DURATION * 1000 + 100);
    const active = timers.current;
    return () => active.forEach(clearTimeout);
  }, [later, reducedMotion]);

  const navigateTo = useCallback(
    (to) => {
      const [path, hash] = to.split('#');
      const targetPath = path || '/';

      /* Même page : simple défilement vers l'ancre ou le haut */
      if (targetPath === location.pathname) {
        scrollTo(lenis, hash ? `#${hash}` : 0, { offset: hash ? -24 : 0 });
        return;
      }

      if (reducedMotion) {
        navigate(targetPath);
        window.scrollTo(0, 0);
        return;
      }

      setPhase('cover');
      later(() => {
        navigate(targetPath);
        later(() => {
          scrollTo(lenis, 0, { immediate: true });
          if (hash) scrollTo(lenis, `#${hash}`, { immediate: true });
          setPhase('reveal');
          later(() => setPhase('idle'), CURTAIN_DURATION * 1000);
        }, 90);
      }, CURTAIN_DURATION * 1000 + 50);
    },
    [location.pathname, lenis, reducedMotion, navigate, later]
  );

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}

      <motion.div
        className={styles.curtain}
        variants={curtainVariants}
        initial="idle"
        animate={phase}
        aria-hidden="true"
      />

      {introPhase !== 'done' && (
        <div aria-hidden="true">
          <motion.div
            className={`${styles.introPanel} ${styles.introPanelLeft}`}
            initial={{ x: '0%' }}
            animate={{ x: introPhase === 'split' ? '-100%' : '0%' }}
            transition={{ duration: SPLIT_DURATION, ease: CURTAIN_EASE }}
          />
          <motion.div
            className={`${styles.introPanel} ${styles.introPanelRight}`}
            initial={{ x: '0%' }}
            animate={{ x: introPhase === 'split' ? '100%' : '0%' }}
            transition={{ duration: SPLIT_DURATION, ease: CURTAIN_EASE }}
          />
          <motion.div
            className={styles.introMark}
            initial={{ opacity: 0, y: 24 }}
            animate={{
              opacity: introPhase === 'split' ? 0 : 1,
              y: introPhase === 'split' ? -16 : 0,
            }}
            transition={{ duration: introPhase === 'split' ? 0.3 : 0.5, ease: 'easeOut' }}
          >
            <span className={styles.introName}>Clémentin Ly</span>
            <span className={styles.introMeta}>Portfolio 2026</span>
          </motion.div>
        </div>
      )}
    </TransitionContext.Provider>
  );
};

export default TransitionProvider;
