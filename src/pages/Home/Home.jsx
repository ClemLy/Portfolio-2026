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
import { setAmbientSection } from '../../lib/sound';

const SECTION_IDS = ['accueil', 'projets', 'apropos', 'parcours', 'stack'];
const SITE_URL = 'https://clementin-portfolio.vercel.app';
const OG_IMAGE = `${SITE_URL}/assets/og/og-image.jpg`;

const Home = () => {
  const location = useLocation();
  const lenis = useLenis();
  const { reducedMotion } = usePreferences();
  const { lang, dict } = useLanguage();

  useSoftScrollSnap(lenis, '#accueil, #projets, #apropos, #parcours, #stack', !reducedMotion);

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
    <main id="contenu" style={{ position: 'relative' }}>
      <Helmet>
        <html lang={lang} />
        <title>{dict.meta.title}</title>
        <meta name="description" content={dict.meta.description} />
        <link rel="canonical" href={SITE_URL + '/'} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL + '/'} />
        <meta property="og:locale" content={lang === 'fr' ? 'fr_FR' : 'en_US'} />
        <meta property="og:site_name" content="Clémentin Ly — Portfolio" />
        <meta property="og:title" content={dict.meta.title} />
        <meta property="og:description" content={dict.meta.description} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dict.meta.title} />
        <meta name="twitter:description" content={dict.meta.description} />
        <meta name="twitter:image" content={OG_IMAGE} />
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
