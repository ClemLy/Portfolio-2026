export const techGroups = [
  {
    id: 'frontend',
    label: 'Frontend',
    technologies: [
      {
        name: 'React',
        description: "Interfaces dynamiques et réutilisables avec hooks et contextes.",
        t: { en: { description: 'Dynamic, reusable interfaces built with hooks and context.' } }
      },
      {
        name: 'React Native',
        description: "Applications mobiles iOS et Android performantes, utilisé pour Athly.",
        t: { en: { description: 'High-performance iOS and Android apps, used for Athly.' } }
      },
      {
        name: 'HTML5 & CSS3',
        description: "Maîtrise des structures web et du design responsive sans framework.",
        t: { en: { description: 'Strong grasp of web structure and responsive design without a framework.' } }
      },
      {
        name: 'CSS Modules & NativeWind',
        description: "Stylisation moderne et isolée pour des composants maintenables.",
        t: { en: { description: 'Modern, scoped styling for maintainable components.' } }
      }
    ]
  },
  {
    id: 'backend',
    label: 'Backend',
    technologies: [
      {
        name: 'Node.js & Express',
        description: "API REST scalables et gestion fine des middlewares.",
        t: { en: { description: 'Scalable REST APIs with fine-grained middleware management.' } }
      },
      {
        name: 'MongoDB & SQL',
        description: "Modélisation NoSQL (Mongoose) et bases relationnelles.",
        t: { en: { description: 'NoSQL modeling (Mongoose) and relational databases.' } }
      },
      {
        name: 'Auth & Sécurité',
        description: "JWT, hashage Bcrypt et protection des routes.",
        t: { en: { name: 'Auth & Security', description: 'JWT, Bcrypt hashing and route protection.' } }
      },
      {
        name: 'PHP & WordPress',
        description: "Plugins sur-mesure, CPT et architecture orientée métier.",
        t: { en: { description: 'Custom plugins, CPTs and business-oriented architecture.' } }
      }
    ]
  },
  {
    id: 'craft',
    label: 'Design & Green IT',
    technologies: [
      {
        name: 'Éco-conception',
        description: "Optimisation des ressources et respect des normes WCAG.",
        t: { en: { name: 'Eco-design', description: 'Resource optimization and WCAG compliance.' } }
      },
      {
        name: 'Git & GitHub',
        description: "Gestion de version, Pull Requests et intégration continue.",
        t: { en: { description: 'Version control, Pull Requests and continuous integration.' } }
      },
      {
        name: 'Figma & Adobe',
        description: "Manipulation de maquettes et intégration pixel-perfect.",
        t: { en: { description: 'Mockup handling and pixel-perfect integration.' } }
      },
      {
        name: 'Gestion Agile',
        description: "Sprints, suivi des tâches et gestion de projet structurée.",
        t: { en: { name: 'Agile Management', description: 'Sprints, task tracking and structured project management.' } }
      }
    ]
  }
];

export const certifications = [
  {
    title: "Numérique Responsable",
    issuer: "Institut Numérique Responsable",
    description: "Maîtrise des fondamentaux de l'éco-conception web.",
    t: {
      en: {
        title: 'Sustainable Digital',
        description: 'Mastery of core web eco-design fundamentals.'
      }
    }
  },
  {
    title: "Lighthouse",
    issuer: "Google DevTools",
    description: "Audit technique et optimisation des Web Vitals.",
    t: {
      en: {
        description: 'Technical audit and Web Vitals optimization.'
      }
    }
  },
  {
    title: "Solution Greenoco",
    issuer: "Audit Carbone",
    description: "Mesure et réduction de l'empreinte carbone des sites web.",
    t: {
      en: {
        issuer: 'Carbon Audit',
        description: 'Measuring and reducing the carbon footprint of websites.'
      }
    }
  }
];
