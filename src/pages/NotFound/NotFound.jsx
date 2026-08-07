import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight, Command } from 'lucide-react';
import TransitionLink from '../../components/PageTransition/TransitionLink';
import { Reveal, Fade } from '../../components/Reveal/Reveal';
import { useCommandPalette } from '../../context/commandPaletteContext';
import { useLanguage } from '../../context/languageContext';
import styles from './NotFound.module.css';

const NotFound = () => {
  const { openPalette } = useCommandPalette();
  const { dict } = useLanguage();

  return (
    <main className={styles.page} id="contenu">
      <Helmet>
        <title>{dict.notFound.title}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className={`container ${styles.inner}`}>
        <Reveal delay={0.5} inView={false}>
          <p className={styles.code}>404</p>
        </Reveal>
        <Fade delay={0.7} inView={false}>
          <p className={`${styles.message} serif`}>{dict.notFound.message}</p>
        </Fade>
        <Fade delay={0.8} inView={false}>
          <p className={styles.hint}>{dict.notFound.hint}</p>
        </Fade>

        <Fade delay={0.9} inView={false} className={styles.actions}>
          <TransitionLink to="/" className={styles.backLink}>
            <ArrowLeft size={16} strokeWidth={1.75} />
            {dict.notFound.back}
          </TransitionLink>

          <button type="button" onClick={openPalette} className={styles.paletteButton}>
            <Command size={16} strokeWidth={1.75} />
            {dict.notFound.search}
            <kbd className={styles.kbd}>⌘K</kbd>
          </button>
        </Fade>

        <Fade delay={1} inView={false} className={styles.shortcuts}>
          {dict.notFound.shortcuts.map((s) => (
            <TransitionLink key={s.to} to={s.to} className={styles.shortcutLink}>
              {s.label}
              <ArrowUpRight size={15} strokeWidth={1.75} />
            </TransitionLink>
          ))}
        </Fade>
      </div>
    </main>
  );
};

export default NotFound;
