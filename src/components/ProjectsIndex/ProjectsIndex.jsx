import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, LayoutGrid, LayoutList, Search, X } from 'lucide-react';
import TransitionLink from '../PageTransition/TransitionLink';
import { Fade } from '../Reveal/Reveal';
import Magnetic from '../Magnetic/Magnetic';
import SectionHeading from '../SectionHeading/SectionHeading';
import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';
import { usePreferences } from '../../context/preferencesContext';
import { useLanguage } from '../../context/languageContext';
import { normalize } from '../../lib/normalize';
import { localizeList } from '../../i18n/localize';
import { projectsData, projectCategories, projectTypes } from '../../data/projectsData';
import styles from './ProjectsIndex.module.css';

const EASE = [0.16, 1, 0.3, 1];
const INITIAL_VISIBLE = 6;

/* Familles de stack pour le filtre par techno (ligne 2 de la toolbar) :
   des groupes larges plutôt que chaque tag brut (WordPress/Divi/Flatsome/...
   seraient trop fins pour être utiles en un clic) */
const JS_ECOSYSTEM = new Set([
  'JavaScript',
  'TypeScript',
  'React Native',
  'React Three Fiber',
  'Next.js',
  'Node.js',
  'Express',
  'GSAP',
  'Three.js',
  'Expo',
  'FullCalendar',
]);

const TECH_GROUPS = [
  { label: 'WordPress', match: (techs) => techs.includes('WordPress') },
  { label: 'JavaScript', match: (techs) => techs.some((t) => JS_ECOSYSTEM.has(t)) },
  { label: 'PHP', match: (techs) => techs.includes('PHP') },
];

/* Navigation clavier façon groupe de radios (flèches/Home/End), partagée
   entre le filtre catégorie et le filtre type */
const getRovingNextIndex = (key, index, total) => {
  if (key === 'ArrowRight' || key === 'ArrowDown') return (index + 1) % total;
  if (key === 'ArrowLeft' || key === 'ArrowUp') return (index - 1 + total) % total;
  if (key === 'Home') return 0;
  if (key === 'End') return total - 1;
  return null;
};

