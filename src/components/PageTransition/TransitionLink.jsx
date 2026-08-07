import { usePageTransition } from './transitionContext';

/* Lien interne qui déclenche la transition en rideau plutôt qu'un changement
   brut de page */
const TransitionLink = ({ to, children, onNavigate, ...props }) => {
  const { navigateTo } = usePageTransition();

  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    onNavigate?.();
    navigateTo(to);
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default TransitionLink;
