import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEmotionStore } from '@store/emotionStore';

export default function Splash() {
  const navigation = useNavigation();
  const age = useEmotionStore((s) => s.age);
  const setAge = useEmotionStore((s) => s.setAge);

  useEffect(() => {
    if (age) {
      navigation.navigate('Home' as never);
    }
  }, [age]);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl mb-4">Welcome to Emotion Soup!</Text>
      {[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].map((a) => (
        <Button key={a} title={`I'm ${a}`} onPress={() => setAge(a)} />
      ))}
    </View>
  );
}
