import { motion, useScroll, useTransform } from 'framer-motion';
import { usePreferences } from '../../context/preferencesContext';
import styles from './ScrollTypewriter.module.css';

const Char = ({ char, index, roundedCount }) => {
  const opacity = useTransform(roundedCount, (count) => (index < count ? 1 : 0));
  return (
    <motion.span aria-hidden="true" style={{ opacity }}>
      {char}
    </motion.span>
  );
};

/* Révèle le texte caractère par caractère selon la position de défilement
   de la page (et non selon le temps), comme une machine à écrire pilotée
   par le scroll. Chaque lettre reste dans le flux, seule son opacité anime :
   la mise en page du paragraphe est donc fixée dès le montage et ne bouge
   plus jamais pendant le scroll (trancher la chaîne affichée faisait
   varier le nombre de lignes, et donc la hauteur de toute la page). */
const ScrollTypewriter = ({ text, className, range = [0, 160] }) => {
  const { reducedMotion } = usePreferences();
  const { scrollY } = useScroll();
  const charCount = useTransform(scrollY, range, [0, text.length]);
  const roundedCount = useTransform(charCount, (v) => Math.round(v));

  if (reducedMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p className={className}>
      {text.split('').map((char, i) => (
        <Char key={i} char={char} index={i} roundedCount={roundedCount} />
      ))}
      <span className={styles.cursor} aria-hidden="true" />
      <span className="visually-hidden">{text}</span>
    </p>
  );
};

export default ScrollTypewriter;
