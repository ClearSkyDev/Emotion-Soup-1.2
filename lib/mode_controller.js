import React, { createContext, useContext, useState } from 'react';

const ModeContext = createContext();

export function ModeProvider({ children }) {
  const [currentMode, setCurrentMode] = useState('soup');

  const switchMode = (mode) => {
    setCurrentMode(mode);
  };

  return (
    <ModeContext.Provider value={{ currentMode, switchMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  return useContext(ModeContext);
}
