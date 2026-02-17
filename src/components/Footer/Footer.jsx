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

          {/* Droite : Badge Greenoco */}
          <div className={styles.ecoBadgeWrapper}>
            <iframe 
              src="https://app.greenoco.io/fr/certificat/site_affe16ecd060471b31ad/badge?t=1-light" 
              name="badge éco-score" 
              title="badge éco-score" 
              scrolling="no" 
              className={styles.greenocoIframe}
              style={{ border: 0, overflow: 'hidden' }}
            ></iframe>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;