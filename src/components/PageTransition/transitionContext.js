import { createContext, useContext } from 'react';

export const TransitionContext = createContext({ navigateTo: () => {} });

export const usePageTransition = () => useContext(TransitionContext);
