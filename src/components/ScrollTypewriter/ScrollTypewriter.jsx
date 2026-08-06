import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import styles from './ScrollTypewriter.module.css';

/* Révèle le texte caractère par caractère selon la position de défilement
   de la page (et non selon le temps), comme une machine à écrire pilotée
   par le scroll */
const ScrollTypewriter = ({ text, className, range = [0, 160] }) => {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const charCount = useTransform(scrollY, range, [0, text.length]);
  const roundedCount = useTransform(charCount, (v) => Math.round(v));
  const display = useTransform(roundedCount, (v) => text.slice(0, v));

  if (reducedMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p className={className}>
      <motion.span aria-hidden="true">{display}</motion.span>
      <span className={styles.cursor} aria-hidden="true" />
      <span className="visually-hidden">{text}</span>
    </p>
  );
};

export default ScrollTypewriter;
