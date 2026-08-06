import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Hero from '../../components/Hero/Hero';
import ProjectsIndex from '../../components/ProjectsIndex/ProjectsIndex';
import About from '../../components/About/About';
import Parcours from '../../components/Parcours/Parcours';
import Stack from '../../components/Stack/Stack';
import { useLenis, scrollTo } from '../../components/SmoothScroll/lenisContext';

const Home = () => {
  const location = useLocation();
  const lenis = useLenis();

  /* Accès direct avec une ancre dans l'URL : on rejoint la section visée */
  useEffect(() => {
    if (!location.hash) return;
    const id = setTimeout(() => scrollTo(lenis, location.hash, { immediate: true }), 250);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main id="contenu">
      <Helmet>
        <title>Clémentin Ly, Développeur full-stack créatif à Paris</title>
        <meta
          name="description"
          content="Portfolio de Clémentin Ly, développeur full-stack spécialisé React, Node.js et WordPress. Des expériences web rapides, accessibles et éco-conçues."
        />
      </Helmet>

      <Hero />
      <ProjectsIndex />
      <About />
      <Parcours />
      <Stack />
    </main>
  );
};

export default Home;
