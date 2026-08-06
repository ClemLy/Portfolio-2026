import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import TransitionLink from '../../components/PageTransition/TransitionLink';
import { Reveal, Fade } from '../../components/Reveal/Reveal';
import styles from './NotFound.module.css';

const NotFound = () => (
  <main className={styles.page} id="contenu">
    <Helmet>
      <title>Page introuvable, Clémentin Ly</title>
      <meta name="robots" content="noindex" />
    </Helmet>

    <div className={`container ${styles.inner}`}>
      <Reveal delay={0.5} inView={false}>
        <p className={styles.code}>404</p>
      </Reveal>
      <Fade delay={0.7} inView={false}>
        <p className={`${styles.message} serif`}>Cette page s'est perdue en chemin.</p>
      </Fade>
      <Fade delay={0.85} inView={false}>
        <TransitionLink to="/" className={styles.backLink}>
          <ArrowLeft size={16} strokeWidth={1.75} />
          Revenir à l'accueil
        </TransitionLink>
      </Fade>
    </div>
  </main>
);

export default NotFound;
