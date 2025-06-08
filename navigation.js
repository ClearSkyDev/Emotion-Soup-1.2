import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import EmotionDetailScreen from './screens/EmotionDetailScreen';
import SoupScreen from './screens/SoupScreen';
import SettingsScreen from './screens/SettingsScreen';
import ParentDashboardScreen from './screens/ParentDashboardScreen';
import { auth } from './firebase';
import SubscribeScreen from './screens/SubscribeScreen';
import CopingToolsScreen from './screens/CopingToolsScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Emotion Soup' }} />
      <Stack.Screen name="EmotionDetail" component={EmotionDetailScreen} options={{ title: 'Feeling' }} />
      <Stack.Screen name="Soup" component={SoupScreen} options={{ title: 'Your Soup' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name="Subscribe" component={SubscribeScreen} options={{ title: 'Subscribe' }} />
      <Stack.Screen
        name="ParentDashboard"
        options={{ title: 'Parent Dashboard' }}
      >
        {(props) => (
          <ParentDashboardScreen
            {...props}
            userId={auth.currentUser?.uid}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="CopingTools" component={CopingToolsScreen} options={{ title: 'Coping Tools' }} />
    </Stack.Navigator>
  );
}
