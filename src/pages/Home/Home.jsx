import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Hero from '../../components/Hero/Hero';
import ProjectsIndex from '../../components/ProjectsIndex/ProjectsIndex';
import About from '../../components/About/About';
import Parcours from '../../components/Parcours/Parcours';
import Stack from '../../components/Stack/Stack';
import ParallaxLines from '../../components/ParallaxLines/ParallaxLines';
import { useLenis, scrollTo } from '../../components/SmoothScroll/lenisContext';
import { usePreferences } from '../../context/preferencesContext';
import { useLanguage } from '../../context/languageContext';
import useSoftScrollSnap from '../../hooks/useSoftScrollSnap';
import useActiveSection from '../../hooks/useActiveSection';
import { useFinePointer } from '../../hooks/useFinePointer';
import { setAmbientSection } from '../../lib/sound';
import {
  SITE_NAME,
  OG_IMAGE,
  PERSON_ID,
  WEBSITE_ID,
  pageUrl,
  alternateUrls,
  LOCALES,
  IN_LANGUAGE,
} from '../../lib/site';
import { projectsData } from '../../data/projectsData';

const SECTION_IDS = ['accueil', 'projets', 'apropos', 'parcours', 'stack'];

const Home = () => {
  const location = useLocation();
  const lenis = useLenis();
  const { reducedMotion } = usePreferences();
  const finePointer = useFinePointer();
  const { lang, dict } = useLanguage();
  const url = pageUrl('/', lang);
  const otherLang = lang === 'fr' ? 'en' : 'fr';

  const structuredData = {
    '@context': 'https://schema.org/',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${url}#profilepage`,
        url,
        name: dict.meta.title,
        description: dict.meta.description,
        inLanguage: IN_LANGUAGE[lang],
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
        about: { '@id': PERSON_ID },
      },
      {
        '@type': 'ItemList',
        name: dict.projects.sectionLabel,
        numberOfItems: projectsData.length,
        itemListElement: projectsData.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: project.title,
          url: pageUrl(`/projet/${project.id}`, lang),
        })),
      },
    ],
  };

  /* Pas d'aimantation au doigt : elle contredirait l'inertie native du
     défilement tactile et donnerait l'impression que la page résiste */
  useSoftScrollSnap(lenis, '#accueil, #projets, #apropos, #parcours, #stack', !reducedMotion && finePointer);

  /* La nappe d'ambiance (si activée) module légèrement sa hauteur selon la
     section visitée, sans effet audible si le son d'ambiance est coupé */
  const activeSection = useActiveSection(SECTION_IDS);
  useEffect(() => {
    if (activeSection) setAmbientSection(activeSection);
  }, [activeSection]);

  /* Accès direct avec une ancre dans l'URL : on rejoint la section visée */
  useEffect(() => {
    if (!location.hash) return;
    const id = setTimeout(() => scrollTo(lenis, location.hash, { immediate: true }), 250);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main id="contenu" tabIndex={-1} style={{ position: 'relative' }}>
      <Helmet>
        <html lang={lang} />
        <title>{dict.meta.title}</title>
        <meta name="description" content={dict.meta.description} />
        <link rel="canonical" href={url} />
        {alternateUrls('/').map((alt) => (
          <link key={alt.hrefLang} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
        ))}

        <meta property="og:type" content="profile" />
        <meta property="profile:first_name" content="Clémentin" />
        <meta property="profile:last_name" content="Ly" />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content={LOCALES[lang]} />
        <meta property="og:locale:alternate" content={LOCALES[otherLang]} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={dict.meta.title} />
        <meta property="og:description" content={dict.meta.description} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={dict.meta.title} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dict.meta.title} />
        <meta name="twitter:description" content={dict.meta.description} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <ParallaxLines />
      <Hero />
      <ProjectsIndex />
      <About />
      <Parcours />
      <Stack />
    </main>
  );
};

export default Home;
