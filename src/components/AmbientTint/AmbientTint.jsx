import useParisTimeOfDay from '../../hooks/useParisTimeOfDay';
import styles from './AmbientTint.module.css';

/* Teintes très discrètes selon le moment de la journée à Paris : aube et
   soirée dorées, nuit plus froide, milieu de journée neutre */
const tintFor = (hour) => {
  if (hour >= 5 && hour < 8) return 'rgba(255, 186, 140, 0.05)';
  if (hour >= 8 && hour < 11) return 'rgba(255, 244, 214, 0.035)';
  if (hour >= 11 && hour < 16) return 'rgba(255, 255, 255, 0)';
  if (hour >= 16 && hour < 19) return 'rgba(255, 176, 120, 0.05)';
  if (hour >= 19 && hour < 22) return 'rgba(233, 120, 110, 0.06)';
  return 'rgba(60, 70, 120, 0.06)';
};

const AmbientTint = () => {
  const hour = useParisTimeOfDay();

  return (
    <div
      className={`${styles.tint} print-hide`}
      style={{ backgroundColor: tintFor(hour) }}
      aria-hidden="true"
    />
  );
};

export default AmbientTint;
