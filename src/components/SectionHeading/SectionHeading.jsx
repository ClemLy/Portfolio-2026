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
   à l'entrée dans le viewport */
const SectionHeading = ({ index, label, count }) => {
  const { reducedMotion } = usePreferences();
  const letters = label.split('');

  return (
    <h2 className={`${styles.heading} section-heading-sticky`}>
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
      <span className={styles.index}>{index}</span>
      <span className={styles.label}>
        {reducedMotion ? (
          label
        ) : (
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            style={{ display: 'inline-block' }}
          >
            {letters.map((char, index2) => (
              <motion.span
                key={index2}
                custom={index2}
                variants={letterVariants}
                style={{ display: 'inline-block' }}
              >
                {char === ' ' ? ' ' : char}
              </motion.span>
            ))}
          </motion.span>
        )}
      </span>
      {count && <span className={styles.count}>{count}</span>}
    </h2>
  );
};

export default SectionHeading;
