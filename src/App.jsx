import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import PreferencesProvider from './context/PreferencesProvider';
import { usePreferences } from './context/preferencesContext';
import LanguageProvider from './context/LanguageProvider';
import { useLanguage } from './context/languageContext';
import CommandPaletteProvider from './context/CommandPaletteProvider';
import SmoothScrollProvider from './components/SmoothScroll/SmoothScrollProvider';
import { useLenis, scrollTo } from './components/SmoothScroll/lenisContext';
import TransitionProvider from './components/PageTransition/TransitionProvider';
import MarbleBackground from './components/MarbleBackground/MarbleBackground';
import GrainOverlay from './components/GrainOverlay/GrainOverlay';
import AmbientTint from './components/AmbientTint/AmbientTint';
import InkRipple from './components/InkRipple/InkRipple';
import ElasticOverscroll from './components/ElasticOverscroll/ElasticOverscroll';
import Cursor from './components/Cursor/Cursor';
import Header from './components/Header/Header';
import ContactFooter from './components/ContactFooter/ContactFooter';
import CommandPalette from './components/CommandPalette/CommandPalette';
import EasterEgg from './components/EasterEgg/EasterEgg';
import useReactiveTitle from './hooks/useReactiveTitle';
import useDynamicFavicon from './hooks/useDynamicFavicon';

const Home = lazy(() => import('./pages/Home/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail/ProjectDetail'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

/* Remonte en haut de page à chaque navigation (y compris précédent/suivant) */
const ScrollReset = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    scrollTo(lenis, 0, { immediate: true });
  }, [pathname, lenis]);

  return null;
};

const SITE_URL = 'https://clementin-portfolio.vercel.app';

const structuredData = {
  '@context': 'https://schema.org/',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Clémentin LY',
      jobTitle: 'Développeur Full-Stack',
      description: 'Développeur full-stack spécialisé React, Next.js et TypeScript, avec une solide expérience Node.js et WordPress, focalisé sur la performance et l\'éco-conception.',
      url: SITE_URL,
      image: `${SITE_URL}/assets/og/og-image.jpg`,
      sameAs: ['https://github.com/ClemLy', 'https://linkedin.com/in/clémentin-ly/'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Clémentin Ly — Portfolio',
      url: SITE_URL,
      inLanguage: ['fr-FR', 'en-US'],
      author: { '@id': `${SITE_URL}/#person` },
    },
  ],
};

/* Sépararé du composant App pour pouvoir lire la préférence de mouvement
   réduit (contexte) et la transmettre à Framer Motion globalement */
const AppShell = () => {
  const { reducedMotion } = usePreferences();
  const { dict } = useLanguage();

  useReactiveTitle(dict.awayTitle);
  useDynamicFavicon(reducedMotion);

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'user'}>
      <SmoothScrollProvider>
        <TransitionProvider>
          <CommandPaletteProvider>
            <Helmet>
              <title>{dict.meta.title}</title>
              <meta name="description" content={dict.meta.description} />
              <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Helmet>

            <a href="#contenu" className="skip-link">
              {dict.skipLink}
            </a>

            <ScrollReset />
            <MarbleBackground />
            <Cursor />
            <AmbientTint />
            <InkRipple />
            <ElasticOverscroll />
            <GrainOverlay />
            <Header />
            <CommandPalette />
            <EasterEgg />

            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projet/:id" element={<ProjectDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>

            <ContactFooter />
          </CommandPaletteProvider>
        </TransitionProvider>
      </SmoothScrollProvider>
    </MotionConfig>
  );
};

function App() {
  return (
    <Router>
      <PreferencesProvider>
        <LanguageProvider>
          <AppShell />
        </LanguageProvider>
      </PreferencesProvider>
    </Router>
  );
}

export default App;
