import { usePreferences } from '../../context/preferencesContext';
import styles from './GrainOverlay.module.css';

/* Texture de grain fixe et discrète par-dessus toute l'interface, avec une
   très légère dérive continue pour éviter l'effet "sticker" plat */
const GrainOverlay = () => {
  const { reducedMotion } = usePreferences();

  return (
    <div
      className={`${styles.grain} ${reducedMotion ? styles.still : ''} print-hide`}
      aria-hidden="true"
    />
  );
};

export default GrainOverlay;
