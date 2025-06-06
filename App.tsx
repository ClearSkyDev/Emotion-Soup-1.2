import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '@screens/Splash';
import Home from '@screens/Home';
import EmotionDetail from '@screens/EmotionDetail';
import Soup from '@screens/Soup';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  EmotionDetail: undefined;
  Soup: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList, 'root'>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator id="root" initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="EmotionDetail" component={EmotionDetail} />
        <Stack.Screen name="Soup" component={Soup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
