import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import Cursor from './components/Cursor/Cursor';
import Header from './components/Header/Header';
import ContactFooter from './components/ContactFooter/ContactFooter';
import CommandPalette from './components/CommandPalette/CommandPalette';
import EasterEgg from './components/EasterEgg/EasterEgg';
import useReactiveTitle from './hooks/useReactiveTitle';
import Home from './pages/Home/Home';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import NotFound from './pages/NotFound/NotFound';
import { personSchema, websiteSchema } from './lib/site';

/* Pages importées statiquement : chaque URL est servie pré-rendue, et un
   chunk chargé à la demande forcerait React à remplacer ce HTML par un
   fallback vide le temps du téléchargement. ProjectDetail et NotFound ne
   pèsent que quelques Ko ; le gros morceau (Three.js) reste scindé. */

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
  '@graph': [personSchema, websiteSchema],
};

/* Séparé du composant App pour pouvoir lire la préférence de mouvement
   réduit (contexte) et la transmettre à Framer Motion globalement */
const AppShell = () => {
  const { reducedMotion } = usePreferences();
  const { dict } = useLanguage();

  useReactiveTitle(dict.awayTitle);

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
            <GrainOverlay />
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
    <PreferencesProvider>
      <LanguageProvider>
        <AppShell />
      </LanguageProvider>
    </PreferencesProvider>
  );
}

export default App;
