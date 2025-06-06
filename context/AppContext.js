import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [age, setAge] = useState(null);
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [textSize, setTextSize] = useState(16);

  return (
    <AppContext.Provider
      value={{
        age,
        setAge,
        selectedEmotions,
        setSelectedEmotions,
        highContrast,
        setHighContrast,
        reduceMotion,
        setReduceMotion,
        textSize,
        setTextSize,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
