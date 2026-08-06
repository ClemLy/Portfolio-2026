import { motion } from 'framer-motion';
import styles from './Reveal.module.css';

const EASE = [0.16, 1, 0.3, 1];

/* Révélation par masque : le contenu monte depuis un cadre invisible.
   L'observation se fait sur le masque (jamais clippé) et le variant se
   propage au span interne, sinon whileInView ne se déclencherait jamais.
   inView=false anime dès le montage (utile pour le hero). */
export const Reveal = ({ children, delay = 0, duration = 1, inView = true, className }) => {
  const innerVariants = {
    hidden: { y: '115%' },
    visible: { y: '0%', transition: { duration, delay, ease: EASE } },
  };

  const trigger = inView
    ? { whileInView: 'visible', viewport: { once: true, margin: '0px 0px -12% 0px' } }
    : { animate: 'visible' };

  return (
    <motion.span className={`${styles.mask} ${className || ''}`} initial="hidden" {...trigger}>
      <motion.span className={styles.inner} variants={innerVariants}>
        {children}
      </motion.span>
    </motion.span>
  );
};

/* Fondu simple avec léger décalage vertical */
export const Fade = ({ children, delay = 0, duration = 0.8, y = 28, inView = true, className, id }) => {
  const animation = {
    initial: { opacity: 0, y },
    transition: { duration, delay, ease: EASE },
    ...(inView
      ? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '0px 0px -10% 0px' } }
      : { animate: { opacity: 1, y: 0 } }),
  };

  return (
    <motion.div id={id} className={className} {...animation}>
      {children}
    </motion.div>
  );
};
