import styles from './GrainOverlay.module.css';

const GrainOverlay = () => (
  <div className={`${styles.grain} print-hide`} aria-hidden="true" />
);

export default GrainOverlay;
