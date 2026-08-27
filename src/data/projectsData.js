export const projectsData = [
  {
    id: "athly",
    title: "Athly",
    subtitle: "Application mobile de musculation gamifiée",
    image: "/assets/projets/athly/athly.webp",
    year: "2025",
    role: "Conception & développement",
    category: "Application",
    type: "personal",
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
    id: "apex-motion",
    title: "Apex // Motion",
    subtitle: "Configurateur 3D immersif et expérience Porsche en temps réel",
    image: "/assets/projets/apex-motion/apex-motion.webp",
    year: "2026",
    role: "Conception & développement",
    category: "Expérience",
    type: "personal",
    techs: ["Next.js","TypeScript", "React Three Fiber", "GSAP", "Three.js"],
    problematique: "Créer une expérience 3D immersive et fluide autour d'un modèle Porsche complexe (configurateur temps réel, télémétrie de circuit) sans sacrifier les performances ni l'accessibilité sur le web.",
    solution: "Développement d'un configurateur temps réel avec React Three Fiber et Three.js, optimisé via compression Draco et rendu conditionnel (IntersectionObserver, résolution adaptative). Animations pilotées par GSAP/Lenis et son procédural via Web Audio API, sans aucun fichier audio.",
    architecture: [
      { name: "3D Temps Réel", details: "React Three Fiber, Drei et post-processing (bloom, grain, vignette) pour un rendu cinématique à 60 FPS" },
      { name: "Performance", details: "Rendu conditionnel (IntersectionObserver, visibilité d'onglet), résolution adaptative et lazy-loading via next/dynamic" },
      { name: "Expérience", details: "Configurateur 45 teintes, timeline patrimoine sur sept décennies, télémétrie de circuit et audio procédural (Web Audio API)" }
    ],
    link: "https://apex-motion-studio.vercel.app",
    gallery: [
      "/assets/projets/apex-motion/apex-motion-studio.webp",
      "/assets/projets/apex-motion/apex-motion-lap-telemetry.webp",
      "/assets/projets/apex-motion/apex-motion-aero-flow.webp",
      "/assets/projets/apex-motion/apex-motion-particle-reveal.webp",
      "/assets/projets/apex-motion/apex-motion-heritage.webp"
    ],
    lighthouse: {
      performance: 100,
      accessibilité: 96,
      bonnesPratiques: 100,
      seo: 100
    },
    t: {
      en: {
        title: "Apex // Motion",
        subtitle: "Immersive real-time 3D Porsche configurator experience",
        role: "Design & development",
        category: "Experience",
        problematique: "Build a smooth, immersive 3D experience around a complex Porsche model (real-time configurator, circuit telemetry) without sacrificing web performance or accessibility.",
        solution: "Built a real-time configurator with React Three Fiber and Three.js, optimized via Draco compression and conditional rendering (IntersectionObserver, adaptive resolution). Animations driven by GSAP/Lenis with procedural audio via the Web Audio API — no audio files.",
        architecture: [
          { name: "Real-Time 3D", details: "React Three Fiber, Drei and post-processing (bloom, grain, vignette) for a cinematic 60 FPS render" },
          { name: "Performance", details: "Conditional rendering (IntersectionObserver, tab visibility), adaptive resolution and lazy-loading via next/dynamic" },
          { name: "Experience", details: "45-color configurator, seven-decade heritage timeline, circuit telemetry and procedural audio (Web Audio API)" }
        ]
      }
    }
  },
  {
    id: "comptoir-aromes",
    title: "Comptoir des Arômes",
    subtitle: "Refonte e-commerce et stratégie de contenu pour une épicerie fine",
    image: "/assets/projets/comptoir-aromes/comptoir-aromes.webp",
    year: "2025",
    role: "Développement & intégration",
    category: "E-commerce",
    type: "client",
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
    type: "client",
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
    id: "brokn",
    title: "BROKN",
    subtitle: "Site e-commerce Shopify pour une marque de sous-vêtements et basiques haut de gamme fabriqués à Paris",
    image: "/assets/projets/brokn/brokn.webp",
    year: "2026",
    role: "Intégration Shopify & développement Liquid",
    category: "E-commerce",
    type: "client",
    techs: ["Shopify", "Liquid", "Madrid Theme", "JavaScript", "CSS"],
    problematique: "Transformer les maquettes fournies par la designeuse de la marque en boutique Shopify fidèle au positionnement minimaliste et haut de gamme de BROKN, tout en dépassant les limites du thème premium Madrid pour certains comportements spécifiques (sélection de coloris, fiches produit, mise en avant de la fabrication française) que le thème seul ne permettait pas.",
    solution: "Intégration complète des maquettes sur le thème Shopify Madrid, personnalisé en profondeur via Liquid pour les besoins propres à la marque : templates de fiches produit, logique de collections (sous-vêtements, hauts, SOCKN, uniformes) et mise en page éditoriale de la page 'L'Atelier BROKN' qui valorise la fabrication parisienne. Le tout branché sur les fonctionnalités standard Shopify (paiement Klarna/PayPal, comptes clients, suivi de commande et de retour).",
    architecture: [
      { name: "Plateforme", details: "Shopify sur le thème premium Madrid (thème enfant dédié), personnalisation Liquid des templates produit et collection" },
      { name: "Intégration design", details: "Maquettes fournies par une designeuse, intégrées à l'identique : typographie éditoriale, esthétique noir/rouge signature, photographie produit" },
      { name: "Commerce", details: "Paiement sécurisé (Klarna, PayPal, CB), comptes clients, suivi de commande et de retour, livraison offerte dès 100€" }
    ],
    link: "https://brokn.fr/",
    gallery: [
      "/assets/projets/brokn/brokn-produit.webp",
      "/assets/projets/brokn/brokn-collection.webp",
      "/assets/projets/brokn/brokn-atelier.webp"
    ],
    t: {
      en: {
        title: "BROKN",
        subtitle: "Shopify e-commerce site for a premium underwear and basics brand made in Paris",
        role: "Shopify integration & Liquid development",
        category: "E-commerce",
        problematique: "Turn the mockups supplied by the brand's designer into a Shopify store true to BROKN's minimalist, premium positioning, while going beyond what the Madrid premium theme offered out of the box for a few brand-specific behaviors (color swatches, product pages, showcasing French manufacturing).",
        solution: "Full integration of the mockups on the Shopify Madrid theme, deeply customized via Liquid for the brand's specific needs: product page templates, collection logic (underwear, tops, SOCKN, uniforms) and the editorial layout of the 'L'Atelier BROKN' page that highlights Parisian manufacturing. Everything wired into Shopify's standard commerce features (Klarna/PayPal checkout, customer accounts, order and return tracking).",
        architecture: [
          { name: "Platform", details: "Shopify on the premium Madrid theme (dedicated child theme), Liquid customization of product and collection templates" },
          { name: "Design Integration", details: "Mockups supplied by a designer, integrated pixel-for-pixel: editorial typography, signature black/red aesthetic, product photography" },
          { name: "Commerce", details: "Secure checkout (Klarna, PayPal, card), customer accounts, order and return tracking, free shipping over €100" }
        ]
      }
    }
  },
  {
    id: "deauville-limousines",
    title: "Deauville Limousine",
    subtitle: "Plateforme de réservation de circuits touristiques haut de gamme en Normandie",
    image: "/assets/projets/deauville-limousine/deauville-limousine.webp",
    year: "2025",
    role: "Développement & intégration",
    category: "Vitrine",
    type: "client",
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
    id: "papaie",
    title: "Papaïe",
    subtitle: "Refonte e-commerce premium pour une bijouterie créative",
    image: "/assets/projets/papaie/papaie.webp",
    year: "2024",
    role: "Développement & intégration",
    category: "E-commerce",
    type: "client",
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
    id: "france-cuisine-concept",
    title: "France Cuisine Concept",
    subtitle: "Plateforme institutionnelle pour un fonds de dotation solidaire",
    image: "/assets/projets/fcc/fcc.webp",
    year: "2025",
    role: "Développement & intégration",
    category: "Vitrine",
    type: "client",
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
    id: "jackpot-solitaire",
    title: "Jackpot Solitaire",
    subtitle: "Solitaire Klondike dessiné à la main, avec banque de points et mode quitte ou double façon casino",
    image: "/assets/projets/jackpot-solitaire/jackpot-solitaire.webp",
    year: "2026",
    role: "Conception & développement",
    category: "Jeu",
    type: "personal",
    techs: ["React", "TypeScript", "Zustand", "PWA", "Web Audio API"],
    problematique: "Concevoir un jeu de solitaire (Klondike) jouable dans le navigateur qui se démarque des innombrables déclinaisons génériques disponibles en ligne : un ressenti de jeu réellement soigné (dessin, sons, animations), une couche de mise façon casino qui ajoute du risque sans jamais tricher avec l'équité, et un moteur assez fiable pour garantir qu'aucune partie ne bloque ou ne floue silencieusement le joueur.",
    solution: "Développement d'un moteur de jeu immuable et déterministe en TypeScript (chaque coup renvoie un nouveau plateau, jamais muté), avec des graines de partie reproductibles pour le défi du jour et le partage de parties par lien. Détection de blocage et autocomplétion sûre, toutes deux vérifiées par simulation plutôt que devinées. Habillage entièrement fait main : cartes et figures dessinées au trait, sons synthétisés à la volée via la Web Audio API (aucun fichier audio), et un système de mise (banque, séries, quitte ou double) construit comme une vraie mécanique de jeu plutôt qu'un simple compteur de points. L'ensemble fonctionne à 100% hors-ligne en PWA, sans compte ni serveur.",
    architecture: [
      { name: "Moteur de jeu", details: "TypeScript pur, sans dépendance UI : état immuable, RNG déterministe par graine (mulberry32), détection de blocage et autocomplétion vérifiées par simulation bornée" },
      { name: "Interface & état", details: "React 18 et Zustand pour l'état applicatif (partie en cours, réglages, statistiques, hauts faits), avec glisser-déposer fluide au pointeur et au tactile" },
      { name: "Son & PWA", details: "Sons entièrement synthétisés via la Web Audio API, installation hors-ligne complète (vite-plugin-pwa) et déploiement continu automatisé sur GitHub Pages" }
    ],
    link: "https://clemly.github.io/Jackpot-Solitaire/",
    gallery: [
      "/assets/projets/jackpot-solitaire/jackpot-solitaire-partie.webp",
      "/assets/projets/jackpot-solitaire/jackpot-solitaire-jackpot.webp",
      "/assets/projets/jackpot-solitaire/jackpot-solitaire-regles.webp",
      "/assets/projets/jackpot-solitaire/jackpot-solitaire-stats.webp",
      "/assets/projets/jackpot-solitaire/jackpot-solitaire-themes.webp",
      "/assets/projets/jackpot-solitaire/jackpot-solitaire-mobile.webp"
    ],
    t: {
      en: {
        title: "Jackpot Solitaire",
        subtitle: "Hand-drawn Klondike solitaire with a casino-style bankroll and double-or-nothing mode",
        role: "Design & development",
        category: "Game",
        problematique: "Design a browser-based solitaire (Klondike) game that stands out from the countless generic versions online: a genuinely crafted feel (art, sound, animation), a casino-style betting layer that adds risk without ever cheating on fairness, and an engine reliable enough to guarantee no game ever gets silently stuck or unfair to the player.",
        solution: "Built a deterministic, immutable game engine in TypeScript (every move returns a new board, never mutated), with reproducible seeds for the daily challenge and shareable games via link. Dead-end detection and safe auto-complete are both verified by simulation rather than guessed. Every visual and audio element is hand-made: hand-drawn cards and face cards, sounds synthesized on the fly via the Web Audio API (no audio files), and a betting system (bankroll, streaks, double-or-nothing) built as a real game mechanic rather than a simple score counter. Runs 100% offline as a PWA, with no account and no server.",
        architecture: [
          { name: "Game Engine", details: "Pure TypeScript, no UI dependency: immutable state, seeded deterministic RNG (mulberry32), dead-end detection and auto-complete verified by bounded simulation" },
          { name: "UI & State", details: "React 18 and Zustand for application state (current game, settings, stats, achievements), with smooth pointer- and touch-based drag and drop" },
          { name: "Audio & PWA", details: "Fully synthesized sound via the Web Audio API, complete offline install (vite-plugin-pwa) and automated continuous deployment to GitHub Pages" }
        ]
      }
    }
  },
  {
    id: "pocket-casino",
    title: "Pocket Casino",
    subtitle: "Casino rétro solo en pixel art : poker roguelike, blackjack arcade et turbo roulette sur une seule banque",
    image: "/assets/projets/pocket-casino/pocket-casino.webp",
    year: "2026",
    role: "Conception & développement",
    category: "Jeu",
    type: "personal",
    techs: ["React", "TypeScript", "Zustand", "Web Audio API", "Vitest"],
    problematique: "Concevoir un casino solo, hors-ligne et sans compte, où trois jeux (poker roguelike, blackjack, roulette) partagent une seule banque, sans tomber dans le générique : une direction artistique pixel art réellement soignée plutôt qu'un simple thème, une économie où chaque dollar dépensé dans un mode se ressent dans les autres, et un moteur de jeu fiable au point de pouvoir vérifier ses propres règles (stratégie de base, équilibrage des mises) par des tests plutôt que par confiance aveugle.",
    solution: "Développement d'un moteur de jeu pur en TypeScript, entièrement séparé de l'interface : cartes, score de poker, règlement de blackjack, roues de roulette et économie (banque, dette, taxe) sont des fonctions testées sans DOM, ce qui permet au carnet de règles d'afficher une table de stratégie générée par le moteur lui-même plutôt que recopiée à la main. Habillage pixel art fait maison : sprites 16×16 dessinés en dur et rendus en SVG, cartes à pips réellement disposés (pas de glyphes Unicode), inclinaison déterministe par carte, sons entièrement synthétisés via la Web Audio API. Une suite de 99 tests couvre le moteur, l'équilibrage des mises (simulation de parties complètes) et les contraintes visuelles des sprites.",
    architecture: [
      { name: "Moteur de jeu", details: "Logique pure en TypeScript (poker, blackjack, roulette, économie), RNG déterministe mulberry32, testée sans monter le DOM" },
      { name: "Interface & état", details: "React 18 et Zustand pour l'état partagé entre les trois tables (banque, inventaire, trophées, persistance locale)" },
      { name: "Direction artistique & son", details: "Sprites pixel art 16×16 rendus en SVG, cartes à pips dessinés, son entièrement synthétisé via la Web Audio API, aucun fichier audio ni asset binaire" }
    ],
    link: "https://clemly.github.io/Pocket-Casino/",
    lighthouse: {
      performance: 90,
      accessibilité: 100,
      bonnesPratiques: 100,
      seo: 100
    },
    gallery: [
      "/assets/projets/pocket-casino/pocket-casino-poker.webp",
      "/assets/projets/pocket-casino/pocket-casino-boutique-de-manche.webp",
      "/assets/projets/pocket-casino/pocket-casino-blackjack.webp",
      "/assets/projets/pocket-casino/pocket-casino-roulette.webp",
      "/assets/projets/pocket-casino/pocket-casino-quitte-ou-double.webp",
      "/assets/projets/pocket-casino/pocket-casino-carnet-de-regles.webp",
      "/assets/projets/pocket-casino/pocket-casino-trophees.webp",
      "/assets/projets/pocket-casino/pocket-casino-magasin.webp",
      "/assets/projets/pocket-casino/pocket-casino-banqueroute.webp",
      "/assets/projets/pocket-casino/pocket-casino-mobile.webp"
    ],
    t: {
      en: {
        title: "Pocket Casino",
        subtitle: "Solo retro pixel-art casino: roguelike poker, arcade blackjack and turbo roulette sharing one bankroll",
        role: "Design & development",
        category: "Game",
        problematique: "Design a solo, offline, account-free casino where three games (roguelike poker, blackjack, roulette) share a single bankroll, without falling into generic territory: genuinely crafted pixel-art direction rather than a surface theme, an economy where every dollar spent in one mode is felt in the others, and a game engine reliable enough to verify its own rules (basic strategy, bet balancing) through tests rather than blind trust.",
        solution: "Built a pure TypeScript game engine, fully separated from the UI: cards, poker scoring, blackjack settlement, roulette wheels and economy (bankroll, debt, tax) are tested functions with no DOM, which lets the rulebook display a strategy table generated by the engine itself rather than hand-copied. Fully home-made pixel art: hand-authored 16×16 sprites rendered as SVG, cards with properly laid-out pips (no Unicode glyphs), deterministic per-card tilt, and sound entirely synthesized via the Web Audio API. A 99-test suite covers the engine, bet balancing (full-game simulation) and the sprites' visual constraints.",
        architecture: [
          { name: "Game Engine", details: "Pure TypeScript logic (poker, blackjack, roulette, economy), deterministic mulberry32 RNG, tested with no DOM mounted" },
          { name: "UI & State", details: "React 18 and Zustand for state shared across the three tables (bankroll, inventory, trophies, local persistence)" },
          { name: "Art Direction & Audio", details: "16×16 pixel-art sprites rendered as SVG, drawn card pips, fully synthesized sound via the Web Audio API, no audio files or binary assets" }
        ]
      }
    }
  },
  {
    id: "jeu-du-pendu",
    title: "Le Jeu du Pendu",
    subtitle: "Pendu façon cahier d'écolier, neuf thèmes et quatre difficultés, en PHP sans dépendance",
    image: "/assets/projets/jeu-du-pendu/jeu-du-pendu.webp",
    year: "2024",
    role: "Conception & développement",
    category: "Jeu",
    type: "personal",
    techs: ["PHP", "JavaScript", "CSS", "SVG"],
    problematique: "Réaliser un jeu du pendu qui ne ressemble pas à un exercice scolaire générique, avec une vraie identité visuelle (cahier d'écolier le jour, tableau noir la nuit), tout en gardant le mot à deviner strictement côté serveur pour qu'il soit impossible de tricher en lisant le code source de la page.",
    solution: "Séparation nette entre le serveur (une classe PHP 8 orientée objet qui possède l'état de la partie en session) et le navigateur, qui dialogue avec une API JSON (start / guess / hint / state / reset) via fetch, sans jamais recharger la page. Rendu 'tracé à la main' obtenu par filtre SVG et bordures volontairement irrégulières, sans aucune dépendance JavaScript. Gestion fine des accents et mots composés (proposer 'E' révèle aussi les 'É'), reprise de partie après rechargement, et respect de prefers-reduced-motion.",
    architecture: [
      { name: "Backend", details: "PHP 8 orienté objet : classe Hangman isolée et testable, état de partie sérialisé en session, mots ne quittant jamais le serveur" },
      { name: "API & Frontend", details: "API JSON sans framework (start/guess/hint/state/reset), JavaScript vanilla pour le clavier, les appels fetch et la mise en scène" },
      { name: "Direction artistique", details: "Rendu dessiné à la main via filtre SVG, deux ambiances (papier clair / tableau noir) suivant le système avec bascule mémorisée" }
    ],
    link: "https://github.com/ClemLy/JeuDuPendu",
    gallery: [
      "/assets/projets/jeu-du-pendu/jeu-du-pendu-partie.webp",
      "/assets/projets/jeu-du-pendu/jeu-du-pendu-victoire.webp",
      "/assets/projets/jeu-du-pendu/jeu-du-pendu-partie-clair.webp",
      "/assets/projets/jeu-du-pendu/jeu-du-pendu-regles.webp"
    ],
    t: {
      en: {
        title: "The Hangman Game",
        subtitle: "Schoolbook-style hangman, nine themes and four difficulties, dependency-free PHP",
        role: "Design & development",
        category: "Game",
        problematique: "Build a hangman game that doesn't feel like a generic school exercise, with a real visual identity (ruled schoolbook paper by day, blackboard by night), while keeping the secret word strictly server-side so it can never be read from the page source.",
        solution: "Clean separation between the server (an object-oriented PHP 8 class owning the game state in session) and the browser, which talks to a JSON API (start / guess / hint / state / reset) via fetch, never reloading the page. The 'hand-drawn' look comes from an SVG filter and deliberately irregular borders, with zero JavaScript dependencies. Careful handling of accents and compound words (guessing 'E' also reveals 'É'), resuming a game after a page reload, and respect for prefers-reduced-motion.",
        architecture: [
          { name: "Backend", details: "Object-oriented PHP 8: an isolated, testable Hangman class, game state serialized in session, words that never leave the server" },
          { name: "API & Frontend", details: "Framework-free JSON API (start/guess/hint/state/reset), vanilla JavaScript for the keyboard, fetch calls and staging" },
          { name: "Art Direction", details: "Hand-drawn look via SVG filter, two themes (light paper / blackboard) following the system with a remembered toggle" }
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
    type: "personal",
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
    year: "2025",
    role: "Conception & développement",
    category: "Plugin",
    type: "personal",
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

export const projectCategories = ["Tous", "E-commerce", "Vitrine", "Application", "Plugin", "Expérience", "Jeu"];
export const projectTypes = ["Tous", "client", "personal"];
