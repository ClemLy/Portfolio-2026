import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ArrowUp, Copy, Check } from 'lucide-react';
import Magnetic from '../Magnetic/Magnetic';
import ScrambleText from '../ScrambleText/ScrambleText';
import PreferencesMenu from '../PreferencesMenu/PreferencesMenu';
import { Fade, Reveal } from '../Reveal/Reveal';
import { useLenis, scrollTo } from '../SmoothScroll/lenisContext';
import { usePreferences } from '../../context/preferencesContext';
import styles from './ContactFooter.module.css';

const EMAIL = 'ly.clementin@gmail.com';

const links = [
  { label: 'GitHub', href: 'https://github.com/ClemLy' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/clémentin-ly/' },
  { label: 'CV', href: '/assets/CV/CV - Clémentin LY.pdf' },
];

const ContactFooter = () => {
  const lenis = useLenis();
  const { tick } = usePreferences();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      tick();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const handleScrollTop = () => {
    tick();
    scrollTo(lenis, 0);
  };

  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.inner}`}>
        <Fade className={styles.overline}>
          <span>Une idée, un projet ?</span>
        </Fade>

        <div className={styles.ctaWrapper}>
          <Magnetic strength={0.15}>
            <a href={`mailto:${EMAIL}`} className={styles.cta} data-cursor-label="Écrire">
              <Reveal>
                <span className={styles.ctaLine}>Travaillons</span>
              </Reveal>
              <Reveal delay={0.08}>
                <span className={styles.ctaRow}>
                  <span className={`${styles.ctaSerif} serif`}>ensemble</span>
                  <ArrowUpRight className={styles.ctaArrow} strokeWidth={1.25} />
                </span>
              </Reveal>
            </a>
          </Magnetic>
        </div>

        <Fade className={styles.emailRow}>
          <button onClick={handleCopy} className={styles.emailButton}>
            {EMAIL}
            <span className={styles.copyIcon}>
              {copied ? <Check size={16} strokeWidth={2} /> : <Copy size={16} strokeWidth={1.75} />}
            </span>
          </button>
        </Fade>

        <div className={styles.bottom}>
          <nav className={styles.links} aria-label="Liens externes">
            {links.map((link) => (
              <Magnetic key={link.label} strength={0.25}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <ScrambleText text={link.label} />
                  <ArrowUpRight size={14} strokeWidth={1.75} />
                </a>
              </Magnetic>
            ))}
          </nav>

          <div className={styles.actions}>
            <PreferencesMenu />

            <Magnetic strength={0.3}>
              <button onClick={handleScrollTop} className={styles.topButton} aria-label="Retour en haut de page">
                <ArrowUp size={18} strokeWidth={1.75} />
              </button>
            </Magnetic>
          </div>
        </div>

        <div className={styles.legal}>
          <span>© {new Date().getFullYear()} Clémentin Ly. Tous droits réservés.</span>
          <span>Conçu et développé à Paris, avec sobriété.</span>
        </div>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.div
            className={styles.toast}
            role="status"
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Check size={16} strokeWidth={2} />
            Adresse copiée dans le presse-papier
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default ContactFooter;
