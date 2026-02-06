import { Code2, Server, Wrench } from 'lucide-react';

export const techTabs = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: Code2,
    color: '#3B82F6',
    technologies: [
      { name: 'React', description: 'Développement d’interfaces dynamiques et réutilisables avec hooks et contextes.' },
      { name: 'React Native', description: 'Conception d’applications mobiles iOS et Android performantes (utilisé pour Athly).' },
      { name: 'HTML5 & CSS3 Natif', description: 'Maîtrise fondamentale des structures web et du design responsive sans frameworks.' },
      { name: 'NativeWind / CSS Modules', description: 'Stylisation moderne et isolée pour des composants propres et maintenables.' }
    ]
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: Server,
    color: '#22D3EE',
    technologies: [
      { name: 'Node.js & Express', description: 'Création d\'API REST scalables et gestion des middlewares.' },
      { name: 'MongoDB & SQL', description: 'Modélisation de données NoSQL (Mongoose) et gestion de bases relationnelles.' },
      { name: 'Auth & Sécurité', description: 'Mise en place de systèmes JWT, hashage Bcrypt et protection des routes.' },
      { name: 'Architecture API', description: 'Design pattern MVC et documentation structurée pour le front.' }
    ]
  },
  {
    id: 'tools',
    label: 'Design & Green IT',
    icon: Wrench,
    color: '#3B82F6',
    technologies: [
      { name: 'Éco-conception', description: 'Optimisation des ressources et respect des normes WCAG pour un web durable.' },
      { name: 'Git & GitHub', description: 'Gestion de version, collaboration via Pull Requests et maintenance de code.' },
      { name: 'Figma & Adobe', description: 'Manipulation de maquettes et extraction d’assets pour une intégration web.' },
      { name: 'Asana / Gestion Agile', description: 'Organisation des sprints, suivi des tâches et gestion de projet structurée.' }
    ]
  }
];

export const lighthouseMetrics = [
  { label: 'Performance', score: 100, color: '#22D3EE' },
  { label: 'Accessibilité', score: 93, color: '#3B82F6' },
  { label: 'Bonnes Pratiques', score: 100, color: '#22D3EE' },
  { label: 'SEO', score: 100, color: '#3B82F6' }
];

export const certifications = [
  { 
    title: "Certification Institut du Numérique Responsable", 
    issuer: "Institut Numérique Responsable",
    badge: "Certifié",
    description: "Maîtrise des fondamentaux de l'éco-conception web."
  },
  { 
    title: "Lighthouse", 
    issuer: "Google DevTools",
    description: "Audit technique et optimisation des Web Vitals."
  },
  { 
    title: "Solution Greenoco", 
    issuer: "Audit Carbone",
    description: "Mesure et réduction de l'empreinte carbone des sites web."
  }
];