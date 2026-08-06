# Clémentin LY, Portfolio 2026

[![CI](https://github.com/ClemLy/Portfolio-2026/actions/workflows/ci.yml/badge.svg)](https://github.com/ClemLy/Portfolio-2026/actions/workflows/ci.yml)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel&logoColor=white)](https://vercel.com/)

Portfolio interactif inspiré des sites primés sur Awwwards : design éditorial clair, typographie massive, micro-interactions soignées et sobriété numérique. Sans 3D, sans surcharge : tout repose sur le layout, le mouvement et la matière typographique.

## Direction artistique

* **Light mode éditorial** : fond papier chaud, encre profonde, accent orange brûlé.
* **Typographie** : General Sans (grotesque) pour la structure, Instrument Serif italique pour les accents. Polices auto-hébergées en WOFF2 (moins de 100 Ko au total).
* **Layout magazine** : filets fins, index numérotés, whitespace généreux, grilles asymétriques.

## Interactions

* **Smooth scroll** avec Lenis, désactivé si `prefers-reduced-motion`.
* **Curseur personnalisé** : point réactif qui devient une pastille "Voir le projet" sur les zones interactives (pointeurs précis uniquement).
* **Liste de projets typographique** : preview d'image flottante qui suit le curseur avec inclinaison selon la vitesse, filtres par catégorie avec animations de layout.
* **Transitions de page** en rideau d'encre, avec écran d'introduction au premier chargement.
* **Boutons magnétiques**, marquee de compétences, manifesto révélé mot à mot au scroll.

## Stack technique

* **Frontend** : React 19, React Router 7, Vite 7.
* **Style** : CSS Modules + tokens CSS custom properties.
* **Animations** : Framer Motion (springs, layout animations, scroll-linked) + Lenis.
* **Icônes** : Lucide React. **SEO** : React Helmet Async, sitemap, JSON-LD.

## Installation

```bash
git clone https://github.com/ClemLy/Portfolio-2026.git
cd Portfolio-2026
npm ci
npm run dev
```

Scripts disponibles :

| Commande          | Rôle                                  |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Serveur de développement Vite         |
| `npm run lint`    | Analyse ESLint                        |
| `npm run build`   | Build de production dans `dist/`      |
| `npm run preview` | Prévisualisation du build             |

## Workflow Git & CI/CD

Le dépôt suit un flow simple à deux niveaux :

1. `main` : production, déployée automatiquement par Vercel.
2. `develop` : intégration continue des fonctionnalités.
3. Une branche par changement (`feat/...`, `fix/...`, `design/...`), fusionnée dans `develop` via Pull Request.

À chaque push ou PR vers `develop` et `main`, la CI GitHub Actions (`.github/workflows/ci.yml`) exécute :

* **Lint** : ESLint sur tout le projet.
* **Build** : build de production Vite, rapport du poids du bundle et archivage de `dist/` en artefact (7 jours).

Les deux jobs tournent en parallèle et les runs obsolètes sont annulés automatiquement à chaque nouveau commit. Le déploiement reste géré par l'intégration Vercel (previews sur PR, production sur `main`).

## Performance & éco-conception

* Scores Lighthouse visés : 100 / 95+ / 100 / 100.
* Polices WOFF2 auto-hébergées et préchargées, cache immutable (`vercel.json`).
* Images WebP, lazy-loading, animations GPU (transform/opacity uniquement).
* Respect de `prefers-reduced-motion` sur l'ensemble des interactions.

## Licence

Projet sous licence MIT. Inspirez-vous librement, mais ajoutez-y votre propre touche.

---

Développé par **Clémentin LY**
