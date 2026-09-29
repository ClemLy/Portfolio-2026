import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    /* Paquet CommonJS sans exports nommés lisibles par Node : on l'embarque
       dans le bundle du pré-rendu plutôt que de l'importer tel quel */
    noExternal: ['react-helmet-async'],
  },
})
