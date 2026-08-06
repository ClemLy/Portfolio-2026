import { Asterisk } from 'lucide-react';
import styles from './Marquee.module.css';

/* Bandeau défilant en boucle : deux copies de la piste pour un défilement continu */
const Marquee = ({ items, duration = 28 }) => (
  <div className={`${styles.marquee} print-hide`} aria-hidden="true">
    <div className={styles.track} style={{ animationDuration: `${duration}s` }}>
      {[0, 1].map((copy) => (
        <div className={styles.group} key={copy}>
          {items.map((item, index) => (
            <span className={styles.item} key={index}>
              {item}
              <Asterisk className={styles.icon} size={22} strokeWidth={1.5} />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Marquee;
