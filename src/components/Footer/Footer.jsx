import React from 'react';
import { Github, Linkedin, Mail, Leaf } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: 'https://github.com/ClemLy', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/clémentin-ly/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:ly.clementin@gmail.com', label: 'Email' }
  ];

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        <div className={styles.content}>
          
          {/* Gauche : Réseaux Sociaux */}
          <div className={styles.socialGroup}>
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={styles.socialLink}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>

          {/* Centre : Copyright */}
          <div className={styles.copyright}>
            © {currentYear} Clémentin LY. Tous droits réservés.
          </div>

          {/* Droite : Badge Éco-conception */}
          <div className={styles.ecoBadge}>
            <Leaf size={16} className={styles.leafIcon} />
            <span className={styles.ecoText}>Score Éco: 100/100</span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;