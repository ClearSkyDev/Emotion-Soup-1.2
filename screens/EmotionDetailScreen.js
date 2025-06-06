import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import * as Speech from 'expo-speech';
import EmotionPuffBall from '../components/EmotionPuffBall';
import EmotionSliders from '../components/EmotionSliders';
import { useApp } from '../context/AppContext';
import EmotionStoryBox from '../components/EmotionStoryBox';
import useUserTier from '../hooks/useUserTier';
import logEmotionEntry from '../hooks/useEmotionLogger';

export default function EmotionDetailScreen({ route, navigation }) {
  const { emotion } = route.params;
  const { selectedEmotions, setSelectedEmotions } = useApp();
  const [size, setSize] = useState(50);
  const [temperature, setTemperature] = useState(0);
  const [helpRequested, setHelpRequested] = useState(false);
  const { tier, loading } = useUserTier();

  const speakPrompt = () => {
    Speech.speak(`You chose ${emotion.id}. What does it feel like in your body?`);
  };

  const addToSoup = async () => {
    const newEmotion = { ...emotion, size, temperature };
    setSelectedEmotions([...selectedEmotions, newEmotion]);
    await logEmotionEntry({
      emotion: emotion.id,
      size,
      temperature,
      helpRequested,
    });
    navigation.navigate('Soup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{emotion.id}</Text>
      <Button title="Listen" onPress={speakPrompt} />
      <EmotionPuffBall
        emotion={emotion.id}
        color={emotion.color}
        size={size}
        onTripleTap={() => setHelpRequested(true)}
      />
      <EmotionSliders
        sizeValue={size}
        setSizeValue={setSize}
        tempValue={temperature}
        setTempValue={setTemperature}
      />
      <Button title="Add to Soup" onPress={addToSoup} />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 12 }} />
      ) : tier === 'premium' ? (
        <EmotionStoryBox emotion={emotion.id} size={size} temp={temperature} />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 12 }}>
          Upgrade to Premium to see a custom story!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
