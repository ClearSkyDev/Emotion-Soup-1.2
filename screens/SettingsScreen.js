import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import { useApp } from '../context/AppContext';

export default function SettingsScreen() {
  const {
    highContrast,
    setHighContrast,
    reduceMotion,
    setReduceMotion,
    textSize,
    setTextSize,
  } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accessibility</Text>

      <View style={styles.row}>
        <Text style={styles.label}>High Contrast Mode</Text>
        <Switch value={highContrast} onValueChange={setHighContrast} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Reduce Motion</Text>
        <Switch value={reduceMotion} onValueChange={setReduceMotion} />
      </View>

      <Text style={styles.label}>Text Size: {textSize}</Text>
      <Slider
        style={{ width: '100%' }}
        minimumValue={14}
        maximumValue={24}
        step={1}
        value={textSize}
        onValueChange={setTextSize}
      />
      <Text style={{ fontSize: textSize, marginTop: 20 }}>Preview text</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: { fontSize: 16 },
});
