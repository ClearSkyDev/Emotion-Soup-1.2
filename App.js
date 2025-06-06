import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation';
import { AppProvider } from './context/AppContext';
import { ModeProvider } from './lib/mode_controller';

export default function App() {
  return (
    <AppProvider>
      <ModeProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </ModeProvider>
    </AppProvider>
  );
}
