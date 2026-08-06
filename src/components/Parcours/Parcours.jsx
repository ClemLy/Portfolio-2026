import { Fade } from '../Reveal/Reveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import { parcoursData } from '../../data/parcoursData';
import styles from './Parcours.module.css';

const Parcours = () => (
  <section className={`container ${styles.section}`} id="parcours" aria-label="Parcours">
    <SectionHeading index="03" label="Parcours" count="2022, 2026" />

    <ol className={styles.list}>
      {parcoursData.map((step, index) => (
        <Fade key={step.id} delay={index * 0.07}>
          <li className={styles.row}>
            <span className={styles.year}>{step.year}</span>
            <div className={styles.main}>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.description}>{step.description}</p>
            </div>
            <ul className={styles.tags} aria-label="Compétences clés">
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

export default Parcours;
