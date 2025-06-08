import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [age, setAge] = useState(null);
  const [selectedEmotions, setSelectedEmotions] = useState([]);

  return (
    <AppContext.Provider value={{ age, setAge, selectedEmotions, setSelectedEmotions }}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useApp() {
  return useContext(AppContext);
}
