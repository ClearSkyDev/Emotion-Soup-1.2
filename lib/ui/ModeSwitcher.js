import React from 'react';
import { View, StyleSheet } from 'react-native';
import ModeButton from './ModeButton';

export default function ModeSwitcher() {
  return (
    <View style={styles.row}>
      <ModeButton label="Soup" mode="soup" />
      <ModeButton label="Ice Cream" mode="iceCream" />
      <ModeButton label="Potion" mode="potion" />
      <ModeButton label="Mask" mode="mask" />
      <ModeButton label="Garden" mode="garden" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
