import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, MoveHorizontal } from 'lucide-react';
import { Fade } from '../Reveal/Reveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import { techGroups, certifications } from '../../data/techStackData';
import styles from './Stack.module.css';

/* Indice de glissement : intégré à la barre du titre sticky elle-même,
   pour ne jamais être recouvert lorsque le titre se fixe en haut */
const dragHint = (
  <span className={styles.dragHint}>
    <MoveHorizontal size={13} strokeWidth={1.75} />
    Glisser pour explorer
  </span>
);

/* Rail horizontal glissable à la souris, avec inertie au relâchement */
const Stack = () => {
  const viewportRef = useRef(null);
  const railRef = useRef(null);
  const [constraint, setConstraint] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!viewportRef.current || !railRef.current) return;
      const overflow = railRef.current.scrollWidth - viewportRef.current.clientWidth;
      setConstraint(overflow > 0 ? -overflow : 0);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section className={`container ${styles.section}`} id="stack" aria-label="Stack technique">
      <SectionHeading index="04" label="Stack & outils" count={dragHint} />

      <div className={styles.railViewport} ref={viewportRef}>
        <motion.div
          className={styles.rail}
          ref={railRef}
          drag="x"
          dragConstraints={{ left: constraint, right: 0 }}
          dragElastic={0.08}
          dragTransition={{ power: 0.3, timeConstant: 220 }}
        >
          {techGroups.map((group, groupIndex) => (
            <div key={group.id} className={styles.group}>
              <h3 className={styles.groupLabel}>{group.label}</h3>
              <ul>
                {group.technologies.map((tech, techIndex) => (
                  <li key={tech.name} className={styles.item}>
                    <span className={styles.itemIndex}>
                      {String(groupIndex * 4 + techIndex + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className={styles.itemName}>{tech.name}</p>
                      <p className={styles.itemDescription}>{tech.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>

      <div className={styles.certs}>
        {certifications.map((cert, index) => (
          <Fade key={cert.title} delay={index * 0.08} className={styles.cert}>
            <BadgeCheck size={22} strokeWidth={1.75} className={styles.certIcon} />
            <div>
              <p className={styles.certTitle}>{cert.title}</p>
              <p className={styles.certIssuer}>{cert.issuer}</p>
              <p className={styles.certDescription}>{cert.description}</p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
};

export default Stack;
