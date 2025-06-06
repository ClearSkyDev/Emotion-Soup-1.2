import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function PuffBall({ color, size = 50 }) {
  return <View style={[styles.ball, { backgroundColor: color, width: size, height: size }]} />;
}

const styles = StyleSheet.create({
  ball: {
    borderRadius: 50,
    margin: 10,
  },
});
