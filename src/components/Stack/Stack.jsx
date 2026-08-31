import { useLayoutEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, BadgeCheck, MoveHorizontal } from 'lucide-react';
import { Fade } from '../Reveal/Reveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useLanguage } from '../../context/languageContext';
import { usePreferences } from '../../context/preferencesContext';
import { localizeList } from '../../i18n/localize';
import { techGroups, certifications } from '../../data/techStackData';
import styles from './Stack.module.css';

const KEYBOARD_STEP = 320;

/* Rail horizontal glissable à la souris, avec inertie au relâchement.
   `x` est une motion value explicite (plutôt que laissée implicite à
   `drag`) pour pouvoir aussi la piloter au clavier : sans ça, ce rail
   n'était opérable qu'à la souris/au tactile, ce qui viole RGAA 7 /
   WCAG 2.1.1 (tout doit être utilisable au clavier) dès que son contenu
   dépasse la largeur visible. */
const Stack = () => {
  const viewportRef = useRef(null);
  const railRef = useRef(null);
  const [constraint, setConstraint] = useState(0);
  const { lang, dict } = useLanguage();
  const { reducedMotion } = usePreferences();
  const x = useMotionValue(0);

  /* Léger tilt proportionnel à la vitesse du glisser-déposer, comme des
     fiches cartonnées qu'on feuillette — se redresse dès le relâchement.
     Même principe que le skew du titre du hero à la vitesse de scroll. */
  const tilt = useMotionValue(0);
  const smoothTilt = useSpring(tilt, { stiffness: 300, damping: 28 });
  const handleDrag = (_event, info) => {
    if (reducedMotion) return;
    tilt.set(Math.max(-3, Math.min(3, info.velocity.x / 260)));
  };
  const handleDragEnd = () => tilt.set(0);

  /* Indice de glissement : intégré à la barre du titre sticky elle-même,
     pour ne jamais être recouvert lorsque le titre se fixe en haut */
  const dragHint = (
    <span className={styles.dragHint}>
      <MoveHorizontal size={13} strokeWidth={1.75} />
      {dict.stack.dragHint}
    </span>
  );

  /* Numérotation continue (01, 02…) à travers tous les groupes, calculée
     ici plutôt que via `groupIndex * tailleFixe` qui suppose (à tort) le
     même nombre de technos dans chaque groupe */
  const groupsRaw = techGroups.map((group) => ({
    ...group,
    label: dict.stack.groups[group.id] || group.label,
    technologies: localizeList(group.technologies, lang),
  }));
  const groups = groupsRaw.map((group, groupIndex) => {
    const offset = groupsRaw.slice(0, groupIndex).reduce((sum, g) => sum + g.technologies.length, 0);
    return {
      ...group,
      technologies: group.technologies.map((tech, techIndex) => ({ ...tech, stepIndex: offset + techIndex + 1 })),
    };
  });
  const certs = localizeList(certifications, lang);

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

  const handleRailKeyDown = (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const current = x.get();
    let target = current;
    if (event.key === 'ArrowRight') target = Math.max(constraint, current - KEYBOARD_STEP);
    if (event.key === 'ArrowLeft') target = Math.min(0, current + KEYBOARD_STEP);
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = constraint;
    animate(x, target, { duration: reducedMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] });
  };

  return (
    <section className={`container ${styles.section}`} id="stack" aria-label={dict.stack.sectionLabel}>
      <SectionHeading index="04" label={dict.stack.sectionLabel} count={dragHint} />

      <div
        className={styles.railViewport}
        ref={viewportRef}
        tabIndex={0}
        role="group"
        aria-label={dict.stack.railAria}
        onKeyDown={handleRailKeyDown}
      >
        <motion.div
          className={styles.rail}
          ref={railRef}
          style={{ x, rotate: smoothTilt }}
          drag="x"
          dragConstraints={{ left: constraint, right: 0 }}
          dragElastic={0.08}
          dragTransition={{ power: 0.3, timeConstant: 220 }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          {groups.map((group) => (
            <div key={group.id} className={styles.group}>
              <h3 className={styles.groupLabel}>{group.label}</h3>
              <ul>
                {group.technologies.map((tech) => (
                  <li key={tech.name} className={styles.item}>
                    <span className={styles.itemIndex}>{String(tech.stepIndex).padStart(2, '0')}</span>
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
        {certs.map((cert, index) => {
          const CertTag = cert.link ? 'a' : 'div';
          const linkProps = cert.link ? { href: cert.link, target: '_blank', rel: 'noopener noreferrer' } : {};
          return (
            <Fade key={cert.title} delay={index * 0.08} className={styles.certWrap}>
              <CertTag className={`${styles.cert} ${cert.link ? styles.certClickable : ''}`} {...linkProps}>
                <BadgeCheck size={22} strokeWidth={1.75} className={styles.certIcon} />
                <div>
                  <p className={styles.certTitle}>{cert.title}</p>
                  <p className={styles.certIssuer}>{cert.issuer}</p>
                  <p className={styles.certDescription}>{cert.description}</p>
                </div>
                {cert.link && <ArrowUpRight size={16} strokeWidth={1.75} className={styles.certArrow} />}
              </CertTag>
            </Fade>
          );
        })}
      </div>
    </section>
  );
};

export default Stack;
