import { useSyncExternalStore } from 'react';

const QUERY = '(pointer: fine)';

const subscribe = (callback) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
};

const getSnapshot = () => window.matchMedia(QUERY).matches;

/* Vrai uniquement pour les pointeurs précis (souris, trackpad) */
export const useFinePointer = () => useSyncExternalStore(subscribe, getSnapshot);
