import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import PreferencesProvider from './context/PreferencesProvider';
import { usePreferences } from './context/preferencesContext';
import CommandPaletteProvider from './context/CommandPaletteProvider';
import SmoothScrollProvider from './components/SmoothScroll/SmoothScrollProvider';
import { useLenis, scrollTo } from './components/SmoothScroll/lenisContext';
import TransitionProvider from './components/PageTransition/TransitionProvider';
import Cursor from './components/Cursor/Cursor';
import Header from './components/Header/Header';
import ContactFooter from './components/ContactFooter/ContactFooter';
import CommandPalette from './components/CommandPalette/CommandPalette';
import EasterEgg from './components/EasterEgg/EasterEgg';
import Home from './pages/Home/Home';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import NotFound from './pages/NotFound/NotFound';
import useReactiveTitle from './hooks/useReactiveTitle';
import useDynamicFavicon from './hooks/useDynamicFavicon';

/* Remonte en haut de page à chaque navigation (y compris précédent/suivant) */
const ScrollReset = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    scrollTo(lenis, 0, { immediate: true });
  }, [pathname, lenis]);

  return null;
};

const structuredData = {
  '@context': 'https://schema.org/',
  '@type': 'Person',
  name: 'Clémentin LY',
  jobTitle: 'Développeur Full-Stack',
  description: 'Développeur full-stack spécialisé React, Node.js et WordPress, focalisé sur la performance et l\'éco-conception.',
  url: 'https://clementin-portfolio.vercel.app',
  sameAs: ['https://github.com/ClemLy', 'https://linkedin.com/in/clémentin-ly/'],
};

/* Sépararé du composant App pour pouvoir lire la préférence de mouvement
   réduit (contexte) et la transmettre à Framer Motion globalement */
const AppShell = () => {
  const { reducedMotion } = usePreferences();

  useReactiveTitle();
  useDynamicFavicon();

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'user'}>
      <SmoothScrollProvider>
        <TransitionProvider>
          <CommandPaletteProvider>
            <Helmet>
              <title>Clémentin Ly, Développeur full-stack créatif à Paris</title>
              <meta
                name="description"
                content="Portfolio de Clémentin Ly, développeur full-stack spécialisé React, Node.js et WordPress. Des expériences web rapides, accessibles et éco-conçues."
              />
              <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Helmet>

            <a href="#contenu" className="skip-link">
              Aller au contenu
            </a>

            <ScrollReset />
            <Cursor />
            <Header />
            <CommandPalette />
            <EasterEgg />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projet/:id" element={<ProjectDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

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
        <AppShell />
      </PreferencesProvider>
    </Router>
  );
}

export default App;
