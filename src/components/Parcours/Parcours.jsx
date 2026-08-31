import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Fade } from '../Reveal/Reveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useLanguage } from '../../context/languageContext';
import { usePreferences } from '../../context/preferencesContext';
import { localizeList } from '../../i18n/localize';
import { parcoursData } from '../../data/parcoursData';
import styles from './Parcours.module.css';

/* Plage affichée dans l'en-tête de section : de la première année du
   parcours à la borne la plus récente (ou "aujourd'hui" si une étape
   est encore en cours), calculée depuis les données plutôt que figée
   en dur pour ne pas se désynchroniser à chaque nouvelle étape. */
const getRangeLabel = (todayLabel) => {
  const startYear = Math.min(...parcoursData.map((step) => Number(step.year)));
  const hasOngoing = parcoursData.some((step) => step.ongoing);
  if (hasOngoing) return `${startYear} — ${todayLabel}`;
  const endYear = Math.max(...parcoursData.map((step) => Number(step.yearEnd || step.year)));
  return `${startYear} — ${endYear}`;
};

const Parcours = () => {
  const { lang, dict } = useLanguage();
  const { reducedMotion } = usePreferences();
  /* Du plus récent au plus ancien : l'étape en cours ouvre la chronologie */
  const steps = [...localizeList(parcoursData, lang)].reverse();

  return (
    <section className={`container ${styles.section}`} id="parcours" aria-label={dict.parcours.sectionLabel}>
      <SectionHeading index="03" label={dict.parcours.sectionLabel} count={getRangeLabel(dict.parcours.today)} />

      <div className={styles.timelineWrap}>
        <span className={styles.scrollCue} aria-hidden="true">
          <motion.span
            className={styles.scrollCueIcon}
            animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} strokeWidth={1.75} />
          </motion.span>
        </span>
        <ol className={styles.list}>
        {steps.map((step, index) => (
          <Fade key={step.id} as="li" className={styles.row} delay={index * 0.07}>
            <span className={styles.year}>
              {step.year}
              {(step.yearEnd || step.ongoing) && (
                <span className={styles.yearEnd}>
                  → {step.ongoing ? dict.parcours.today : step.yearEnd}
                </span>
              )}
            </span>
            <div className={styles.main}>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.description}>{step.description}</p>
            </div>
            <ul className={styles.tags} aria-label={dict.parcours.skillsAria}>
              {step.tags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </Fade>
        ))}
        </ol>
      </div>
    </section>
  );
};

export default Parcours;
