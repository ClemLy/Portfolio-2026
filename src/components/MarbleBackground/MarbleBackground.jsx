import styles from './MarbleBackground.module.css';

/* Fond façon marbre : de larges aplats de couleur très doux, veinés de
   fines lignes irrégulières, pour casser le blanc uni sans distraire du
   contenu — purement décoratif, toujours sous le contenu */
const MarbleBackground = () => <div className={`${styles.marble} print-hide`} aria-hidden="true" />;

export default MarbleBackground;
