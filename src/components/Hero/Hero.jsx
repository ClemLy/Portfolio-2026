import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, MapPin } from 'lucide-react';
import { Reveal, Fade } from '../Reveal/Reveal';
import Marquee from '../Marquee/Marquee';
import LiquidText from '../LiquidText/LiquidText';
import ScrollTypewriter from '../ScrollTypewriter/ScrollTypewriter';
import { heroMarqueeItems } from '../../data/techStackData';
import { useLenis, scrollTo } from '../SmoothScroll/lenisContext';
import styles from './Hero.module.css';

/* Délai d'apparition : laisse le rideau d'introduction se lever d'abord */
const INTRO_DELAY = 1.15;
const INTRO_TEXT =
  "De l'e-commerce WordPress aux applications React Native, je conçois des expériences web rapides, accessibles et sobres, pensées pour durer.";

const Hero = () => {
  const lenis = useLenis();
  const heroRef = useRef(null);
  const reducedMotion = useReducedMotion();

  /* Le trait sous "créatif & responsable" se trace au fil du défilement */
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const pathLength = useTransform(scrollYProgress, [0, 0.55], [0, 1]);

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
    <section className={styles.hero} id="accueil" ref={heroRef} aria-label="Introduction">
      <div className={`container ${styles.inner}`}>
        <Fade className={styles.overline} delay={INTRO_DELAY} inView={false}>
          <span className={styles.location}>
            <MapPin size={13} strokeWidth={2} />
            Basé à Paris, France
          </span>
        </Fade>

        <motion.h1 className={styles.title} style={{ skewY: smoothSkew }}>
          <Reveal delay={INTRO_DELAY} inView={false}>
            <span className={styles.line}>
              <LiquidText text="Développeur" />
            </span>
          </Reveal>
          <Reveal delay={INTRO_DELAY + 0.09} inView={false}>
            <span className={`${styles.line} ${styles.outline}`}>
              <LiquidText text="full-stack" />
            </span>
          </Reveal>
          <Reveal delay={INTRO_DELAY + 0.18} inView={false}>
            <span className={`${styles.line} ${styles.serifLine} serif`}>
              créatif &amp; responsable
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

        <div className={styles.bottom}>
          <Fade delay={INTRO_DELAY + 0.45} inView={false} className={styles.scrollHint}>
            <button onClick={handleScrollDown} className={styles.scrollButton} aria-label="Défiler vers les projets">
              <motion.span
                className={styles.scrollIcon}
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown size={16} strokeWidth={1.75} />
              </motion.span>
              Défiler
            </button>
          </Fade>

          <Fade delay={INTRO_DELAY + 0.4} inView={false} className={styles.intro}>
            <ScrollTypewriter text={INTRO_TEXT} range={[0, 180]} />
          </Fade>
        </div>
      </div>

      <Fade delay={INTRO_DELAY + 0.55} inView={false}>
        <Marquee items={heroMarqueeItems} />
      </Fade>
    </section>
  );
};

export default Hero;
