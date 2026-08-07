import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, MapPin } from 'lucide-react';
import { Reveal, Fade } from '../Reveal/Reveal';
import Marquee from '../Marquee/Marquee';
import LiquidText from '../LiquidText/LiquidText';
import ScrollTypewriter from '../ScrollTypewriter/ScrollTypewriter';
import { useLenis, scrollTo } from '../SmoothScroll/lenisContext';
import { usePreferences } from '../../context/preferencesContext';
import { useLanguage } from '../../context/languageContext';
import styles from './Hero.module.css';

/* Délai d'apparition : laisse le rideau d'introduction se lever d'abord */
const INTRO_DELAY = 1.15;

const Hero = () => {
  const lenis = useLenis();
  const heroRef = useRef(null);
  const { reducedMotion } = usePreferences();
  const { dict } = useLanguage();

  /* Le trait sous "créatif & responsable" se trace au fil du défilement */
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const pathLength = useTransform(scrollYProgress, [0, 0.55], [0, 1]);

  /* Chaque bloc dérive à sa propre vitesse pendant la sortie du héros, pour
     donner une impression de plans superposés plutôt qu'un bloc figé */
  const overlineY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const bottomY = useTransform(scrollYProgress, [0, 1], [0, -128]);

  /* La typographie du titre se distord légèrement selon la vitesse de
     défilement, et se redresse dès que le scroll ralentit */
  const skew = useMotionValue(0);
  const smoothSkew = useSpring(skew, { stiffness: 320, damping: 28 });

  useEffect(() => {
    if (reducedMotion) return undefined;

    let cancelled = false;
    let unsubscribe;

    const subscribe = (attempts = 0) => {
      if (cancelled) return;
      const instance = lenis?.current;
      if (!instance) {
        if (attempts < 30) setTimeout(() => subscribe(attempts + 1), 100);
        return;
      }
      const handleScroll = ({ velocity }) => {
        const clamped = Math.max(-1, Math.min(1, velocity / 35));
        skew.set(clamped * -6);
      };
      instance.on('scroll', handleScroll);
      unsubscribe = () => instance.off('scroll', handleScroll);
    };

    subscribe();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [lenis, skew, reducedMotion]);

  const handleScrollDown = () => scrollTo(lenis, '#projets', { offset: -24 });

  return (
    <section className={styles.hero} id="accueil" ref={heroRef} aria-label={dict.hero.sectionAria}>
      <div className={`container ${styles.inner}`}>
        <motion.div style={reducedMotion ? undefined : { y: overlineY }}>
          <Fade className={styles.overline} delay={INTRO_DELAY} inView={false}>
            <span className={styles.location}>
              <MapPin size={13} strokeWidth={2} />
              {dict.hero.location}
            </span>
          </Fade>
        </motion.div>

        <motion.h1
          className={styles.title}
          style={reducedMotion ? { skewY: smoothSkew } : { skewY: smoothSkew, y: titleY }}
        >
          <Reveal delay={INTRO_DELAY} inView={false}>
            <span className={styles.line}>
              <LiquidText text={dict.hero.titleLine1} />
            </span>
          </Reveal>
          <Reveal delay={INTRO_DELAY + 0.09} inView={false}>
            <span className={`${styles.line} ${styles.outline}`}>
              <LiquidText text={dict.hero.titleLine2} />
            </span>
          </Reveal>
          <Reveal delay={INTRO_DELAY + 0.18} inView={false}>
            <span className={`${styles.line} ${styles.serifLine} serif`}>
              {dict.hero.titleLine3}
              <svg className={styles.underline} viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true">
                <motion.path
                  d="M3,12 C50,2 90,18 140,10 C190,2 230,18 280,9 C310,3 350,14 397,8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ pathLength }}
                />
              </svg>
            </span>
          </Reveal>
        </motion.h1>

        <motion.div className={styles.bottom} style={reducedMotion ? undefined : { y: bottomY }}>
          <Fade delay={INTRO_DELAY + 0.45} inView={false} className={styles.scrollHint}>
            <button onClick={handleScrollDown} className={styles.scrollButton} aria-label={dict.hero.scrollAria}>
              <motion.span
                className={styles.scrollIcon}
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown size={16} strokeWidth={1.75} />
              </motion.span>
              {dict.hero.scroll}
            </button>
          </Fade>

          <Fade delay={INTRO_DELAY + 0.4} inView={false} className={styles.intro}>
            <ScrollTypewriter text={dict.hero.intro} range={[0, 180]} />
          </Fade>
        </motion.div>
      </div>

      <Fade delay={INTRO_DELAY + 0.55} inView={false}>
        <Marquee items={dict.marquee} />
      </Fade>
    </section>
  );
};

export default Hero;
