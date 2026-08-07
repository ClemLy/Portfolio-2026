import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePreferences } from '../../context/preferencesContext';
import styles from './ParallaxLines.module.css';

/* Filets décoratifs en fond de page, chacun dérivant verticalement à sa
   propre vitesse au fil du défilement pour suggérer plusieurs plans de
   profondeur derrière le contenu */
const LINES = [
  { left: '6%', speed: 120, height: '65vh', top: '4vh' },
  { left: '22%', speed: -80, height: '40vh', top: '38vh' },
  { left: '78%', speed: 160, height: '55vh', top: '12vh' },
  { left: '92%', speed: -140, height: '35vh', top: '60vh' },
];

const ParallaxLines = () => {
  const ref = useRef(null);
  const { reducedMotion } = usePreferences();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  if (reducedMotion) return null;

  return (
    <div ref={ref} className={`${styles.field} print-hide`} aria-hidden="true">
      {LINES.map((line, index) => (
        <Line key={index} config={line} progress={scrollYProgress} />
      ))}
    </div>
  );
};

const Line = ({ config, progress }) => {
  const y = useTransform(progress, [0, 1], [0, config.speed]);
  return (
    <motion.span
      className={styles.line}
      style={{ left: config.left, top: config.top, height: config.height, y }}
    />
  );
};

export default ParallaxLines;
