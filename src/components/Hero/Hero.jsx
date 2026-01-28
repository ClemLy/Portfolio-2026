import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Contenu textuel */}
        <div className={styles.content}>
          <div className={styles.badge}>
            <svg className={styles.sparkle} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"></path></svg>
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
          <svg viewBox="0 0 500 500" className={styles.svgIllustration}>
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <circle cx="250" cy="250" r="120" fill="url(#grad1)" opacity="0.2">
              <animate attributeName="r" values="120;135;120" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle cx="150" cy="150" r="12" fill="#3B82F6" />
            <circle cx="350" cy="150" r="12" fill="#22D3EE" />
            <circle cx="250" cy="250" r="18" fill="#3B82F6" />
            <circle cx="150" cy="350" r="12" fill="#22D3EE" />
            <circle cx="350" cy="350" r="12" fill="#3B82F6" />
            <line x1="150" y1="150" x2="250" y2="250" stroke="#3B82F6" strokeWidth="1" opacity="0.3" />
            <line x1="350" y1="150" x2="250" y2="250" stroke="#22D3EE" strokeWidth="1" opacity="0.3" />
            <line x1="150" y1="350" x2="250" y2="250" stroke="#22D3EE" strokeWidth="1" opacity="0.3" />
            <line x1="350" y1="350" x2="250" y2="250" stroke="#3B82F6" strokeWidth="1" opacity="0.3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;