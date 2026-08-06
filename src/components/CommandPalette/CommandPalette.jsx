import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Search,
  ArrowRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  Waves,
  Volume2,
  CornerDownLeft,
} from 'lucide-react';
import { useCommandPalette } from '../../context/commandPaletteContext';
import { usePageTransition } from '../PageTransition/transitionContext';
import { usePreferences } from '../../context/preferencesContext';
import useFocusTrap from '../../hooks/useFocusTrap';
import { normalize } from '../../lib/normalize';
import { projectsData } from '../../data/projectsData';
import styles from './CommandPalette.module.css';

const EMAIL = 'ly.clementin@gmail.com';

const pages = [
  { id: 'page-accueil', label: 'Accueil', hint: 'Retour en haut de page', to: '/' },
  { id: 'page-projets', label: 'Projets', hint: 'Voir tous les projets', to: '/#projets' },
  { id: 'page-apropos', label: 'À propos', hint: 'Le manifeste', to: '/#apropos' },
  { id: 'page-parcours', label: 'Parcours', hint: "Le parcours de formation", to: '/#parcours' },
  { id: 'page-stack', label: 'Stack', hint: 'Outils et technologies', to: '/#stack' },
  { id: 'page-contact', label: 'Contact', hint: 'Écrire un message', to: '/#contact' },
];

const CommandPalette = () => {
  const { open, closePalette } = useCommandPalette();
  const { navigateTo } = usePageTransition();
  const { reducedMotion, toggleReducedMotion, soundEnabled, toggleSound, tick } = usePreferences();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const panelRef = useRef(null);
  const inputRef = useRef(null);

  useFocusTrap(panelRef, { active: open, onClose: closePalette, initialFocusRef: inputRef });

  useEffect(() => {
    if (!open) return undefined;
    /* Différé pour ne pas déclencher de setState synchrone dans l'effet */
    const id = setTimeout(() => {
      setQuery('');
      setActiveIndex(0);
      setFeedback('');
    }, 0);
    return () => clearTimeout(id);
  }, [open]);

  const actions = useMemo(
    () => [
      {
        id: 'action-copy-email',
        label: "Copier l'adresse email",
        hint: EMAIL,
        icon: Mail,
        run: async () => {
          try {
            await navigator.clipboard.writeText(EMAIL);
            setFeedback('Adresse copiée dans le presse-papier');
          } catch {
            window.location.href = `mailto:${EMAIL}`;
          }
        },
        keepOpen: true,
      },
      {
        id: 'action-github',
        label: 'Ouvrir GitHub',
        hint: 'github.com/ClemLy',
        icon: Github,
        run: () => window.open('https://github.com/ClemLy', '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'action-linkedin',
        label: 'Ouvrir LinkedIn',
        hint: 'linkedin.com/in/clémentin-ly',
        icon: Linkedin,
        run: () => window.open('https://linkedin.com/in/clémentin-ly/', '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'action-cv',
        label: 'Télécharger le CV',
        hint: 'PDF',
        icon: FileText,
        run: () => window.open('/assets/CV/CV - Clémentin LY.pdf', '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'action-motion',
        label: reducedMotion ? 'Rétablir les animations' : 'Réduire les animations',
        hint: 'Préférence sauvegardée',
        icon: Waves,
        run: () => {
          toggleReducedMotion();
          setFeedback(reducedMotion ? 'Animations rétablies' : 'Animations réduites');
        },
        keepOpen: true,
      },
      {
        id: 'action-sound',
        label: soundEnabled ? "Couper le son de l'interface" : "Activer le son de l'interface",
        hint: 'Préférence sauvegardée',
        icon: Volume2,
        run: () => {
          toggleSound();
          setFeedback(soundEnabled ? 'Son coupé' : 'Son activé');
        },
        keepOpen: true,
      },
    ],
    [reducedMotion, soundEnabled, toggleReducedMotion, toggleSound]
  );

  const results = useMemo(() => {
    const q = normalize(query.trim());

    const matchGroup = (items, group) =>
      items
        .filter((item) => !q || normalize(item.label).includes(q) || normalize(item.hint || '').includes(q))
        .map((item) => ({ ...item, group }));

    const projectItems = projectsData.map((project) => ({
      id: `project-${project.id}`,
      label: project.title,
      hint: project.subtitle,
      to: `/projet/${project.id}`,
    }));

    return [
      ...matchGroup(pages, 'Navigation'),
      ...matchGroup(projectItems, 'Projets'),
      ...matchGroup(actions, 'Actions'),
    ];
  }, [query, actions]);

  useEffect(() => {
    const id = setTimeout(() => setActiveIndex(0), 0);
    return () => clearTimeout(id);
  }, [query]);

  const activate = (item) => {
    if (!item) return;
    tick();
    if (item.to) {
      navigateTo(item.to);
      closePalette();
      return;
    }
    item.run?.();
    if (!item.keepOpen) closePalette();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => (results.length ? (prev + 1) % results.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => (results.length ? (prev - 1 + results.length) % results.length : 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      activate(results[activeIndex]);
    }
  };

  let lastGroup = null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePalette}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label="Palette de commandes"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.searchRow}>
              <Search size={18} strokeWidth={1.75} className={styles.searchIcon} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Rechercher une page, un projet, une action…"
                className={styles.input}
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-listbox"
                aria-activedescendant={results[activeIndex] ? `cmdk-option-${results[activeIndex].id}` : undefined}
                aria-autocomplete="list"
                autoComplete="off"
              />
              <kbd className={styles.kbd}>Échap</kbd>
            </div>

            {feedback && (
              <p className={styles.feedback} role="status">
                {feedback}
              </p>
            )}

            <ul
              id="cmdk-listbox"
              role="listbox"
              aria-label="Résultats"
              className={styles.results}
              data-lenis-prevent
            >
              {results.length === 0 && <li className={styles.empty}>Aucun résultat.</li>}

              {results.map((item, index) => {
                const showGroup = item.group !== lastGroup;
                lastGroup = item.group;
                const Icon = item.icon || ArrowRight;

                return (
                  <li key={item.id}>
                    {showGroup && <p className={styles.groupLabel}>{item.group}</p>}
                    <button
                      id={`cmdk-option-${item.id}`}
                      role="option"
                      aria-selected={index === activeIndex}
                      className={`${styles.option} ${index === activeIndex ? styles.optionActive : ''}`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => activate(item)}
                    >
                      <Icon size={16} strokeWidth={1.75} className={styles.optionIcon} />
                      <span className={styles.optionText}>
                        <span className={styles.optionLabel}>{item.label}</span>
                        {item.hint && <span className={styles.optionHint}>{item.hint}</span>}
                      </span>
                      {index === activeIndex && <CornerDownLeft size={14} strokeWidth={1.75} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
