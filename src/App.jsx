import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import Footer from './components/Footer/Footer';

function App() {
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Person",
    "name": "Clémentin LY",
    "jobTitle": "Développeur Full-Stack",
    "description": "Spécialiste en développement web performant et éco-conçu.",
    "url": "https://clementin-portfolio.vercel.app"
  };

  return (
    <Router>
      <Helmet>
        {/* Balises par défaut (si non définies dans les pages) */}
        <title>Clémentin LY | Développeur Full-Stack</title>
        <meta name="description" content="Portfolio de Clémentin LY, développeur Full-Stack spécialisé React, Node.js et PHP. Focus sur la performance et l'éco-conception." />
        
        {/* JSON-LD pour Google */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projet/:id" element={<ProjectDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;