import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  X,
  Leaf,
  Clock,
  Plus,
  Search,
  PenTool,
  Layers,
  Rocket,
} from 'lucide-react';
import TransitionLink from '../../components/PageTransition/TransitionLink';
import { Reveal, Fade } from '../../components/Reveal/Reveal';
import { useLenis, scrollTo } from '../../components/SmoothScroll/lenisContext';
import { usePreferences } from '../../context/preferencesContext';
import useActiveSection from '../../hooks/useActiveSection';
import useFocusTrap from '../../hooks/useFocusTrap';
import { projectsData } from '../../data/projectsData';
import NotFound from '../NotFound/NotFound';
import styles from './ProjectDetail.module.css';

const WORDS_PER_MINUTE = 200;

/* Positions génériques des annotations sur l'image principale */
const ANNOTATION_POSITIONS = [
  { x: '18%', y: '24%' },
  { x: '50%', y: '74%' },
  { x: '82%', y: '30%' },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const lenis = useLenis();
  const { tick } = usePreferences();
  const [lightboxImage, setLightboxImage] = useState(null);
  const [activeAnnotation, setActiveAnnotation] = useState(null);
  const heroRef = useRef(null);
  const lightboxRef = useRef(null);

  const projectIndex = projectsData.findIndex((p) => p.id === id);
  const project = projectsData[projectIndex];
  const total = projectsData.length;
  const nextProject = projectsData[(projectIndex + 1 + total) % total];
  const prevProject = projectsData[(projectIndex - 1 + total) % total];

  /* Parallaxe douce sur l'image principale */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  /* Progression de lecture de l'étude de cas, affichée en filet fixe */
  const { scrollYProgress: readingProgress } = useScroll();

  /* Sommaire flottant : sections disponibles selon les données du projet */
  const caseSections = [
    { id: 'contexte', label: 'Contexte' },
    { id: 'solution', label: 'Solution' },
    ...(project?.architecture?.length ? [{ id: 'architecture', label: 'Architecture' }] : []),
    ...(project?.gallery?.length ? [{ id: 'galerie', label: 'Aperçus' }] : []),
    ...(project?.lighthouse ? [{ id: 'performance', label: 'Performance' }] : []),
  ];
  const caseSectionIds = caseSections.map((s) => s.id);
  const activeCaseSection = useActiveSection(caseSectionIds);

  /* Piège le focus dans la lightbox tant qu'elle est ouverte */
  useFocusTrap(lightboxRef, { active: Boolean(lightboxImage), onClose: () => setLightboxImage(null) });

  if (!project) return <NotFound />;

  const isGithub = project.link?.includes('github.com');

  /* Frise de développement : les mêmes données réelles du projet, reformulées
     en étapes de processus plutôt qu'en rubriques */
  const timelineStages = [
    { icon: Search, label: 'Recherche', text: project.problematique },
    { icon: PenTool, label: 'Conception', text: project.solution },
    ...(project.architecture?.length
      ? [
          {
            icon: Layers,
            label: 'Développement',
            text: project.architecture.map((item) => item.name).join(' · '),
          },
        ]
      : []),
    {
      icon: Rocket,
      label: 'Livraison',
      text: project.link
        ? isGithub
          ? 'Code source publié et documenté sur GitHub.'
          : 'Site mis en ligne, accessible et mesuré en production.'
        : 'Développement en cours, prochaine étape à venir.',
    },
  ];

  /* Temps de lecture estimé à partir du contenu réel de l'étude de cas */
  const wordCount = [project.problematique, project.solution, ...(project.architecture || []).map((a) => a.details)]
    .filter(Boolean)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));

  const goToSection = (sectionId) => scrollTo(lenis, `#${sectionId}`, { offset: -96 });

  return (
    <main className={styles.page} id="contenu">
      <motion.div
        className={`${styles.progressBar} print-hide`}
        style={{ scaleX: readingProgress }}
        aria-hidden="true"
      />

      <Helmet>
        <title>{`${project.title}, étude de cas de Clémentin Ly`}</title>
        <meta name="description" content={`${project.title} : ${project.subtitle}`} />
        <meta property="og:title" content={`${project.title}, étude de cas de Clémentin Ly`} />
        <meta property="og:description" content={project.subtitle} />
        <meta property="og:image" content={`https://clementin-portfolio.vercel.app${project.image}`} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="container">
        <Fade className={styles.backRow} delay={0.5} inView={false}>
          <TransitionLink to="/#projets" className={styles.backLink}>
            <ArrowLeft size={16} strokeWidth={1.75} />
            Retour aux projets
          </TransitionLink>
          <span className={styles.pageIndex}>
            {String(projectIndex + 1).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}
          </span>
        </Fade>

        <header className={styles.header}>
          <h1 className={styles.title}>
            <Reveal delay={0.6} inView={false}>
              <span>{project.title}</span>
            </Reveal>
          </h1>
          <Fade delay={0.75} inView={false}>
            <p className={`${styles.subtitle} serif`}>{project.subtitle}</p>
          </Fade>
        </header>

        <Fade delay={0.85} inView={false}>
          <dl className={styles.meta}>
            <div className={styles.metaCell}>
              <dt>Année</dt>
              <dd>{project.year}</dd>
            </div>
            <div className={styles.metaCell}>
              <dt>Rôle</dt>
              <dd>{project.role}</dd>
            </div>
            <div className={styles.metaCell}>
              <dt>Catégorie</dt>
              <dd>{project.category}</dd>
            </div>
            <div className={styles.metaCell}>
              <dt>Stack</dt>
              <dd className={styles.metaTechs}>{project.techs.join(', ')}</dd>
            </div>
            <div className={styles.metaCell}>
              <dt>Lecture</dt>
              <dd className={styles.metaReading}>
                <Clock size={13} strokeWidth={2} />
                {readingMinutes} min
              </dd>
            </div>
            <div className={styles.metaCell}>
              <dt>Lien</dt>
              <dd>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.metaLink}
                  >
                    {isGithub ? 'Voir le code' : 'Visiter le site'}
                    <ArrowUpRight size={14} strokeWidth={2} />
                  </a>
                ) : (
                  <span className={styles.inProgress}>
                    <span className={styles.pulseDot} />
                    En cours
                  </span>
                )}
              </dd>
            </div>
          </dl>
        </Fade>
      </div>

      <div className={`container ${styles.heroFrame}`} ref={heroRef}>
        <div className={styles.heroImage}>
          <motion.img src={project.image} alt={`Aperçu du projet ${project.title}`} style={{ y: parallaxY }} />

          {project.architecture?.length > 0 && (
            <div className={`${styles.annotations} print-hide`}>
              {project.architecture.slice(0, 3).map((item, index) => {
                const isActive = activeAnnotation === index;
                const position = ANNOTATION_POSITIONS[index];
                return (
                  <div
                    key={item.name}
                    className={styles.annotation}
                    style={{ left: position.x, top: position.y }}
                  >
                    <button
                      className={`${styles.annotationDot} ${isActive ? styles.annotationDotActive : ''}`}
                      onClick={() => setActiveAnnotation(isActive ? null : index)}
                      aria-expanded={isActive}
                      aria-label={`${isActive ? 'Masquer' : 'Voir'} le détail : ${item.name}`}
                    >
                      <Plus size={12} strokeWidth={2.5} />
                    </button>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className={styles.annotationCard}
                          role="note"
                          initial={{ opacity: 0, scale: 0.92, y: 6 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.92, y: 6 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <p className={styles.annotationTitle}>{item.name}</p>
                          <p className={styles.annotationText}>{item.details}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <Fade delay={0.1} className={styles.timeline}>
          <div className={`${styles.timelineTrack} print-hide`} data-lenis-prevent>
            {timelineStages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div key={stage.label} className={styles.timelineStage}>
                  <span className={styles.timelineIcon}>
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <p className={styles.timelineLabel}>{stage.label}</p>
                  <p className={styles.timelineText}>{stage.text}</p>
                </div>
              );
            })}
          </div>
        </Fade>
      </div>

      <div className="container">
        <section className={styles.caseGrid}>
          <Fade id="contexte" className={styles.caseBlock}>
            <h2 className={styles.caseHeading}>
              <span className={styles.caseIndex}>01</span>
              Contexte
            </h2>
            <p className={styles.caseText}>{project.problematique}</p>
          </Fade>

          <Fade id="solution" className={styles.caseBlock} delay={0.1}>
            <h2 className={styles.caseHeading}>
              <span className={styles.caseIndex}>02</span>
              Solution
            </h2>
            <p className={styles.caseText}>{project.solution}</p>
          </Fade>
        </section>

        {project.architecture?.length > 0 && (
          <section id="architecture" className={styles.architecture}>
            <Fade>
              <h2 className={styles.caseHeading}>
                <span className={styles.caseIndex}>03</span>
                Architecture technique
              </h2>
            </Fade>
            <ul>
              {project.architecture.map((item, index) => (
                <Fade key={item.name} delay={index * 0.08}>
                  <li className={styles.archRow}>
                    <span className={styles.archName}>{item.name}</span>
                    <span className={styles.archDetails}>{item.details}</span>
                  </li>
                </Fade>
              ))}
            </ul>
          </section>
        )}

        {project.gallery?.length > 0 && (
          <section id="galerie" className={styles.gallery}>
            <Fade>
              <h2 className={styles.caseHeading}>
                <span className={styles.caseIndex}>04</span>
                Aperçus
              </h2>
            </Fade>
            <div className={styles.galleryGrid}>
              {project.gallery.map((image, index) => (
                <Fade key={image} delay={index * 0.1}>
                  <button
                    className={styles.galleryItem}
                    onClick={() => {
                      setLightboxImage(image);
                      tick();
                    }}
                    data-cursor-label="Agrandir"
                    aria-label={`Agrandir l'aperçu ${index + 1} du projet ${project.title}`}
                  >
                    <img src={image} alt="" loading="lazy" />
                  </button>
                </Fade>
              ))}
            </div>
          </section>
        )}

        {project.lighthouse && (
          <section id="performance" className={styles.lighthouse}>
            <Fade>
              <h2 className={styles.caseHeading}>
                <span className={styles.caseIndex}>{project.gallery?.length ? '05' : '04'}</span>
                Performance mesurée
              </h2>
            </Fade>
            <ul className={styles.scores}>
              {Object.entries(project.lighthouse).map(([key, value], index) => (
                <Fade key={key} delay={index * 0.08}>
                  <li className={styles.scoreRow}>
                    <span className={styles.scoreLabel}>
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className={styles.scoreTrack}>
                      <motion.span
                        className={styles.scoreFill}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: value / 100 }}
                        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                        transition={{ duration: 1.1, delay: 0.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </span>
                    <span className={styles.scoreValue}>{value}</span>
                  </li>
                </Fade>
              ))}
            </ul>
            <Fade delay={0.2}>
              <p className={styles.ecoNote}>
                <Leaf size={18} strokeWidth={1.75} />
                Chaque projet intègre les standards de l'éco-conception : cache avancé, lazy-loading,
                formats d'images nouvelle génération et infrastructure à faible empreinte carbone.
              </p>
            </Fade>
          </section>
        )}
      </div>

      {/* Sommaire flottant : uniquement pendant la lecture de l'étude de cas,
          pour ne jamais empiéter sur le hero ou la grille méta */}
      <AnimatePresence>
        {activeCaseSection && (
          <motion.nav
            className={`${styles.toc} print-hide`}
            aria-label="Sommaire de l'étude de cas"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.3 }}
          >
            {caseSections.map((section) => (
              <button
                key={section.id}
                className={`${styles.tocItem} ${activeCaseSection === section.id ? styles.tocItemActive : ''}`}
                onClick={() => goToSection(section.id)}
              >
                <span className={styles.tocDot} />
                <span className={styles.tocLabel}>{section.label}</span>
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <div className={styles.prevNext}>
        <TransitionLink
          to={`/projet/${prevProject.id}`}
          className={`${styles.navPanel} ${styles.navPanelPrev}`}
          data-cursor-label="Voir le projet"
        >
          <div className={styles.navPanelInner}>
            <span className={styles.navPanelLabel}>
              <ArrowLeft size={14} strokeWidth={2} />
              Précédent
            </span>
            <span className={styles.navPanelTitle}>{prevProject.title}</span>
          </div>
        </TransitionLink>

        <TransitionLink
          to={`/projet/${nextProject.id}`}
          className={`${styles.navPanel} ${styles.navPanelNext}`}
          data-cursor-label="Voir le projet"
        >
          <div className={styles.navPanelInner}>
            <span className={styles.navPanelLabel}>
              Suivant
              <ArrowRight size={14} strokeWidth={2} />
            </span>
            <span className={styles.navPanelTitle}>{nextProject.title}</span>
          </div>
        </TransitionLink>
      </div>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            ref={lightboxRef}
            className={styles.lightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Aperçu agrandi"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <button
              className={styles.lightboxClose}
              onClick={() => setLightboxImage(null)}
              aria-label="Fermer l'aperçu"
            >
              <X size={28} strokeWidth={1.5} />
            </button>
            <motion.img
              src={lightboxImage}
              alt=""
              className={styles.lightboxImage}
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ProjectDetail;
