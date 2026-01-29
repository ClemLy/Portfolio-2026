export const projectsData = [
  {
    id: "ecommerce",
    title: "Plateforme E-commerce Premium",
    subtitle: "Application de commerce en ligne avec dashboard administrateur",
    image: "/assets/projets/ecom-mockup.jpg",
    techs: ["React", "Node.js", "PostgreSQL", "Stripe"],
    problematique: "Gérer des flux transactionnels importants tout en garantissant une sécurité maximale des données bancaires.",
    solution: "Architecture découplée avec tunnel d'achat optimisé et intégration sécurisée de l'API Stripe.",
    architecture: [
      { name: "Frontend", details: "React & Context API pour la gestion du panier" },
      { name: "Backend", details: "Express avec validation de schémas Joi" },
      { name: "Données", details: "PostgreSQL avec Sequelize ORM" }
    ],
    lighthouse: { performance: 98, accessibilite: 95, bonnesPratiques: 100, seo: 92 }
  },
  {
    id: "api-rest",
    title: "API REST Haute Performance",
    subtitle: "Architecture microservices scalable pour flux de données massifs",
    image: "/assets/projets/api-viz.jpg",
    techs: ["Node.js", "Express", "MongoDB", "Redis"],
    problematique: "Réduire la latence de réponse sur une API traitant des millions de requêtes quotidiennes.",
    solution: "Mise en place d'un cache Redis et d'un cluster Node.js pour distribuer la charge sur plusieurs coeurs.",
    architecture: [
      { name: "Core", details: "Node.js Cluster Mode" },
      { name: "Cache", details: "Redis pour les requêtes redondantes" },
      { name: "Monitoring", details: "Logging avec Winston & Grafana" }
    ],
    lighthouse: { performance: 95, accessibilite: 100, bonnesPratiques: 98, seo: 90 }
  },
  {
    id: "mobile-first",
    title: "Application Mobile-First",
    subtitle: "PWA optimisée avec focus sur l'expérience utilisateur et l'éco-conception",
    image: "/assets/projets/mobile-app.jpg",
    techs: ["React", "TailwindCSS", "Framer Motion", "PWA"],
    problematique: "Offrir une expérience proche du natif sur le web tout en limitant la consommation énergétique.",
    solution: "Optimisation du 'critical path' et chargement asynchrone des composants lourds.",
    architecture: [
      { name: "UI/UX", details: "Tailwind & Animations 60fps" },
      { name: "Mobile", details: "Service Workers pour le mode offline" },
      { name: "Eco", details: "Images WebP & Lazy loading agressif" }
    ],
    lighthouse: { performance: 100, accessibilite: 98, bonnesPratiques: 100, seo: 95 }
  },
  {
    id: "dashboard",
    title: "Dashboard Analytique",
    subtitle: "Visualisation de données en temps réel pour le suivi métier",
    image: "/assets/projets/dashboard.jpg",
    techs: ["React", "TypeScript", "Recharts", "Supabase"],
    problematique: "Rendre des données complexes intelligibles via des graphiques interactifs performants.",
    solution: "Utilisation de Recharts pour le rendu vectoriel et synchronisation temps réel avec Supabase.",
    architecture: [
      { name: "Frontend", details: "TypeScript pour la robustesse des types" },
      { name: "Visualisation", details: "Recharts & D3.js" },
      { name: "Real-time", details: "Websockets via Supabase" }
    ],
    lighthouse: { performance: 96, accessibilite: 94, bonnesPratiques: 100, seo: 90 }
  }
];