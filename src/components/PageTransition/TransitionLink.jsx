import { usePageTransition } from './transitionContext';
import { useLanguage } from '../../context/languageContext';
import { localizePath } from '../../i18n/paths';

/* Lien interne qui déclenche la transition en rideau plutôt qu'un changement
   brut de page, vers la version de la langue en cours */
const TransitionLink = ({ to, children, onNavigate, ...props }) => {
  const { navigateTo } = usePageTransition();
  const { lang } = useLanguage();
  const href = localizePath(to, lang);

  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    onNavigate?.();
    navigateTo(href);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default TransitionLink;
