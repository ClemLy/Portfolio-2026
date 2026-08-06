import { useCallback, useEffect, useState } from 'react';
import { CommandPaletteContext } from './commandPaletteContext';

/* État partagé de la palette de commandes : ouverte via Cmd/Ctrl+K depuis
   n'importe où, ou via le bouton dédié du header */
const CommandPaletteProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const openPalette = useCallback(() => setOpen(true), []);
  const closePalette = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isMac = navigator.platform?.toUpperCase().includes('MAC');
      const modifier = isMac ? event.metaKey : event.ctrlKey;
      if (modifier && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <CommandPaletteContext.Provider value={{ open, openPalette, closePalette }}>
      {children}
    </CommandPaletteContext.Provider>
  );
};

export default CommandPaletteProvider;
