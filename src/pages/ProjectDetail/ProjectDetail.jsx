import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, X, Leaf } from 'lucide-react';
import TransitionLink from '../../components/PageTransition/TransitionLink';
import { Reveal, Fade, InkText } from '../../components/Reveal/Reveal';
import { useLenis, scrollTo } from '../../components/SmoothScroll/lenisContext';
import { usePreferences } from '../../context/preferencesContext';
import { useLanguage } from '../../context/languageContext';
import useActiveSection from '../../hooks/useActiveSection';
import useFocusTrap from '../../hooks/useFocusTrap';
import useSpotlight from '../../hooks/useSpotlight';
import { projectsData } from '../../data/projectsData';
import { localize } from '../../i18n/localize';
import ResponsiveImage from '../../components/ResponsiveImage/ResponsiveImage';
import NotFound from '../NotFound/NotFound';
import styles from './ProjectDetail.module.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const lenis = useLenis();
  const { tick, pageTurn } = usePreferences();
  const { lang, dict } = useLanguage();
  const pd = dict.projectDetail;
  const [lightboxImage, setLightboxImage] = useState(null);
  const [loadedHeroes, setLoadedHeroes] = useState(() => new Set());
  const heroRef = useRef(null);
  const lightboxRef = useRef(null);
  const handleSpotlight = useSpotlight();

  const projectIndex = projectsData.findIndex((p) => p.id === id);
  const rawProject = projectsData[projectIndex];
  const project = localize(rawProject, lang);
  const total = projectsData.length;
  const nextProject = localize(projectsData[(projectIndex + 1 + total) % total], lang);
  const prevProject = localize(projectsData[(projectIndex - 1 + total) % total], lang);

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
    { id: 'contexte', label: pd.contexte },
    { id: 'solution', label: pd.solution },
    ...(project?.architecture?.length ? [{ id: 'architecture', label: pd.architectureTechnique }] : []),
    ...(project?.gallery?.length ? [{ id: 'galerie', label: pd.apercus }] : []),
    ...(project?.lighthouse ? [{ id: 'performance', label: pd.performanceMesuree }] : []),
  ];
  const caseSectionIds = caseSections.map((s) => s.id);
  const activeCaseSection = useActiveSection(caseSectionIds);

  /* Piège le focus dans la lightbox tant qu'elle est ouverte */
  useFocusTrap(lightboxRef, { active: Boolean(lightboxImage), onClose: () => setLightboxImage(null) });

  if (!rawProject) return <NotFound />;

  const isGithub = project.link?.includes('github.com');

  const goToSection = (sectionId) => scrollTo(lenis, `#${sectionId}`, { offset: -96 });

  return (
    <main className={styles.page} id="contenu" tabIndex={-1}>
      <motion.div
        className={`${styles.progressBar} print-hide`}
        style={{ scaleX: readingProgress }}
        aria-hidden="true"
      />

      <Helmet>
        <html lang={lang} />
        <title>{pd.etudeDeCas(project.title)}</title>
        <meta name="description" content={`${project.title} : ${project.subtitle}`} />
        <link rel="canonical" href={`https://clementin-portfolio.vercel.app/projet/${project.id}`} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://clementin-portfolio.vercel.app/projet/${project.id}`} />
        <meta property="og:locale" content={lang === 'fr' ? 'fr_FR' : 'en_US'} />
        <meta property="og:site_name" content="Clémentin Ly — Portfolio" />
        <meta property="og:title" content={pd.etudeDeCas(project.title)} />
        <meta property="og:description" content={project.subtitle} />
        <meta property="og:image" content={`https://clementin-portfolio.vercel.app${project.image}`} />
        <meta property="og:image:alt" content={project.title} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pd.etudeDeCas(project.title)} />
        <meta name="twitter:description" content={project.subtitle} />
        <meta name="twitter:image" content={`https://clementin-portfolio.vercel.app${project.image}`} />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org/',
            '@graph': [
              {
                '@type': 'CreativeWork',
                name: project.title,
                description: project.subtitle,
                url: `https://clementin-portfolio.vercel.app/projet/${project.id}`,
                image: `https://clementin-portfolio.vercel.app${project.image}`,
                keywords: project.techs.join(', '),
                author: { '@id': 'https://clementin-portfolio.vercel.app/#person' },
                ...(project.link ? { sameAs: [project.link] } : {}),
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: dict.nav.projets, item: 'https://clementin-portfolio.vercel.app/' },
                  { '@type': 'ListItem', position: 2, name: project.title, item: `https://clementin-portfolio.vercel.app/projet/${project.id}` },
                ],
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="container">
        <Fade className={styles.backRow} delay={0.5} inView={false}>
          <TransitionLink to="/#projets" className={styles.backLink}>
            <ArrowLeft size={16} strokeWidth={1.75} />
            {pd.back}
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
              <dt>{pd.annee}</dt>
              <dd>{project.year}</dd>
            </div>
            <div className={styles.metaCell}>
              <dt>{pd.role}</dt>
              <dd>{project.role}</dd>
            </div>
            <div className={styles.metaCell}>
              <dt>{pd.categorie}</dt>
              <dd>{project.category}</dd>
            </div>
            <div className={styles.metaCell}>
              <dt>{pd.stackLabel}</dt>
              <dd className={styles.metaTechs}>{project.techs.join(', ')}</dd>
            </div>
            <div className={styles.metaCell}>
              <dt>{pd.lien}</dt>
              <dd>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.metaLink}
                  >
                    {isGithub ? pd.voirLeCode : pd.visiterLeSite}
                    <ArrowUpRight size={14} strokeWidth={2} />
                  </a>
                ) : (
                  <span className={styles.inProgress}>
                    <span className={styles.pulseDot} />
                    {pd.enCours}
                  </span>
                )}
              </dd>
            </div>
          </dl>
        </Fade>
      </div>

      <div className={`container ${styles.heroFrame}`} ref={heroRef}>
        <div className={`${styles.heroImage} ${loadedHeroes.has(project.id) ? '' : 'img-skeleton'}`}>
          <motion.div style={{ y: parallaxY }}>
            <ResponsiveImage
              src={project.image}
              alt={pd.apercuDe(project.title)}
              sizes="(min-width: 1100px) 1100px, 100vw"
              className={`img-fade ${loadedHeroes.has(project.id) ? 'img-loaded' : ''}`}
              onLoad={() => setLoadedHeroes((prev) => (prev.has(project.id) ? prev : new Set(prev).add(project.id)))}
            />
          </motion.div>
        </div>
      </div>

      <div className="container">
        <section className={styles.caseGrid}>
          <Fade id="contexte" className={styles.caseBlock}>
            <h2 className={styles.caseHeading}>
              <span className={styles.caseIndex}>01</span>
              {pd.contexte}
            </h2>
            <InkText as="p" className={styles.caseText} text={project.problematique} />
          </Fade>

          <Fade id="solution" className={styles.caseBlock} delay={0.1}>
            <h2 className={styles.caseHeading}>
              <span className={styles.caseIndex}>02</span>
              {pd.solution}
            </h2>
            <InkText as="p" className={styles.caseText} text={project.solution} />
          </Fade>
        </section>

        {project.architecture?.length > 0 && (
          <section id="architecture" className={styles.architecture}>
            <Fade>
              <h2 className={styles.caseHeading}>
                <span className={styles.caseIndex}>03</span>
                {pd.architectureTechnique}
              </h2>
            </Fade>
            <ul>
              {project.architecture.map((item, index) => (
                <Fade key={item.name} as="li" className={styles.archRow} delay={index * 0.08}>
                  <span className={styles.archName}>{item.name}</span>
                  <span className={styles.archDetails}>{item.details}</span>
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
                {pd.apercus}
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
                    data-cursor-label={pd.agrandir}
                    aria-label={pd.agrandirAria(index + 1, project.title)}
                  >
                    <ResponsiveImage
                      src={image}
                      alt={pd.apercuAlt(index + 1, project.title)}
                      loading="lazy"
                      sizes="(min-width: 700px) 33vw, 100vw"
                    />
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
                {pd.performanceMesuree}
              </h2>
            </Fade>
            <ul className={styles.scores}>
              {Object.entries(project.lighthouse).map(([key, value], index) => (
                <Fade key={key} as="li" className={styles.scoreRow} delay={index * 0.08}>
                  <span className={styles.scoreLabel}>{pd.lighthouseLabels[key] || key}</span>
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
                </Fade>
              ))}
            </ul>
            <Fade delay={0.2}>
              <p className={styles.ecoNote}>
                <Leaf size={18} strokeWidth={1.75} />
                {pd.ecoNote}
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
            aria-label={pd.sommaireAria}
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
          data-cursor-label={dict.projects.voirLeProjet}
          onPointerMove={handleSpotlight}
          onNavigate={pageTurn}
        >
          <div className={styles.navPanelInner}>
            <span className={styles.navPanelLabel}>
              <ArrowLeft size={14} strokeWidth={2} />
              {pd.precedent}
            </span>
            <span className={styles.navPanelTitle}>{prevProject.title}</span>
          </div>
        </TransitionLink>

        <TransitionLink
          to={`/projet/${nextProject.id}`}
          className={`${styles.navPanel} ${styles.navPanelNext}`}
          data-cursor-label={dict.projects.voirLeProjet}
          onPointerMove={handleSpotlight}
          onNavigate={pageTurn}
        >
          <div className={styles.navPanelInner}>
            <span className={styles.navPanelLabel}>
              {pd.suivant}
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
            aria-label={pd.apercuAgrandi}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <button
              className={styles.lightboxClose}
              onClick={() => setLightboxImage(null)}
              aria-label={pd.fermerAria}
            >
              <X size={28} strokeWidth={1.5} />
            </button>
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              onClick={(event) => event.stopPropagation()}
            >
              <ResponsiveImage
                src={lightboxImage}
                alt={pd.apercuAlt(project.gallery.indexOf(lightboxImage) + 1, project.title)}
                className={styles.lightboxImage}
                sizes="(min-width: 900px) 1100px, 90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ProjectDetail;
