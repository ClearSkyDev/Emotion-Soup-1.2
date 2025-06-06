import { Alert } from 'react-native';
import { useMode } from './mode_controller';
import { useApp } from '../context/AppContext';
import useUserTier from '../hooks/useUserTier';

export default function useAttemptModeSwitch() {
  const { switchMode } = useMode();
  const { age } = useApp();
  const { tier } = useUserTier();

  return (mode) => {
    if (age && age < 6 && mode !== 'soup') {
      Alert.alert('Locked', 'This mode is for ages 6 and up.');
    } else if (tier !== 'premium' && mode !== 'soup') {
      Alert.alert('Upgrade', 'Subscribe to access this mode.');
    } else {
      switchMode(mode);
    }
  };
}
