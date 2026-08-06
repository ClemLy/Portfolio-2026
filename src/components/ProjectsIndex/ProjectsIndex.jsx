import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Search, X } from 'lucide-react';
import TransitionLink from '../PageTransition/TransitionLink';
import { Fade } from '../Reveal/Reveal';
import Magnetic from '../Magnetic/Magnetic';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useFinePointer } from '../../hooks/useFinePointer';
import { usePreferences } from '../../context/preferencesContext';
import { normalize } from '../../lib/normalize';
import { projectsData, projectCategories } from '../../data/projectsData';
import styles from './ProjectsIndex.module.css';

const EASE = [0.16, 1, 0.3, 1];

const ProjectsIndex = () => {
  const [category, setCategory] = useState('Tous');
  const [query, setQuery] = useState('');
  const [activeProject, setActiveProject] = useState(null);
  const finePointer = useFinePointer();
  const { tick } = usePreferences();
  const lastX = useRef(0);
  const preloaded = useRef(new Set());

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const previewX = useSpring(x, { stiffness: 160, damping: 20, mass: 0.6 });
  const previewY = useSpring(y, { stiffness: 160, damping: 20, mass: 0.6 });
  const previewRotate = useSpring(rotate, { stiffness: 120, damping: 18 });

  const filtered = useMemo(() => {
    const byCategory = category === 'Tous' ? projectsData : projectsData.filter((p) => p.category === category);
    const q = normalize(query.trim());
    if (!q) return byCategory;
    return byCategory.filter(
      (p) =>
        normalize(p.title).includes(q) ||
        normalize(p.subtitle).includes(q) ||
        p.techs.some((t) => normalize(t).includes(q))
    );
  }, [category, query]);

  const counts = useMemo(() => {
    const map = { Tous: projectsData.length };
    projectsData.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, []);

  const resetFilters = () => {
    setCategory('Tous');
    setQuery('');
  };

  /* La preview suit le curseur avec une légère inclinaison selon la vitesse */
  const handleMouseMove = (event) => {
    x.set(event.clientX);
    y.set(event.clientY);
    const delta = event.clientX - lastX.current;
    lastX.current = event.clientX;
    rotate.set(Math.max(-10, Math.min(10, delta * 0.5)));
  };

  /* Réchauffe le cache HTTP dès le survol/focus pour un affichage instantané
     de l'image sur la page projet, y compris pour la navigation clavier */
  const preloadImage = (src) => {
    if (preloaded.current.has(src)) return;
    preloaded.current.add(src);
    const img = new Image();
    img.src = src;
  };

  return (
    <section className={`container ${styles.section}`} id="projets" aria-label="Projets sélectionnés">
      <SectionHeading index="01" label="Projets sélectionnés" count={`(${String(projectsData.length).padStart(2, '0')})`} />

      <Fade delay={0.1} className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="Filtrer les projets par catégorie">
          {projectCategories.map((cat) => (
            <Magnetic key={cat} strength={0.3}>
              <button
                className={`${styles.filter} ${category === cat ? styles.filterActive : ''}`}
                onClick={() => {
                  setCategory(cat);
                  tick();
                }}
                aria-pressed={category === cat}
              >
                {cat}
                <sup>{counts[cat] || 0}</sup>
              </button>
            </Magnetic>
          ))}
        </div>

        <div className={styles.search}>
          <Search size={16} strokeWidth={1.75} className={styles.searchIcon} />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un projet, une techno…"
            className={styles.searchInput}
            aria-label="Rechercher un projet"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className={styles.searchClear}
              aria-label="Effacer la recherche"
            >
              <X size={14} strokeWidth={2} />
            </button>
          )}
        </div>
      </Fade>

      <p className="visually-hidden" role="status" aria-live="polite">
        {filtered.length} projet{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''}
      </p>

      <motion.ul
        className={styles.list}
        onMouseMove={finePointer ? handleMouseMove : undefined}
        onMouseLeave={() => setActiveProject(null)}
        layout
      >
        <AnimatePresence initial={false} mode="popLayout">
          {filtered.map((project, index) => (
            <motion.li
              key={project.id}
              layout
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <TransitionLink
                to={`/projet/${project.id}`}
                className={styles.row}
                data-cursor-label="Voir le projet"
                onMouseEnter={() => {
                  setActiveProject(project);
                  preloadImage(project.image);
                }}
                onMouseLeave={() => setActiveProject(null)}
                onFocus={() => preloadImage(project.image)}
              >
                <span className={styles.rowIndex}>{String(index + 1).padStart(2, '0')}</span>

                <span className={styles.thumb} aria-hidden="true">
                  <img src={project.image} alt="" loading="lazy" width="640" height="400" />
                </span>

                <span className={styles.rowMain}>
                  <span className={styles.rowTitle}>{project.title}</span>
                  <span className={styles.rowSubtitle}>{project.subtitle}</span>
                </span>

                <span className={styles.rowMeta}>
                  <span className={styles.rowCategory}>{project.category}</span>
                  <span className={styles.rowYear}>{project.year}</span>
                </span>

                <span className={styles.rowArrow}>
                  <ArrowUpRight size={28} strokeWidth={1.5} />
                </span>
              </TransitionLink>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {filtered.length === 0 && (
        <Fade className={styles.empty}>
          <p>
            Aucun projet ne correspond {query.trim() ? <>à « {query.trim()} »</> : 'à ces filtres'}.
          </p>
          <button onClick={resetFilters} className={styles.emptyReset}>
            Réinitialiser
          </button>
        </Fade>
      )}

      {/* Preview flottante : uniquement pour les pointeurs précis */}
      {finePointer && (
        <motion.div
          className={`${styles.preview} print-hide`}
          style={{ x: previewX, y: previewY, rotate: previewRotate }}
          animate={{
            scale: activeProject ? 1 : 0.6,
            opacity: activeProject ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: EASE }}
          aria-hidden="true"
        >
          <AnimatePresence mode="popLayout">
            {activeProject && (
              <motion.img
                key={activeProject.id}
                src={activeProject.image}
                alt=""
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            )}
          </AnimatePresence>
          <motion.span
            className={styles.peel}
            initial={{ rotate: -35, opacity: 0 }}
            animate={{
              rotate: activeProject ? 0 : -35,
              opacity: activeProject ? 1 : 0,
            }}
            transition={{ duration: 0.45, delay: activeProject ? 0.18 : 0, ease: EASE }}
          />
        </motion.div>
      )}
    </section>
  );
};

export default ProjectsIndex;
