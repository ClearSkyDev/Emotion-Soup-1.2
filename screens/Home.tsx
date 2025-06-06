import React from 'react';
import { View, ScrollView } from 'react-native';
import PuffBall from '@components/PuffBall';
import { useEmotionStore } from '@store/emotionStore';

const freeEmotions = ['happy', 'sad'];
const premiumEmotions = ['angry', 'fear'];

export default function Home({ navigation }: any) {
  const premium = useEmotionStore((s) => s.premium);
  const setEmotion = useEmotionStore((s) => s.setEmotion);

  const emotions = premium ? [...freeEmotions, ...premiumEmotions] : freeEmotions;

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      {emotions.map((e) => (
        <PuffBall
          key={e}
          emotion={e}
          onPress={() => {
            setEmotion(e);
            navigation.navigate('EmotionDetail');
          }}
        />
      ))}
    </ScrollView>
  );
}
