import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, ImageOff, Search, X } from 'lucide-react';
import TransitionLink from '../PageTransition/TransitionLink';
import { Fade } from '../Reveal/Reveal';
import Magnetic from '../Magnetic/Magnetic';
import SectionHeading from '../SectionHeading/SectionHeading';
import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';
import { usePreferences } from '../../context/preferencesContext';
import { useLanguage } from '../../context/languageContext';
import { normalize } from '../../lib/normalize';
import { localizeList } from '../../i18n/localize';
import { projectsData, projectCategories } from '../../data/projectsData';
import styles from './ProjectsIndex.module.css';

const EASE = [0.16, 1, 0.3, 1];

const ProjectsIndex = () => {
  const [category, setCategory] = useState('Tous');
  const [query, setQuery] = useState('');
  const [activeProject, setActiveProject] = useState(null);
  const [loadedThumbs, setLoadedThumbs] = useState(() => new Set());
  const { tick, reducedMotion } = usePreferences();
  const { lang, dict } = useLanguage();
  const preloaded = useRef(new Set());
  const filterRefs = useRef([]);

  const markThumbLoaded = (id) => {
    setLoadedThumbs((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  };

  /* Léger tilt 3D du panneau de preview, qui suit la position du curseur */
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 220, damping: 22 });
  const springTiltY = useSpring(tiltY, { stiffness: 220, damping: 22 });

  const handleTiltMove = (event) => {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 9);
    tiltX.set(py * -9);
  };

  const handleTiltLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const filtered = useMemo(() => {
    const byCategory = category === 'Tous' ? projectsData : projectsData.filter((p) => p.category === category);
    const localized = localizeList(byCategory, lang);
    const q = normalize(query.trim());
    if (!q) return localized;
    return localized.filter(
      (p) =>
        normalize(p.title).includes(q) ||
        normalize(p.subtitle).includes(q) ||
        p.techs.some((t) => normalize(t).includes(q))
    );
  }, [category, query, lang]);

  const counts = useMemo(() => {
    const map = { Tous: projectsData.length };
    projectsData.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, []);

  /* Technologies les plus fréquentes, proposées comme pistes de recherche
     quand la requête ne correspond à rien */
  const topTechs = useMemo(() => {
    const counts = new Map();
    projectsData.forEach((p) => p.techs.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([t]) => t)
      .slice(0, 5);
  }, []);

  const resetFilters = () => {
    setCategory('Tous');
    setQuery('');
  };

  /* Groupe de filtres navigable au clavier comme un vrai groupe de radios :
     flèches gauche/droite (et haut/bas) déplacent la sélection et le focus */
  const selectCategory = (cat, index) => {
    setCategory(cat);
    tick();
    filterRefs.current[index]?.focus();
  };

  const handleFilterKeyDown = (event, index) => {
    const total = projectCategories.length;
    let nextIndex = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % total;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + total) % total;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = total - 1;

    if (nextIndex === null) return;
    event.preventDefault();
    selectCategory(projectCategories[nextIndex], nextIndex);
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
    <section className={`container ${styles.section}`} id="projets" aria-label={dict.projects.sectionLabel}>
      <SectionHeading index="01" label={dict.projects.sectionLabel} count={`(${String(projectsData.length).padStart(2, '0')})`} />

      <Fade delay={0.1} className={styles.toolbar}>
        <div className={styles.filters} role="radiogroup" aria-label={dict.projects.filterGroupAria}>
          {projectCategories.map((cat, index) => (
            <Magnetic key={cat} strength={0.3}>
              <button
                ref={(el) => {
                  filterRefs.current[index] = el;
                }}
                className={`${styles.filter} ${category === cat ? styles.filterActive : ''}`}
                onClick={() => selectCategory(cat, index)}
                onKeyDown={(event) => handleFilterKeyDown(event, index)}
                role="radio"
                aria-checked={category === cat}
                tabIndex={category === cat ? 0 : -1}
              >
                {dict.projects.categories[cat] || cat}
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
            placeholder={dict.projects.searchPlaceholder}
            className={styles.searchInput}
            aria-label={dict.projects.searchAria}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className={styles.searchClear}
              aria-label={dict.projects.searchClearAria}
            >
              <X size={14} strokeWidth={2} />
            </button>
          )}
        </div>
      </Fade>

      <p className="visually-hidden" role="status" aria-live="polite">
        {dict.projects.resultsStatus(filtered.length)}
      </p>

      <div className={styles.layout}>
        <motion.ul className={styles.list} onMouseLeave={() => setActiveProject(null)} layout>
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
                  className={`${styles.row} ${activeProject?.id === project.id ? styles.rowActive : ''}`}
                  data-cursor-label={dict.projects.voirLeProjet}
                  onMouseEnter={() => {
                    setActiveProject(project);
                    preloadImage(project.image);
                  }}
                  onFocus={() => {
                    setActiveProject(project);
                    preloadImage(project.image);
                  }}
                  onBlur={() => setActiveProject(null)}
                >
                  <span className={styles.rowIndex}>{String(index + 1).padStart(2, '0')}</span>

                  <span
                    className={`${styles.thumb} ${loadedThumbs.has(project.id) ? '' : 'img-skeleton'}`}
                    aria-hidden="true"
                  >
                    <ResponsiveImage
                      src={project.image}
                      alt=""
                      loading="lazy"
                      width="640"
                      height="400"
                      sizes="82px"
                      className={`img-fade ${loadedThumbs.has(project.id) ? 'img-loaded' : ''}`}
                      onLoad={() => markThumbLoaded(project.id)}
                    />
                  </span>

                  <span className={styles.rowMain}>
                    <span className={`${styles.rowTitle} ink-hover`}>{project.title}</span>
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

        {/* Panneau de preview fixe : ne suit plus le curseur, se contente de
            changer d'image selon la ligne survolée */}
        <div className={`${styles.previewPanel} print-hide`} aria-hidden="true">
          <motion.div
            className={styles.previewFrame}
            style={
              reducedMotion
                ? undefined
                : { rotateX: springTiltX, rotateY: springTiltY, transformPerspective: 800 }
            }
            onPointerMove={handleTiltMove}
            onPointerLeave={handleTiltLeave}
          >
            <AnimatePresence mode="wait">
              {activeProject ? (
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <ResponsiveImage src={activeProject.image} alt="" sizes="22rem" />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className={styles.previewEmpty}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageOff size={18} strokeWidth={1.5} />
                  {dict.projects.previewEmpty}
                </motion.div>
              )}
            </AnimatePresence>
            <span className={`${styles.peel} ${activeProject ? styles.peelActive : ''}`} />
          </motion.div>
        </div>
      </div>

      {filtered.length === 0 && (
        <Fade className={styles.empty}>
          <p>
            {query.trim() ? dict.projects.emptyWithQuery(query.trim()) : dict.projects.emptyNoQuery}
          </p>

          {query.trim() && (
            <div className={styles.suggestions}>
              {dict.projects.trySuggestions}
              {topTechs.map((t) => (
                <button key={t} onClick={() => setQuery(t)} className={styles.suggestionChip}>
                  {t}
                </button>
              ))}
            </div>
          )}

          <div className={styles.emptyActions}>
            <button onClick={resetFilters} className={styles.emptyReset}>
              {dict.projects.reset}
            </button>
          </div>
        </Fade>
      )}
    </section>
  );
};

export default ProjectsIndex;
