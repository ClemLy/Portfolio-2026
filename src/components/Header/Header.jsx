import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo à gauche */}
        <div className={styles.logo}>
          Clémentin <span>LY</span>
        </div>

        {/* Bloc de droite */}
        <div className={styles.rightSide}>
          <nav className={styles.nav}>
            <a href="#accueil">Accueil</a>
            <a href="#projets">Projets</a>
            <a href="#expertise">Expertise</a>
            <a href="#contact">Contact</a>
          </nav>

          <a href="/cv.pdf" target="_blank" className={styles.cvButton}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            CV
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;