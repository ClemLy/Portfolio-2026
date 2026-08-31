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

/* Fondu simple avec léger décalage vertical. `as` permet de rendre l'élément
   animé directement dans le bon tag sémantique (ex: "li") plutôt que
   d'insérer un <div> intermédiaire — indispensable dans un <ul>/<ol>, où un
   <li> non-direct-enfant casse la structure de liste pour les lecteurs
   d'écran (RGAA 9.3.1 / WCAG 1.3.1). */
export const Fade = ({
  children,
  delay = 0,
  duration = 0.8,
  y = 28,
  blur = 0,
  inView = true,
  className,
  id,
  as = 'div',
}) => {
  const MotionTag = motion[as];
  /* `blur` (off par défaut) : le contenu part légèrement flou et se
     stabilise net en même temps qu'il gagne son opacité, écho du même
     "encre qui sèche" déjà utilisé dans le manifeste À propos. Géré ici
     via initial/animate déclaratifs (pas useTransform) : MotionConfig au
     niveau App neutralise déjà tout ça pour le mouvement réduit, pas
     besoin de le regérer composant par composant. */
  const initial = { opacity: 0, y, ...(blur ? { filter: `blur(${blur}px)` } : {}) };
  const target = { opacity: 1, y: 0, ...(blur ? { filter: 'blur(0px)' } : {}) };
  const animation = {
    initial,
    transition: { duration, delay, ease: EASE },
    ...(inView
      ? { whileInView: target, viewport: { once: true, margin: '0px 0px -10% 0px' } }
      : { animate: target }),
  };

  return (
    <MotionTag id={id} className={className} {...animation}>
      {children}
    </MotionTag>
  );
};

const inkWordVariants = {
  hidden: { opacity: 0.55, filter: 'blur(4px)' },
  visible: (i) => ({
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, delay: i * 0.014, ease: EASE },
  }),
};

/* Paragraphe qui s'encre mot par mot à l'entrée dans le viewport — même
   principe que le manifeste À propos (flou → net, opacité → 1), mais en
   simple stagger déclenché une fois plutôt qu'un pin scroll-jacké : pour
   des paragraphes plus courts (études de cas) où ce moment plus long ne
   se justifie pas. 0.55 est le même minimum calibré ≥ 3:1 sur --paper
   pour du texte large (voir About.jsx) — jamais illisible en cours de
   révélation, pas seulement à l'état initial. */
export const InkText = ({ text, className, as = 'p' }) => {
  const MotionTag = motion[as];
  const words = text.split(' ');
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {words.map((word, i) => (
        <motion.span key={i} custom={i} variants={inkWordVariants} style={{ display: 'inline-block' }}>
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </MotionTag>
  );
};
