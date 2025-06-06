import React, { useRef, useEffect } from 'react';
import { Text, TouchableWithoutFeedback, Animated, StyleSheet, Vibration } from 'react-native';

export default function EmotionPuffBall({ emotion, color, size = 100, onPress }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handlePress = () => {
    Vibration.vibrate(10);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.15,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (onPress) onPress();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View
        style={[
          styles.puff,
          {
            backgroundColor: color,
            width: size,
            height: size,
            borderRadius: size / 2,
            transform: [{ scale: Animated.multiply(scaleAnim, pulseAnim) }],
            shadowColor: color,
          },
        ]}
      >
        <Text style={styles.face}>😊</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  puff: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 5,
  },
  face: {
    fontSize: 32,
  },
});
