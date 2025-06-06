import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Timer({ initialSeconds = 300 }) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((sec) => {
          if (sec <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return sec - 1;
        });
      }, 1000);
    } else if (!running && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const reset = () => {
    setSecondsLeft(initialSeconds);
    setRunning(false);
  };

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime()}</Text>
      <View style={styles.buttons}>
        <Button
          title={running ? 'Pause' : 'Start'}
          onPress={() => setRunning(!running)}
        />
        <Button title="Reset" onPress={reset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 20 },
  time: { fontSize: 32, marginBottom: 10 },
  buttons: { flexDirection: 'row', width: 200, justifyContent: 'space-between' },
});
