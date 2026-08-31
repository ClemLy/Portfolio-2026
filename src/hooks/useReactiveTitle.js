import { useEffect } from 'react';

/* Change le titre de l'onglet quand l'utilisateur le quitte des yeux,
   et restaure le titre exact d'avant son départ à son retour */
const useReactiveTitle = (awayTitle) => {
  useEffect(() => {
    let storedTitle = document.title;

    const handleVisibility = () => {
      if (document.hidden) {
        storedTitle = document.title;
        document.title = awayTitle;
      } else {
        document.title = storedTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [awayTitle]);
};

export default useReactiveTitle;
