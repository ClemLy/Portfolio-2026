export const projectsData = [
  {
    id: "athly",
    title: "Athly",
    subtitle: "Application mobile de musculation gamifiée",
    image: "/assets/projets/athly/athly.webp",
    year: "2025",
    role: "Conception & développement",
    category: "Application",
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
    t: {
      en: {
        title: "Athly",
        subtitle: "Gamified mobile strength-training app",
        role: "Design & development",
        category: "Application",
        problematique: "Design a motivating fitness-tracking app that works offline while offering personalized programs based on the user's actual equipment.",
        solution: "Built a hybrid mobile app with React Native and Expo. Microservices backend (Node/Express) for workout management, with a gamification layer driven by daily XP tiers.",
        architecture: [
          { name: "Mobile Frontend", details: "React Native with Tab/Stack navigation and dynamic theming" },
          { name: "Backend & Data", details: "REST API on Node.js with MongoDB (Mongoose) for performance history" },
          { name: "Experience", details: "Gamification system (XP, levels, badges) and offline mode with sync" }
        ]
      }
    }
  },
  {
    id: "papaie",
    title: "Papaïe",
    subtitle: "Refonte e-commerce premium pour une bijouterie créative",
    image: "/assets/projets/papaie/papaie.webp",
    year: "2025",
    role: "Développement & intégration",
    category: "E-commerce",
    techs: ["WordPress", "WooCommerce", "Flatsome", "UX Design"],
    problematique: "Transformer un catalogue existant en une expérience d'achat haut de gamme, fluide et sécurisée, tout en facilitant la gestion des stocks de bijoux artisanaux.",
    solution: "Intégration fidèle d'une maquette graphique sous WordPress. Amélioration de l'expérience d'achat (parcours panier/paiement) et optimisation des images haute définition pour ne pas ralentir le site.",
    architecture: [
      { name: "E-commerce", details: "WooCommerce configuré pour la vente d'articles uniques et précieux" },
      { name: "UI/UX", details: "Développement sur-mesure via Flatsome à partir d'un design graphique externe" },
      { name: "Performance", details: "Mise en place de solutions de cache et de formats d'image nouvelle génération" }
    ],
    link: "https://papaie.fr",
    lighthouse: {
      performance: 75,
      accessibilité: 82,
      bonnesPratiques: 100,
      seo: 92
    },
    t: {
      en: {
        title: "Papaïe",
        subtitle: "Premium e-commerce redesign for a creative jewelry brand",
        role: "Development & integration",
        category: "E-commerce",
        problematique: "Turn an existing catalog into a smooth, secure, high-end shopping experience, while simplifying stock management for handcrafted jewelry.",
        solution: "Faithful integration of a graphic mockup on WordPress. Improved the purchase journey (cart/checkout flow) and optimized high-resolution images to keep the site fast.",
        architecture: [
          { name: "E-commerce", details: "WooCommerce configured for selling unique, high-value items" },
          { name: "UI/UX", details: "Custom development via Flatsome from an external graphic design" },
          { name: "Performance", details: "Caching solutions and next-gen image formats implemented" }
        ]
      }
    }
  },
  {
    id: "comptoir-aromes",
    title: "Comptoir des Arômes",
    subtitle: "Refonte e-commerce et stratégie de contenu pour une épicerie fine",
    image: "/assets/projets/comptoir-aromes/comptoir-aromes.webp",
    year: "2024",
    role: "Développement & intégration",
    category: "E-commerce",
    techs: ["WordPress", "WooCommerce", "Flatsome", "Custom Post Types"],
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
    },
    t: {
      en: {
        title: "Comptoir des Arômes",
        subtitle: "E-commerce redesign and content strategy for a fine-food grocer",
        role: "Development & integration",
        category: "E-commerce",
        problematique: "Modernize an aging online shop while creating a new space for customer engagement through culinary content.",
        solution: "Deployed a robust e-commerce solution with a full visual redesign. Built a custom content architecture (CPT) for a self-managed, interactive recipe catalog.",
        architecture: [
          { name: "E-commerce", details: "WooCommerce for stock and payment management" },
          { name: "Custom Logic", details: "'Recipes' Custom Post Type to showcase products" },
          { name: "Design", details: "UI/UX optimized for the gourmet catalog on WordPress" }
        ]
      }
    }
  },
  {
    id: "cosy-study",
    title: "Cosy&Study",
    subtitle: "Refonte complète d'une plateforme de résidences étudiantes au Havre",
    image: "/assets/projets/cosy-study/cosy-study.webp",
    year: "2024",
    role: "Développement & intégration",
    category: "Vitrine",
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
    },
    t: {
      en: {
        title: "Cosy&Study",
        subtitle: "Full redesign of a student housing platform in Le Havre",
        role: "Development & integration",
        category: "Showcase",
        problematique: "Modernize the brand image and streamline the user journey on an existing site that had become slow and outdated.",
        solution: "Built a custom WordPress interface with deep media optimization (video/images) to guarantee smoothness despite rich visual content.",
        architecture: [
          { name: "CMS", details: "WordPress for self-managed content" },
          { name: "Performance", details: "Custom Lazy Loading scripts for ambient videos" },
          { name: "Visual", details: "Divi builder optimized for responsive layouts" }
        ]
      }
    }
  },
  {
    id: "deauville-limousines",
    title: "Deauville Limousine",
    subtitle: "Plateforme de réservation de circuits touristiques haut de gamme en Normandie",
    image: "/assets/projets/deauville-limousine/deauville-limousine.webp",
    year: "2024",
    role: "Développement & intégration",
    category: "Vitrine",
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
    },
    t: {
      en: {
        title: "Deauville Limousine",
        subtitle: "Booking platform for high-end tourist circuits in Normandy",
        role: "Development & integration",
        category: "Showcase",
        problematique: "Deliver an elegant, multilingual showcase for an international clientele, while allowing simple management of varied tourist circuits.",
        solution: "Built a bilingual site optimized for international SEO. Developed a custom 'Circuits' structure (CPT) to dynamically display points of interest, durations and pricing for iconic locations like Mont Saint-Michel.",
        architecture: [
          { name: "Internationalization", details: "Multilingual system to reach an international audience" },
          { name: "Content Management", details: "'Circuits' CPT for simplified offer administration" },
          { name: "User Experience", details: "Visual showcase of the D-Day beaches and Normandy heritage" }
        ]
      }
    }
  },
  {
    id: "france-cuisine-concept",
    title: "France Cuisine Concept",
    subtitle: "Plateforme institutionnelle pour un fonds de dotation solidaire",
    image: "/assets/projets/fcc/fcc.webp",
    year: "2025",
    role: "Développement & intégration",
    category: "Vitrine",
    techs: ["WordPress", "Divi", "Intégration Maquette", "Design Responsable"],
    problematique: "Traduire l'engagement social et caritatif d'une fondation à travers un site web sobre et professionnel, tout en respectant une direction artistique précise fournie par un graphiste.",
    solution: "Développement d'une interface institutionnelle avec le constructeur Divi. Focus sur la clarté de l'information (missions, actus, partenaires) et intégration fidèle de la charte graphique pour renforcer la crédibilité de la fondation.",
    architecture: [
      { name: "Intégration", details: "Traduction technique d'une maquette graphique complexe sous l'écosystème Divi" },
      { name: "Communication", details: "Mise en place d'un module d'actualités dynamique pour valoriser les actions sur le terrain" },
      { name: "UX", details: "Navigation simplifiée pour faciliter l'accès aux informations légales et aux formulaires de contact" }
    ],
    link: "https://francecuisineconcept.org",
    lighthouse: {
      performance: 98,
      accessibilité: 71,
      bonnesPratiques: 100,
      seo: 100
    },
    t: {
      en: {
        title: "France Cuisine Concept",
        subtitle: "Institutional platform for a charitable endowment fund",
        role: "Development & integration",
        category: "Showcase",
        problematique: "Translate a foundation's social and charitable commitment into a sober, professional website, while following a precise art direction supplied by a graphic designer.",
        solution: "Built an institutional interface with the Divi builder. Focused on information clarity (missions, news, partners) and faithful integration of the brand guidelines to reinforce the foundation's credibility.",
        architecture: [
          { name: "Integration", details: "Technical translation of a complex graphic mockup within the Divi ecosystem" },
          { name: "Communication", details: "Dynamic news module to showcase field actions" },
          { name: "UX", details: "Simplified navigation for easy access to legal information and contact forms" }
        ]
      }
    }
  },
  {
    id: "wp-reservations",
    title: "WP-Reservations",
    subtitle: "Système sur-mesure de gestion de flotte automobile pour CSE & Entreprises",
    image: "/assets/projets/wp-reservations/wp-reservations.webp",
    year: "2025",
    role: "Conception & développement",
    category: "Plugin",
    techs: ["PHP", "WordPress", "MySQL", "FullCalendar", "JavaScript"],
    problematique: "Remplacer la gestion opaque sur tableurs Excel par un outil centralisé capable d'éliminer les erreurs de saisie, les doubles réservations et de réguler l'utilisation équitable des véhicules au sein d'une structure.",
    solution: "Développement d'un plugin complet intégrant un calendrier dynamique pour la visibilité des créneaux, un système de quotas par 'points' pour limiter les abus, et une interface d'administration robuste pour la validation des demandes.",
    architecture: [
      { name: "Database", details: "Modélisation de tables relationnelles SQL personnalisées via l'objet global $wpdb" },
      { name: "Sécurité", details: "Implémentation stricte des Nonces et gestion fine des Rôles & Capacités WordPress" },
      { name: "Automatisations", details: "Système de notifications transactionnelles par email lors des changements de statuts" }
    ],
    link: "https://github.com/ClemLy/wp-reservations",
    t: {
      en: {
        title: "WP-Reservations",
        subtitle: "Custom fleet management system for works councils & companies",
        role: "Design & development",
        category: "Plugin",
        problematique: "Replace opaque spreadsheet-based management with a centralized tool that eliminates data-entry errors and double bookings, and ensures fair vehicle usage across an organization.",
        solution: "Built a full plugin with a dynamic calendar for slot visibility, a points-based quota system to prevent abuse, and a robust admin interface for request validation.",
        architecture: [
          { name: "Database", details: "Custom relational SQL table modeling via the global $wpdb object" },
          { name: "Security", details: "Strict Nonce implementation and fine-grained WordPress Roles & Capabilities" },
          { name: "Automation", details: "Transactional email notifications on status changes" }
        ]
      }
    }
  },
  {
    id: "greenoco-player",
    title: "Greenoco Video Player",
    subtitle: "Lecteur vidéo éco-conçu pour l'optimisation de la performance et de l'empreinte carbone",
    image: "/assets/projets/gvp/gvp.webp",
    year: "2024",
    role: "Conception & développement",
    category: "Plugin",
    techs: ["PHP", "JavaScript", "Eco-conception", "Green IT"],
    problematique: "Réduire l'impact des lecteurs vidéo tiers (YouTube/Vimeo) qui chargent des scripts lourds avant même l'interaction de l'utilisateur, dégradant les scores PageSpeed et augmentant la consommation énergétique.",
    solution: "Conception d'un plugin basé sur la sobriété numérique : remplacement des iframes par des miniatures légères. Le chargement des scripts tiers est différé jusqu'au clic utilisateur, économisant ~1Mo de données par page.",
    architecture: [
      { name: "Performance", details: "Optimisation du chemin critique de rendu avec un Lazy-loading total des iframes" },
      { name: "Admin UX", details: "Interface de configuration personnalisée avec prévisualisation des shortcodes en temps réel" },
      { name: "Numérique Responsable", details: "Réduction drastique du poids de la page et des appels serveurs inutiles" }
    ],
    link: "https://github.com/ClemLy/greenoco-video-player",
    t: {
      en: {
        title: "Greenoco Video Player",
        subtitle: "Eco-designed video player for performance and carbon-footprint optimization",
        role: "Design & development",
        category: "Plugin",
        problematique: "Reduce the impact of third-party video players (YouTube/Vimeo) that load heavy scripts before any user interaction, hurting PageSpeed scores and increasing energy consumption.",
        solution: "Designed a plugin built on digital sobriety: replacing iframes with lightweight thumbnails. Third-party scripts are deferred until user click, saving ~1MB of data per page.",
        architecture: [
          { name: "Performance", details: "Optimized critical rendering path with full lazy-loading of iframes" },
          { name: "Admin UX", details: "Custom settings interface with real-time shortcode preview" },
          { name: "Sustainable IT", details: "Drastic reduction of page weight and unnecessary server calls" }
        ]
      }
    }
  }
];

export const projectCategories = ["Tous", "E-commerce", "Vitrine", "Application", "Plugin"];