const ProjectsIndex = () => {
  const [category, setCategory] = useState('Tous');
  const [projectType, setProjectType] = useState('Tous');
  const [activeTechs, setActiveTechs] = useState(() => new Set());
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [activeProject, setActiveProject] = useState(null);
  const [loadedThumbs, setLoadedThumbs] = useState(() => new Set());
  const { tick } = usePreferences();
  const { lang, dict } = useLanguage();
  const preloaded = useRef(new Set());
  const filterRefs = useRef([]);
  const typeRefs = useRef([]);

  const markThumbLoaded = (id) => {
    setLoadedThumbs((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  };

  const filtered = useMemo(() => {
    let list = category === 'Tous' ? projectsData : projectsData.filter((p) => p.category === category);
    if (projectType !== 'Tous') list = list.filter((p) => p.type === projectType);
    if (activeTechs.size > 0) {
      list = list.filter((p) =>
        Array.from(activeTechs).every((group) => {
          const groupDef = TECH_GROUPS.find((g) => g.label === group);
          return groupDef ? groupDef.match(p.techs) : false;
        })
      );
    }
    const localized = localizeList(list, lang);
    const q = normalize(query.trim());
    if (!q) return localized;
    return localized.filter(
      (p) =>
        normalize(p.title).includes(q) ||
        normalize(p.subtitle).includes(q) ||
        p.techs.some((t) => normalize(t).includes(q))
    );
  }, [category, projectType, activeTechs, query, lang]);

  /* Revient à la page initiale dès qu'une dimension de filtre change.
     Ajustement d'état pendant le rendu (pattern React recommandé pour
     réinitialiser un state dérivé de props/inputs qui changent), plutôt
     qu'un effect qui déclencherait un second rendu en cascade. */
  const filterSignature = `${category}|${projectType}|${Array.from(activeTechs).sort().join(',')}|${query}`;
  const [prevFilterSignature, setPrevFilterSignature] = useState(filterSignature);
  if (filterSignature !== prevFilterSignature) {
    setPrevFilterSignature(filterSignature);
    setVisibleCount(INITIAL_VISIBLE);
  }

  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const hasMore = visibleCount < filtered.length;

  const counts = useMemo(() => {
    const map = { Tous: projectsData.length };
    projectsData.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, []);

  /* Technologies les plus fréquentes, proposées comme pistes de recherche
     quand la requête ne correspond à rien (indépendant des chips de
     famille de stack de la toolbar) */
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
    setProjectType('Tous');
    setActiveTechs(new Set());
    setQuery('');
  };

  const toggleTech = (tech) => {
    setActiveTechs((prev) => {
      const next = new Set(prev);
      if (next.has(tech)) next.delete(tech);
      else next.add(tech);
      return next;
    });
    tick();
  };

  /* Groupes de filtres navigables au clavier comme de vrais groupes de
     radios : flèches (et Home/End) déplacent la sélection et le focus */
  const selectCategory = (cat, index) => {
    setCategory(cat);
    tick();
    filterRefs.current[index]?.focus();
  };

  const handleFilterKeyDown = (event, index) => {
    const nextIndex = getRovingNextIndex(event.key, index, projectCategories.length);
    if (nextIndex === null) return;
    event.preventDefault();
    selectCategory(projectCategories[nextIndex], nextIndex);
  };

  const selectType = (type, index) => {
    setProjectType(type);
    tick();
    typeRefs.current[index]?.focus();
  };

  const handleTypeKeyDown = (event, index) => {
    const nextIndex = getRovingNextIndex(event.key, index, projectTypes.length);
    if (nextIndex === null) return;
    event.preventDefault();
    selectType(projectTypes[nextIndex], nextIndex);
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
        <div className={styles.toolbarPrimary}>
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

          <div className={styles.toolbarPrimaryRight}>
            <div className={styles.typeToggle} role="radiogroup" aria-label={dict.projects.typeGroupAria}>
              {projectTypes.map((type, index) => (
                <button
                  key={type}
                  ref={(el) => {
                    typeRefs.current[index] = el;
                  }}
                  className={`${styles.typeButton} ${projectType === type ? styles.typeActive : ''}`}
                  onClick={() => selectType(type, index)}
                  onKeyDown={(event) => handleTypeKeyDown(event, index)}
                  role="radio"
                  aria-checked={projectType === type}
                  tabIndex={projectType === type ? 0 : -1}
                >
                  {dict.projects.types[type] || type}
                </button>
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
          </div>
        </div>

        <div className={styles.toolbarSecondary}>
          <div className={styles.techChips} role="group" aria-label={dict.projects.techFilterAria}>
            {TECH_GROUPS.map(({ label }) => (
              <button
                key={label}
                className={`${styles.techChip} ${activeTechs.has(label) ? styles.techChipActive : ''}`}
                aria-pressed={activeTechs.has(label)}
                onClick={() => toggleTech(label)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className={styles.viewToggle} role="group" aria-label={dict.projects.viewToggleAria}>
            <button
              className={viewMode === 'list' ? styles.viewActive : ''}
              aria-pressed={viewMode === 'list'}
              aria-label={dict.projects.viewList}
              onClick={() => setViewMode('list')}
            >
              <LayoutList size={16} strokeWidth={1.75} />
            </button>
            <button
              className={viewMode === 'grid' ? styles.viewActive : ''}
              aria-pressed={viewMode === 'grid'}
              aria-label={dict.projects.viewGrid}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid size={16} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </Fade>

      <p className="visually-hidden" role="status" aria-live="polite">
        {dict.projects.resultsStatus(filtered.length)}
      </p>

      {viewMode === 'list' ? (
        <motion.ul className={styles.list} layout>
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((project, index) => (
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
                  onMouseLeave={() => setActiveProject(null)}
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
                      sizes="(min-width: 900px) 160px, 96px"
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
      ) : (
        <div className={styles.gridLayout}>
          <motion.ul className={styles.grid} layout>
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((project) => (
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
                    className={styles.gridCard}
                    data-cursor-label={dict.projects.voirLeProjet}
                    onMouseEnter={() => preloadImage(project.image)}
                    onFocus={() => preloadImage(project.image)}
                  >
                    <span
                      className={`${styles.gridImage} ${loadedThumbs.has(project.id) ? '' : 'img-skeleton'}`}
                      aria-hidden="true"
                    >
                      <ResponsiveImage
                        src={project.image}
                        alt=""
                        loading="lazy"
                        width="640"
                        height="400"
                        sizes="(min-width: 900px) 33vw, 100vw"
                        className={`img-fade ${loadedThumbs.has(project.id) ? 'img-loaded' : ''}`}
                        onLoad={() => markThumbLoaded(project.id)}
                      />
                      <span className={styles.gridArrow}>
                        <ArrowUpRight size={18} strokeWidth={1.5} />
                      </span>
                    </span>

                    <span className={styles.gridMeta}>
                      <span className={`${styles.gridTitle} ink-hover`}>{project.title}</span>
                      <span className={styles.gridSub}>
                        <span>{project.category}</span>
                        <span>{project.year}</span>
                      </span>
                    </span>
                  </TransitionLink>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      )}

      {hasMore && (
        <AnimatePresence>
          <motion.div
            key="load-more"
            className={styles.loadMoreWrap}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className={styles.loadMore} onClick={() => setVisibleCount((c) => c + INITIAL_VISIBLE)}>
              {dict.projects.loadMore}
              <span className={styles.loadMoreCount}>+{filtered.length - visibleCount}</span>
            </button>
          </motion.div>
        </AnimatePresence>
      )}

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
