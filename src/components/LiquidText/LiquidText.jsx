import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useFinePointer } from '../../hooks/useFinePointer';

const RADIUS = 90;
const STRENGTH = 18;

/* Chaque lettre s'écarte du curseur qui passe à proximité, comme une
   surface liquide. Manipulation DOM directe (hors du cycle de rendu React)
   pour rester fluide à 60fps sans re-render à chaque frame. */
const LiquidText = ({ text, className }) => {
  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const letterRefs = useRef([]);
  const frameRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  const enabled = finePointer && !reducedMotion;

  useEffect(() => {
    letterRefs.current = letterRefs.current.slice(0, text.length);
  }, [text]);

  useEffect(() => {
    if (!enabled) return undefined;

    const handleMove = (event) => {
      mouse.current = { x: event.clientX, y: event.clientY };
    };

    const tick = () => {
      letterRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - mouse.current.x;
        const dy = cy - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < RADIUS) {
          const force = (1 - dist / RADIUS) * STRENGTH;
          const angle = Math.atan2(dy, dx);
          el.style.transform = `translate(${Math.cos(angle) * force}px, ${Math.sin(angle) * force}px)`;
        } else {
          el.style.transform = '';
        }
      });
      frameRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, [enabled]);

  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          ref={(el) => {
            letterRefs.current[index] = el;
          }}
          style={{ display: 'inline-block', transition: enabled ? 'transform 0.15s ease-out' : 'none' }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  );
};

export default LiquidText;
