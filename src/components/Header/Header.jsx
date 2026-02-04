import React from 'react';
import { FileText } from 'lucide-react';
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
            <FileText size={18} />
            CV
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;