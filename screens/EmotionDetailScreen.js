import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { useApp } from '../context/AppContext';

export default function EmotionDetailScreen({ route, navigation }) {
  const { emotion } = route.params;
  const { selectedEmotions, setSelectedEmotions } = useApp();
  const [size, setSize] = useState(5);
  const [temperature, setTemperature] = useState(5);

  const addToSoup = () => {
    const newEmotion = { ...emotion, size, temperature };
    setSelectedEmotions([...selectedEmotions, newEmotion]);
    navigation.navigate('Soup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{emotion.id}</Text>
      <Text>Size</Text>
      <Slider style={{ width: 200 }} minimumValue={1} maximumValue={10} value={size} onValueChange={setSize} />
      <Text>Temperature</Text>
      <Slider style={{ width: 200 }} minimumValue={1} maximumValue={10} value={temperature} onValueChange={setTemperature} />
      <Button title="Add to Soup" onPress={addToSoup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
