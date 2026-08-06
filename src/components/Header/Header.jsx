import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { ArrowUpRight, Command } from 'lucide-react';
import TransitionLink from '../PageTransition/TransitionLink';
import ScrambleText from '../ScrambleText/ScrambleText';
import { useLenis, scrollTo } from '../SmoothScroll/lenisContext';
import { useCommandPalette } from '../../context/commandPaletteContext';
import { usePreferences } from '../../context/preferencesContext';
import useActiveSection from '../../hooks/useActiveSection';
import useFocusTrap from '../../hooks/useFocusTrap';
import { projectsData } from '../../data/projectsData';
import styles from './Header.module.css';

const navLinks = [
  { name: 'Projets', to: '/#projets' },
  { name: 'À propos', to: '/#apropos' },
  { name: 'Parcours', to: '/#parcours' },
  { name: 'Stack', to: '/#stack' },
];

/* Sections observées pour surligner le lien actif dans la navigation */
const sectionIds = ['accueil', 'projets', 'apropos', 'parcours', 'stack', 'contact'];

const recentProjects = [...projectsData].sort((a, b) => b.year.localeCompare(a.year)).slice(0, 3);

const menuVariants = {
  closed: { y: '-100%', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.15 } },
  open: { y: '0%', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
};

const menuItemVariants = {
  closed: { y: '110%', transition: { duration: 0.3 } },
  open: (index) => ({
    y: '0%',
    transition: { duration: 0.7, delay: 0.25 + index * 0.06, ease: [0.16, 1, 0.3, 1] },
  }),
};

const RING_RADIUS = 13;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const Header = () => {
  const lenis = useLenis();
  const { openPalette } = useCommandPalette();
  const { tick } = usePreferences();
  const [time, setTime] = useState('');
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const activeSection = useActiveSection(sectionIds);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const megaMenuTimer = useRef(null);
  const ringOffset = useTransform(scrollYProgress, (v) => RING_CIRCUMFERENCE * (1 - v));

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 160 && !menuOpen);
    setScrolled(latest > 24);
  });

  /* Heure locale de Paris, mise à jour toutes les 30 secondes */
  useEffect(() => {
    const format = new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Paris',
    });
    const update = () => setTime(format.format(new Date()));
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  /* Piège le focus dans le menu et le restitue au bouton burger à la fermeture */
  useFocusTrap(menuRef, { active: menuOpen, onClose: closeMenu });

  const toggleMenu = () => {
    tick();
    setMenuOpen((prev) => !prev);
  };

  const handleContact = (event) => {
    event.preventDefault();
    closeMenu();
    scrollTo(lenis, '#contact');
  };

  const openMegaMenu = () => {
    clearTimeout(megaMenuTimer.current);
    setMegaMenuOpen(true);
  };

  const closeMegaMenuDelayed = () => {
    megaMenuTimer.current = setTimeout(() => setMegaMenuOpen(false), 150);
  };

  return (
    <>
      <motion.header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        initial={false}
      >
        <div className={styles.inner}>
          <div className={styles.logoGroup}>
            <TransitionLink to="/" className={styles.logo} onNavigate={closeMenu}>
              <ScrambleText text="Clémentin Ly" />
            </TransitionLink>
            <svg className={styles.ring} viewBox="0 0 32 32" aria-hidden="true">
              <circle cx="16" cy="16" r={RING_RADIUS} className={styles.ringTrack} />
              <motion.circle
                cx="16"
                cy="16"
                r={RING_RADIUS}
                className={styles.ringProgress}
                strokeDasharray={RING_CIRCUMFERENCE}
                style={{ strokeDashoffset: ringOffset }}
              />
            </svg>
          </div>

          <div className={styles.meta}>
            <AnimatePresence mode="wait">
              <motion.span
                key={time}
                className={styles.time}
                initial={{ opacity: 0.3, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                Paris, {time}
              </motion.span>
            </AnimatePresence>
          </div>

          <nav className={styles.nav} aria-label="Navigation principale">
            {navLinks.map((link) => {
              const isActive = activeSection === link.to.split('#')[1];
              const isProjects = link.name === 'Projets';
              return (
                <div
                  key={link.name}
                  className={styles.navItem}
                  onMouseEnter={isProjects ? openMegaMenu : undefined}
                  onMouseLeave={isProjects ? closeMegaMenuDelayed : undefined}
                >
                  <TransitionLink
                    to={link.to}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                    aria-expanded={isProjects ? megaMenuOpen : undefined}
                  >
                    {link.name}
                  </TransitionLink>

                  {isProjects && (
                    <AnimatePresence>
                      {megaMenuOpen && (
                        <motion.div
                          className={styles.megaMenu}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          onMouseEnter={openMegaMenu}
                          onMouseLeave={closeMegaMenuDelayed}
                        >
                          <p className={styles.megaMenuLabel}>Projets récents</p>
                          {recentProjects.map((project) => (
                            <TransitionLink
                              key={project.id}
                              to={`/projet/${project.id}`}
                              className={styles.megaMenuItem}
                              onNavigate={() => setMegaMenuOpen(false)}
                            >
                              <span className={styles.megaMenuThumb}>
                                <img src={project.image} alt="" loading="lazy" />
                              </span>
                              <span>
                                <span className={styles.megaMenuTitle}>{project.title}</span>
                                <span className={styles.megaMenuYear}>{project.year}</span>
                              </span>
                            </TransitionLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
            <a
              href="#contact"
              onClick={handleContact}
              className={`${styles.navLink} ${activeSection === 'contact' ? styles.navLinkActive : ''}`}
              aria-current={activeSection === 'contact' ? 'true' : undefined}
            >
              Contact
            </a>
            <button
              onClick={openPalette}
              className={styles.searchButton}
              aria-label="Ouvrir la palette de commandes"
            >
              <Command size={13} strokeWidth={2} />
              K
            </button>
            <a
              href="/assets/CV/CV - Clémentin LY.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cvButton}
            >
              CV
              <ArrowUpRight size={14} strokeWidth={2} />
            </a>
          </nav>

          <button
            ref={burgerRef}
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className={styles.menu}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <nav className={styles.menuNav} aria-label="Menu mobile">
              {navLinks.map((link, index) => (
                <span className={styles.menuItemMask} key={link.name}>
                  <motion.span custom={index} variants={menuItemVariants} className={styles.menuItemInner}>
                    <TransitionLink to={link.to} className={styles.menuLink} onNavigate={closeMenu}>
                      <span className={styles.menuIndex}>0{index + 1}</span>
                      {link.name}
                    </TransitionLink>
                  </motion.span>
                </span>
              ))}
              <span className={styles.menuItemMask}>
                <motion.span custom={navLinks.length} variants={menuItemVariants} className={styles.menuItemInner}>
                  <a href="#contact" onClick={handleContact} className={styles.menuLink}>
                    <span className={styles.menuIndex}>05</span>
                    Contact
                  </a>
                </motion.span>
              </span>
            </nav>

            <motion.div
              className={styles.menuFooter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.55 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <a href="https://github.com/ClemLy" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/clémentin-ly/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="/assets/CV/CV - Clémentin LY.pdf" target="_blank" rel="noopener noreferrer">CV</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
