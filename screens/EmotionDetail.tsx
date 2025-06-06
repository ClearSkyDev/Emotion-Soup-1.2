import React from 'react';
import { View, Text, Button } from 'react-native';
import { Selector } from '@components/Selectors';
import { useEmotionStore } from '@store/emotionStore';
import { getGuidance } from '@lib/EmotionAI';
import { db } from '@utils/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function EmotionDetail() {
  const emotion = useEmotionStore((s) => s.emotion)!;
  const age = useEmotionStore((s) => s.age)!;
  const bodily = useEmotionStore((s) => s.bodily);
  const temperature = useEmotionStore((s) => s.temperature);
  const size = useEmotionStore((s) => s.size);
  const setBodily = useEmotionStore((s) => s.setBodily);
  const setTemperature = useEmotionStore((s) => s.setTemperature);
  const setSize = useEmotionStore((s) => s.setSize);

  const guidance = getGuidance(emotion, age);

  const saveEmotion = async () => {
    await addDoc(collection(db, 'emotions'), {
      emotion,
      bodily,
      temperature,
      size,
      createdAt: Timestamp.now(),
    });
  };

  return (
    <View className="p-4">
      <Text className="text-2xl mb-2">{emotion}</Text>
      <Selector label="Bodily sensation" value={bodily} onChange={setBodily} />
      <Selector label="Temperature" value={temperature} onChange={setTemperature} />
      <Selector label="Size" value={size} onChange={setSize} />
      <Text className="my-2">{guidance.narration}</Text>
      {guidance.suggestions.map((s) => (
        <Text key={s}>- {s}</Text>
      ))}
      <Button title="Save" onPress={saveEmotion} />
    </View>
  );
}
