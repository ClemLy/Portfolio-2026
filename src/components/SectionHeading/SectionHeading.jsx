import { motion } from 'framer-motion';
import { usePreferences } from '../../context/preferencesContext';
import styles from './SectionHeading.module.css';

const EASE = [0.16, 1, 0.3, 1];

const letterVariants = {
  hidden: { opacity: 0.15, y: '-0.4em', rotate: -6 },
  visible: (index) => ({
    opacity: 1,
    y: '0em',
    rotate: 0,
    transition: { duration: 0.5, delay: index * 0.018, ease: EASE },
  }),
};

/* Titre de section collant : reste visible en haut pendant la lecture de la
   section, avec une typographie cinétique qui se réaligne lettre par lettre
   à l'entrée dans le viewport. Seul le libellé est le vrai <h2> : le numéro
   et le compteur sont du décor, ils ne doivent pas polluer le titre lu par
   les moteurs de recherche et les lecteurs d'écran. */
const SectionHeading = ({ index, label, count }) => {
  const { reducedMotion } = usePreferences();
  const words = label.split(' ');

  return (
    <div className={`${styles.heading} section-heading-sticky`}>
      <motion.span
        className={styles.rule}
        aria-hidden="true"
        initial={reducedMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.9, ease: EASE }}
      />
      <span className={styles.watermark} aria-hidden="true">
        {index}
      </span>
      <span className={styles.index} aria-hidden="true">
        {index}
      </span>
      <h2 className={styles.label}>
        {reducedMotion ? (
          label
        ) : (
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            style={{ display: 'inline-block' }}
          >
            {/* Lettres groupées par mot : sur un écran étroit, le retour à
                la ligne tombe entre deux mots, jamais au milieu d'un mot */}
            {words.map((word, wordIndex) => {
              const offset = words.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0);
              return (
                <span key={wordIndex}>
                  {wordIndex > 0 && ' '}
                  <span className={styles.word}>
                    {word.split('').map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        custom={offset + charIndex}
                        variants={letterVariants}
                        style={{ display: 'inline-block' }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                </span>
              );
            })}
          </motion.span>
        )}
      </h2>
      {count && <span className={styles.count}>{count}</span>}
    </div>
  );
};

export default SectionHeading;
