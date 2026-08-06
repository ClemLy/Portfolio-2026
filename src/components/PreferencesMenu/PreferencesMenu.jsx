import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AudioLines, Settings2, Volume2, VolumeX, Waves } from 'lucide-react';
import { usePreferences } from '../../context/preferencesContext';
import useFocusTrap from '../../hooks/useFocusTrap';
import styles from './PreferencesMenu.module.css';

/* Bascule accessible : rôle switch, état exposé via aria-checked */
const Switch = ({ checked, onChange, label, description, icon: Icon }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className={styles.switchRow}
  >
    <Icon size={18} strokeWidth={1.75} className={styles.switchIcon} />
    <span className={styles.switchText}>
      <span className={styles.switchLabel}>{label}</span>
      <span className={styles.switchDescription}>{description}</span>
    </span>
    <span className={`${styles.switchTrack} ${checked ? styles.switchTrackOn : ''}`}>
      <span className={styles.switchThumb} />
    </span>
  </button>
);

const PreferencesMenu = () => {
  const { reducedMotion, toggleReducedMotion, soundEnabled, toggleSound, ambientEnabled, toggleAmbient } =
    usePreferences();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  const close = () => setOpen(false);

  useFocusTrap(panelRef, { active: open, onClose: close });

  return (
    <div className={styles.wrapper}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Préférences d'accessibilité"
      >
        <Settings2 size={18} strokeWidth={1.75} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              aria-hidden="true"
            />
            <motion.div
              ref={panelRef}
              className={styles.panel}
              role="dialog"
              aria-modal="true"
              aria-label="Préférences d'accessibilité"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className={styles.panelTitle}>Préférences</p>
              <Switch
                checked={reducedMotion}
                onChange={toggleReducedMotion}
                label="Réduire les animations"
                description="Limite les mouvements et transitions à l'essentiel"
                icon={Waves}
              />
              <Switch
                checked={soundEnabled}
                onChange={toggleSound}
                label="Sons d'interface"
                description="Un tic discret sur quelques interactions clés"
                icon={soundEnabled ? Volume2 : VolumeX}
              />
              <Switch
                checked={ambientEnabled}
                onChange={toggleAmbient}
                label="Son d'ambiance"
                description="Une nappe très discrète, à réactiver à chaque visite"
                icon={AudioLines}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PreferencesMenu;
