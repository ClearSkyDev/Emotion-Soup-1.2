import React, { useRef, useEffect } from 'react';
import { Animated, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

function getFace(emotion) {
  switch (emotion) {
    case 'anger':
      return '😡';
    case 'sadness':
      return '😢';
    case 'happiness':
      return '😄';
    case 'fear':
      return '😱';
    case 'love':
      return '😍';
    default:
      return '🙂';
  }
}

export default function PuffBall({ color, size = 50, emotion, onPress }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.08,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          styles.ball,
          { backgroundColor: color, width: size, height: size, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text style={styles.face}>{getFace(emotion)}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

PuffBall.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number,
  emotion: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  ball: {
    borderRadius: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 5,
  },
  face: {
    fontSize: 28,
  },
});
