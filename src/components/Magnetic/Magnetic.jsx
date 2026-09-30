import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePreferences } from '../../context/preferencesContext';

/* Enveloppe magnétique : l'élément glisse doucement vers le curseur */
const Magnetic = ({ children, strength = 0.35, className }) => {
  const ref = useRef(null);
  const { reducedMotion } = usePreferences();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 15, mass: 0.4 });

  /* Souris uniquement : au doigt, le tap simule un mouvement sans jamais
     de sortie, et l'élément restait décalé vers le point touché */
  const handleMove = (event) => {
    if (reducedMotion || !ref.current || event.pointerType !== 'mouse') return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: 'inline-block' }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
