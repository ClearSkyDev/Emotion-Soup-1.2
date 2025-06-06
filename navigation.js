import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AgeSelectionScreen from './screens/AgeSelectionScreen';
import HomeScreen from './screens/HomeScreen';
import EmotionDetailScreen from './screens/EmotionDetailScreen';
import SoupScreen from './screens/SoupScreen';
import SettingsScreen from './screens/SettingsScreen';
import ParentDashboardScreen from './screens/ParentDashboardScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

const Stack = createNativeStackNavigator();

export default function Navigation({ user, role }) {
  if (!user) {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign Up' }} />
      </Stack.Navigator>
    );
  }

  if (role === 'Parent') {
    return (
      <Stack.Navigator>
        <Stack.Screen name="ParentDashboard" component={ParentDashboardScreen} options={{ title: 'Parent Dashboard' }} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator initialRouteName="AgeSelect">
      <Stack.Screen name="AgeSelect" component={AgeSelectionScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Emotion Soup' }} />
      <Stack.Screen name="EmotionDetail" component={EmotionDetailScreen} options={{ title: 'Feeling' }} />
      <Stack.Screen name="Soup" component={SoupScreen} options={{ title: 'Your Soup' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name="ParentDashboard" component={ParentDashboardScreen} options={{ title: 'Parent Dashboard' }} />
    </Stack.Navigator>
  );
}
