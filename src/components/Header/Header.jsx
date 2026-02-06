import React, { useState, useEffect } from 'react';
import { FileText, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const closeMenu = () => setIsMenuOpen(false);

  // Fonction pour gérer le scroll ou la redirection
  const handleNavClick = (e, targetId) => {
    closeMenu();
  };

  const navLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Projets', href: '#projets' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={() => window.scrollTo(0,0)}>
          Clémentin <span>LY</span>
        </Link>

        {/* Bouton menu mobile */}
        <button className={styles.mobileMenuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation */}
        <div className={`${styles.rightSide} ${isMenuOpen ? styles.menuOpen : ''}`}>
          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={isHomePage ? link.href : `/${link.href}`}
                onClick={closeMenu}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <a href="/cv.pdf" target="_blank" className={styles.cvButton}>
            <FileText size={18} />
            CV
          </a>
        </div>
      </div>
      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
    </header>
  );
};

export default Header;