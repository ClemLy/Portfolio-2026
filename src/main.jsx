import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import './index.css'
import App from './App.jsx'

/* createRoot plutôt que hydrateRoot : le HTML pré-rendu sert aux robots et
   au premier affichage, mais la langue, le thème et le type de pointeur du
   visiteur peuvent différer du rendu de build. Une hydratation lèverait des
   erreurs de correspondance ; un rendu neuf remplace simplement le contenu,
   derrière le rideau d'intro qui couvre déjà l'écran. */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
