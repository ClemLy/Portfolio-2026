import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useLanguage } from '../../context/languageContext';
import { usePreferences } from '../../context/preferencesContext';
import styles from './About.module.css';

/* Chaque mot s'encre au fil du défilement : il part légèrement flou (encre
   pas encore sèche) et se stabilise net en même temps qu'il gagne son
   opacité pleine. Le point de départ de l'opacité (0.55) n'est pas
   arbitraire : c'est le minimum qui garantit encore un contraste ≥ 3:1
   (texte large) sur --paper — en dessous, les mots en cours de lecture
   deviennent illisibles pendant le défilement normal, pas seulement à
   l'état initial. Avec le mouvement réduit, l'animation est désactivée :
   le texte est directement net et à pleine opacité (WCAG 2.3.3 / RGAA 13.3). */
const Word = ({ children, progress, range, reducedMotion }) => {
  const opacity = useTransform(progress, range, reducedMotion ? [1, 1] : [0.55, 1]);
  const blurPx = useTransform(progress, range, reducedMotion ? [0, 0] : [5, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  return (
    <motion.span className={styles.word} style={{ opacity, filter }}>
      {children}
    </motion.span>
  );
};

/* Compte de 0 jusqu'à la valeur cible dès l'entrée dans le viewport */
const Counter = ({ to }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => String(Math.round(v)).padStart(2, '0'));

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(count, to, { duration: 1.4, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [inView, to, count]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

/* Note en marge : apparaît au fil du défilement, comme une annotation
   manuscrite qui accompagnerait la lecture du manifeste */
const MarginNote = ({ note, progress, range, reducedMotion }) => {
  const opacity = useTransform(progress, range, reducedMotion ? [1, 1] : [0, 1]);
  const x = useTransform(progress, range, reducedMotion ? [0, 0] : [16, 0]);

  return (
    <motion.div className={styles.note} style={{ opacity, x }}>
      <dt className={styles.noteLabel}>{note.label}</dt>
      <dd className={styles.noteValue}>
        <Counter to={note.value} />
        <span className={styles.noteMark}>*</span>
      </dd>
    </motion.div>
  );
};

const About = () => {
  const stageRef = useRef(null);
  const { dict } = useLanguage();
  const { reducedMotion } = usePreferences();

  /* Le texte reste fixé à l'écran (position: sticky sur .pinWrap) pendant
     que .scrollStage — bien plus haute que l'écran — défile derrière lui.
     scrollYProgress avance donc sur toute cette course, pas seulement sur
     la hauteur naturelle du paragraphe : la lecture prend le temps du
     scroll plutôt qu'un simple fondu croisé qu'on peut rater. Avec le
     mouvement réduit, .scrollStage retrouve une hauteur normale (voir CSS)
     et ce mécanisme de fixation n'a simplement plus rien à faire. */
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  });

  const words = dict.about.manifesto.split(' ');

  return (
    <section className={`container ${styles.section}`} id="apropos" aria-label={dict.about.sectionLabel}>
      <div
        ref={stageRef}
        className={`${styles.scrollStage} ${reducedMotion ? styles.scrollStageStatic : ''}`}
      >
        <div className={styles.pinWrap}>
          <div className={styles.headingSlot}>
            <SectionHeading index="02" label={dict.about.sectionLabel} />
          </div>

          <div className={styles.layout}>
            <p className={styles.manifesto}>
              {words.map((word, index) => (
                <Word
                  key={index}
                  progress={scrollYProgress}
                  range={[index / words.length, (index + 1) / words.length]}
                  reducedMotion={reducedMotion}
                >
                  {word}{' '}
                </Word>
              ))}
            </p>

            <dl className={styles.margin}>
              {dict.about.notes.map((note, index) => (
                <MarginNote
                  key={note.label}
                  note={note}
                  progress={scrollYProgress}
                  range={[(index / dict.about.notes.length) * 0.85, (index / dict.about.notes.length) * 0.85 + 0.22]}
                  reducedMotion={reducedMotion}
                />
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
