import { Fade } from '../Reveal/Reveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useLanguage } from '../../context/languageContext';
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
  const steps = localizeList(parcoursData, lang);

  return (
    <section className={`container ${styles.section}`} id="parcours" aria-label={dict.parcours.sectionLabel}>
      <SectionHeading index="03" label={dict.parcours.sectionLabel} count={getRangeLabel(dict.parcours.today)} />

      <ol className={styles.list}>
        {steps.map((step, index) => (
          <Fade key={step.id} delay={index * 0.07}>
            <li className={styles.row}>
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
            </li>
          </Fade>
        ))}
      </ol>
    </section>
  );
};

export default Parcours;
