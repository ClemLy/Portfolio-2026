import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useLanguage } from '../../context/languageContext';
import styles from './About.module.css';

/* Chaque mot s'encre au fil du défilement */
const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span className={styles.word} style={{ opacity }}>
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
const MarginNote = ({ note, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const x = useTransform(progress, range, [16, 0]);

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
  const textRef = useRef(null);
  const { dict } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ['start 0.85', 'start 0.15'],
  });

  const words = dict.about.manifesto.split(' ');

  return (
    <section className={`container ${styles.section}`} id="apropos" aria-label={dict.about.sectionLabel}>
      <SectionHeading index="02" label={dict.about.sectionLabel} />

      <div className={styles.layout}>
        <p className={styles.manifesto} ref={textRef}>
          {words.map((word, index) => (
            <Word
              key={index}
              progress={scrollYProgress}
              range={[index / words.length, (index + 1) / words.length]}
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
            />
          ))}
        </dl>
      </div>
    </section>
  );
};

export default About;
