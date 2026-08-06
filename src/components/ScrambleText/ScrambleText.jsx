import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/* Décodage progressif du texte au survol souris — purement décoratif et
   déclenché uniquement à la souris : le focus clavier ne l'active jamais,
   pour que les lecteurs d'écran ne lisent que le texte final, stable. */
const ScrambleText = ({ text, className }) => {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const scramble = () => {
    if (reducedMotion) return;
    let iteration = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return text[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );
      iteration += 0.6;
      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        setDisplay(text);
      }
    }, 32);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setDisplay(text);
  };

  return (
    <span className={className} onMouseEnter={scramble} onMouseLeave={reset}>
      {display}
    </span>
  );
};

export default ScrambleText;
