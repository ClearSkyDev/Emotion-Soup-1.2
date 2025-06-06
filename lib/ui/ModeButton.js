import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import useAttemptModeSwitch from '../attempt_mode_switch';

export default function ModeButton({ label, mode }) {
  const attemptSwitch = useAttemptModeSwitch();

  return (
    <TouchableOpacity style={styles.button} onPress={() => attemptSwitch(mode)}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    margin: 4,
    backgroundColor: '#eee',
    borderRadius: 4,
  },
  text: { fontSize: 14 },
});
