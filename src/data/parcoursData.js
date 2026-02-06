import { Terminal, Server, Briefcase, Smartphone } from 'lucide-react';

export const parcoursData = [
  {
    id: 1,
    year: '2022',
    title: 'Fondations',
    description: 'Apprentissage de la programmation orientée objet, HTML5 et CSS3.',
    icon: Terminal,
    color: '#3B82F6',
    side: 'left'
  },
  {
    id: 2,
    year: '2023',
    title: 'Approfondissement Web',
    description: 'Maîtrise de PHP, JavaScript natif et découverte des frameworks (Symfony, CodeIgniter).',
    icon: Server,
    color: '#22D3EE',
    side: 'right'
  },
  {
    id: 3,
    year: '2024',
    title: 'Expérience Professionnelle (Liziweb)',
    description: "Spécialisation WordPress, focus sur l'éco-conception, le SEO technique et l'accessibilité numérique (WCAG).",
    icon: Briefcase,
    color: '#3B82F6',
    side: 'left'
  },
  {
    id: 4,
    year: '2025',
    title: 'Expertise Full-Stack (Paris Ynov Campus)',
    description: "Spécialisation React.js, développement mobile (React Native), architecture logicielle et création d'API REST avec Node.js (Express).",
    icon: Smartphone,
    color: '#22D3EE',
    side: 'right'
  }
];