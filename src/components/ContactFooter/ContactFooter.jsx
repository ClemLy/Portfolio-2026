import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUpRight, ArrowUp, Copy, Check } from 'lucide-react';
import Magnetic from '../Magnetic/Magnetic';
import ScrambleText from '../ScrambleText/ScrambleText';
import PreferencesMenu from '../PreferencesMenu/PreferencesMenu';
import { Fade, Reveal } from '../Reveal/Reveal';
import { useLenis, scrollTo } from '../SmoothScroll/lenisContext';
import { usePreferences } from '../../context/preferencesContext';
import { useLanguage } from '../../context/languageContext';
import useSpotlight from '../../hooks/useSpotlight';
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
  const { dict } = useLanguage();
  const [copied, setCopied] = useState(false);
  const handleSpotlight = useSpotlight();
  const actionsRef = useRef(null);
  /* Le bouton préférences flotte en bas à droite tant que sa place d'origine
     dans le footer n'est pas visible, puis vient s'y ranger — sinon il reste
     coincé tout en bas, inaccessible tant qu'on n'a pas fini de scroller. */
  const actionsInView = useInView(actionsRef, { margin: '0px 0px -10% 0px' });

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
    <footer className={styles.footer} id="contact" onPointerMove={handleSpotlight}>
      <div className={`container ${styles.inner}`}>
        <Fade className={styles.overline}>
          <span>{dict.contact.overline}</span>
        </Fade>

        <div className={styles.ctaWrapper}>
          <Magnetic strength={0.15}>
            <a href={`mailto:${EMAIL}`} className={`${styles.cta} ink-hover`} data-cursor-label={dict.contact.writeAria}>
              <Reveal>
                <span className={styles.ctaLine}>{dict.contact.ctaLine1}</span>
              </Reveal>
              <Reveal delay={0.08}>
                <span className={styles.ctaRow}>
                  <span className={styles.ctaSerifWrap}>
                    <span className={`${styles.ctaSerif} serif`}>{dict.contact.ctaLine2}</span>
                    <svg className={styles.ctaUnderline} viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true">
                      <motion.path
                        d="M3,12 C50,2 90,18 140,10 C190,2 230,18 280,9 C310,3 350,14 397,8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                      />
                    </svg>
                  </span>
                  <ArrowUpRight className={styles.ctaArrow} strokeWidth={1.5} />
                </span>
              </Reveal>
            </a>
          </Magnetic>
        </div>

        <Fade className={styles.emailRow}>
          <button
            onClick={handleCopy}
            className={styles.emailButton}
            aria-label={copied ? dict.contact.copiedToast : dict.contact.copyAria}
          >
            {EMAIL}
            <span className={styles.copyIcon} aria-hidden="true">
              {copied ? <Check size={16} strokeWidth={2} /> : <Copy size={16} strokeWidth={1.75} />}
            </span>
          </button>
        </Fade>

        <div className={styles.bottom}>
          <nav className={styles.links} aria-label={dict.contact.externalLinksAria}>
            {links.map((link) => (
              <Magnetic key={link.label} strength={0.25}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.link} ink-hover`}
                >
                  <ScrambleText text={link.label} />
                  <ArrowUpRight size={14} strokeWidth={1.75} />
                </a>
              </Magnetic>
            ))}
          </nav>

          <div className={styles.actions} ref={actionsRef}>
            <PreferencesMenu docked={actionsInView} />

            <Magnetic strength={0.3}>
              <button onClick={handleScrollTop} className={styles.topButton} aria-label={dict.contact.scrollTopAria}>
                <ArrowUp size={18} strokeWidth={1.75} />
              </button>
            </Magnetic>
          </div>
        </div>

        <div className={styles.legal}>
          <span>{dict.contact.legal(new Date().getFullYear())}</span>
          <span>{dict.contact.craft}</span>
        </div>
      </div>

      {/* Région persistante dans le DOM pour que les lecteurs d'écran
          annoncent la confirmation même quand le toast est inséré dynamiquement */}
      <span className="visually-hidden" aria-live="polite" aria-atomic="true">
        {copied ? dict.contact.copiedToast : ''}
      </span>

      <AnimatePresence>
        {copied && (
          <motion.div
            className={styles.toast}
            aria-hidden="true"
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Check size={16} strokeWidth={2} />
            {dict.contact.copiedToast}
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default ContactFooter;
