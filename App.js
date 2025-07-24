import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import Navigation from './navigation';
import { AppProvider } from './context/AppContext';
import { ModeProvider } from './lib/mode_controller';

enableScreens();

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
