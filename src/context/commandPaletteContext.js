import { createContext, useContext } from 'react';

export const CommandPaletteContext = createContext(null);

export const useCommandPalette = () => useContext(CommandPaletteContext);
