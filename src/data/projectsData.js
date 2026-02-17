export const projectsData = [
  {
    id: "athly",
    title: "Athly",
    subtitle: "Application mobile de musculation gamifiée (Projet Personnel)",
    image: "/assets/projets/athly/athly.webp",
    techs: ["React Native", "Expo", "Node.js", "MongoDB", "Express"],
    problematique: "Concevoir une application de suivi sportif motivante capable de fonctionner hors-ligne tout en proposant des programmes personnalisés basés sur l'équipement réel de l'utilisateur.",
    solution: "Développement d'une app mobile hybride avec React Native et Expo. Architecture backend en microservices (Node/Express) pour la gestion des entraînements et une logique de gamification par paliers d'XP quotidiens.",
    architecture: [
      { name: "Frontend Mobile", details: "React Native avec Navigation (Tabs/Stack) et thèmage dynamique" },
      { name: "Backend & Data", details: "API REST sous Node.js avec MongoDB (Mongoose) pour l'historique de performances" },
      { name: "Expérience", details: "Système de gamification (XP, niveaux, badges) et mode offline avec synchronisation" }
    ],
    link: null,
    gallery: [
      "/assets/projets/athly/athly-1.webp",
      "/assets/projets/athly/athly-2.webp",
      "/assets/projets/athly/athly-3.webp"
    ],
  },
  {
    id: "comptoir-aromes",
    title: "Comptoir des Arômes",
    subtitle: "Refonte e-commerce et stratégie de contenu pour une épicerie fine",
    image: "/assets/projets/comptoir-aromes/comptoir-aromes.webp",
    techs: ["WordPress", "WooCommerce", "Divi", "Custom Post Types"],
    problematique: "Moderniser une boutique en ligne vieillissante tout en créant un nouvel espace d'engagement pour la clientèle via du contenu culinaire.",
    solution: "Déploiement d'une solution e-commerce robuste avec une refonte visuelle complète. Mise en place d'une architecture de contenus personnalisés (CPT) pour la gestion autonome d'un catalogue de recettes interactives.",
    architecture: [
      { name: "E-commerce", details: "WooCommerce pour la gestion des stocks et paiements" },
      { name: "Custom Logic", details: "Custom Post Types 'Recettes' pour valoriser les produits" },
      { name: "Design", details: "UI/UX optimisée pour le catalogue gourmand sous WordPress" }
    ],
    link: "https://comptoirdesaromes.com",
    lighthouse: { 
      performance: 95, 
      accessibilité: 84, 
      bonnesPratiques: 96, 
      seo: 92 
    }
  },
  {
    id: "cosy-study",
    title: "Cosy&Study",
    subtitle: "Refonte complète d'une plateforme de résidences étudiantes au Havre",
    image: "/assets/projets/cosy-study/cosy-study.webp",
    techs: ["WordPress", "Divi", "Lazy Load Custom", "SEO"],
    problematique: "Moderniser l'image de marque et fluidifier le parcours utilisateur sur un site existant devenu obsolète et lent.",
    solution: "Développement d'une interface sur-mesure sous WordPress, avec une optimisation poussée des médias (vidéos/images) pour garantir une fluidité maximale malgré un contenu visuel riche.",
    architecture: [
      { name: "CMS", details: "WordPress pour une gestion autonome des contenus" },
      { name: "Performance", details: "Scripts personnalisés de Lazy Loading pour les vidéos d'ambiance" },
      { name: "Visual", details: "Builder Divi optimisé pour le responsive" }
    ],
    link: "https://cosyandstudy.com",
    lighthouse: { 
      performance: 98, 
      accessibilité: 68, 
      bonnesPratiques: 96, 
      seo: 92 
    }
  },
  {
    id: "deauville-limousines",
    title: "Deauville Limousine Services",
    subtitle: "Plateforme de réservation de circuits touristiques haut de gamme en Normandie",
    image: "/assets/projets/deauville-limousine/deauville-limousine.webp",
    techs: ["WordPress", "Divi", "Multilingue", "Custom Post Types"],
    problematique: "Proposer une vitrine élégante et multilingue pour une clientèle internationale, tout en permettant une gestion simple de circuits touristiques variés.",
    solution: "Création d'un site bilingue optimisé pour le SEO international. Développement d'une structure de 'Circuits' sur-mesure (CPT) permettant d'afficher dynamiquement les points d'intérêt, les durées et les tarifs pour des lieux iconiques comme le Mont Saint-Michel.",
    architecture: [
      { name: "Internationalisation", details: "Système multilingue pour cibler une clientèle étrangère" },
      { name: "Gestion de Contenu", details: "CPT 'Circuits' pour une administration simplifiée des offres" },
      { name: "User Experience", details: "Mise en avant visuelle des plages du débarquement et du patrimoine normand" }
    ],
    link: "https://deauville-limousines-services.fr",
    lighthouse: { 
      performance: 90, 
      accessibilité: 83, 
      bonnesPratiques: 100, 
      seo: 100 
    }
  },
  {
    id: "wp-reservations",
    title: "WP-Reservations",
    subtitle: "Système sur-mesure de gestion de flotte automobile pour CSE & Entreprises",
    image: "/assets/projets/wp-reservations/wp-reservations.webp",
    techs: ["PHP", "WordPress", "MySQL", "FullCalendar", "JavaScript"],
    problematique: "Remplacer la gestion opaque sur tableurs Excel par un outil centralisé capable d'éliminer les erreurs de saisie, les doubles réservations et de réguler l'utilisation équitable des véhicules au sein d'une structure.",
    solution: "Développement d'un plugin complet intégrant un calendrier dynamique pour la visibilité des créneaux, un système de quotas par 'points' pour limiter les abus, et une interface d'administration robuste pour la validation des demandes.",
    architecture: [
      { name: "Database", details: "Modélisation de tables relationnelles SQL personnalisées via l'objet global $wpdb" },
      { name: "Sécurité", details: "Implémentation stricte des Nonces et gestion fine des Rôles & Capacités WordPress" },
      { name: "Automatisations", details: "Système de notifications transactionnelles par email lors des changements de statuts" }
    ],
    link: "https://github.com/ClemLy/wp-reservations"
  },
  {
    id: "greenoco-player",
    title: "Greenoco Video Player",
    subtitle: "Lecteur vidéo éco-conçu pour l'optimisation de la performance et de l'empreinte carbone",
    image: "/assets/projets/gvp/gvp.webp",
    techs: ["PHP", "JavaScript", "Eco-conception", "Green IT"],
    problematique: "Réduire l'impact des lecteurs vidéo tiers (YouTube/Vimeo) qui chargent des scripts lourds avant même l'interaction de l'utilisateur, dégradant les scores PageSpeed et augmentant la consommation énergétique.",
    solution: "Conception d'un plugin basé sur la sobriété numérique : remplacement des iframes par des miniatures légères. Le chargement des scripts tiers est différé jusqu'au clic utilisateur, économisant ~1Mo de données par page.",
    architecture: [
      { name: "Performance", details: "Optimisation du chemin critique de rendu avec un Lazy-loading total des iframes" },
      { name: "Admin UX", details: "Interface de configuration personnalisée avec prévisualisation des shortcodes en temps réel" },
      { name: "Numérique Responsable", details: "Réduction drastique du poids de la page et des appels serveurs inutiles" }
    ],
    link: "https://github.com/ClemLy/greenoco-video-player"
  }
];