import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import EmotionDetailScreen from './screens/EmotionDetailScreen';
import SoupScreen from './screens/SoupScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Emotion Soup' }} />
      <Stack.Screen name="EmotionDetail" component={EmotionDetailScreen} options={{ title: 'Feeling' }} />
      <Stack.Screen name="Soup" component={SoupScreen} options={{ title: 'Your Soup' }} />
    </Stack.Navigator>
  );
}
