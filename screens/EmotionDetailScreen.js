import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import EmotionSliders from '../components/EmotionSliders';
import { useApp } from '../context/AppContext';

export default function EmotionDetailScreen({ route, navigation }) {
  const { emotion } = route.params;
  const { selectedEmotions, setSelectedEmotions } = useApp();
  const [size, setSize] = useState(50);
  const [temperature, setTemperature] = useState(0);

  const addToSoup = () => {
    const newEmotion = { ...emotion, size, temperature };
    setSelectedEmotions([...selectedEmotions, newEmotion]);
    navigation.navigate('Soup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{emotion.id}</Text>
      <EmotionSliders
        sizeValue={size}
        setSizeValue={setSize}
        tempValue={temperature}
        setTempValue={setTemperature}
      />
      <Button title="Add to Soup" onPress={addToSoup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
