import { Fade } from '../Reveal/Reveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useLanguage } from '../../context/languageContext';
import { localizeList } from '../../i18n/localize';
import { parcoursData } from '../../data/parcoursData';
import styles from './Parcours.module.css';

const Parcours = () => {
  const { lang, dict } = useLanguage();
  const steps = localizeList(parcoursData, lang);

  return (
    <section className={`container ${styles.section}`} id="parcours" aria-label={dict.parcours.sectionLabel}>
      <SectionHeading index="03" label={dict.parcours.sectionLabel} count="2022, 2026" />

      <ol className={styles.list}>
        {steps.map((step, index) => (
          <Fade key={step.id} delay={index * 0.07}>
            <li className={styles.row}>
              <span className={styles.year}>{step.year}</span>
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
