import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Contenu textuel */}
        <div className={styles.content}>
          <div className={styles.badge}>
            <Sparkles className={styles.sparkle} size={16} />
            Développeur Full-Stack
          </div>

          <h1 className={styles.title}>
            Concevoir des expériences web <span className={styles.gradientText}>performantes</span> et responsables
          </h1>

          <p className={styles.description}>
            Passionné par le développement web moderne, je transforme des concepts en solutions Full-Stack élégantes. 
            Fort d'une expertise WordPress/PHP et d'une transition vers l'écosystème React/Node.js, j'allie performance technique et éco-conception.
          </p>

          <div className={styles.actions}>
            <button className={styles.primaryBtn}>
              Voir mes projets
              <ArrowRight size={16} />
            </button>
            <button className={styles.secondaryBtn}>Me contacter</button>
          </div>

          <div className={styles.techStack}>
            {['React', 'Node.js', 'PHP', 'WordPress'].map((tech) => (
              <span key={tech} className={styles.techBadge}>{tech}</span>
            ))}
          </div>
        </div>

        {/* Illustration SVG */}
        <div className={styles.visual}>
          <svg viewBox="0 0 500 500" className={styles.svgIllustration} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* Cercle central avec animation de respiration */}
            <circle cx="250" cy="250" r="120" fill="url(#grad1)" opacity="0.15">
              <animate attributeName="r" values="120;140;120" dur="6s" repeatCount="indefinite" />
            </circle>

            {/* Courbes fluides */}
            <path d="M 100 150 Q 250 50 400 150 T 450 300" stroke="url(#grad1)" strokeWidth="2" fill="none" opacity="0.4">
              <animate attributeName="d" values="M 100 150 Q 250 50 400 150 T 450 300; M 100 150 Q 250 100 400 150 T 450 300; M 100 150 Q 250 50 400 150 T 450 300" dur="8s" repeatCount="indefinite" />
            </path>
            
            <path d="M 50 350 Q 150 250 300 350 T 450 400" stroke="url(#grad2)" strokeWidth="2" fill="none" opacity="0.3" />

            {/* Lignes de connexion entre les noeuds */}
            <g opacity="0.3" stroke="white" strokeWidth="1">
              <line x1="150" y1="150" x2="250" y2="250" />
              <line x1="350" y1="150" x2="250" y2="250" />
              <line x1="150" y1="350" x2="250" y2="250" />
              <line x1="350" y1="350" x2="250" y2="250" />
            </g>

            {/* Noeuds technologiques */}
            <circle cx="150" cy="150" r="14" fill="#3B82F6" />
            <circle cx="350" cy="150" r="14" fill="#22D3EE" />
            <circle cx="250" cy="250" r="18" fill="#3B82F6" />
            <circle cx="150" cy="350" r="14" fill="#22D3EE" />
            <circle cx="350" cy="350" r="14" fill="#3B82F6" />

            {/* Particules flottantes */}
            <circle cx="100" cy="100" r="3" fill="#22D3EE">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="400" cy="200" r="3" fill="#3B82F6">
              <animate attributeName="opacity" values="1;0.2;1" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="400" r="4" fill="#22D3EE" opacity="0.6" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;