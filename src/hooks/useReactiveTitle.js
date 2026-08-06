import { useEffect } from 'react';

const AWAY_TITLE = 'On se recroise ?';

/* Change le titre de l'onglet quand l'utilisateur le quitte des yeux,
   et restaure le titre exact d'avant son départ à son retour */
const useReactiveTitle = () => {
  useEffect(() => {
    let storedTitle = document.title;

    const handleVisibility = () => {
      if (document.hidden) {
        storedTitle = document.title;
        document.title = AWAY_TITLE;
      } else {
        document.title = storedTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);
};

export default useReactiveTitle;
