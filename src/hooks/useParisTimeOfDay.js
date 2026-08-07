import { useEffect, useState } from 'react';

const getParisHour = () => {
  const fmt = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: 'Europe/Paris' });
  return parseInt(fmt.format(new Date()), 10);
};

/* Heure courante à Paris (0-23), rafraîchie chaque minute — sert à teinter
   discrètement l'ambiance de la page selon le moment de la journée */
const useParisTimeOfDay = () => {
  const [hour, setHour] = useState(getParisHour);

  useEffect(() => {
    const id = setInterval(() => setHour(getParisHour()), 60000);
    return () => clearInterval(id);
  }, []);

  return hour;
};

export default useParisTimeOfDay;
