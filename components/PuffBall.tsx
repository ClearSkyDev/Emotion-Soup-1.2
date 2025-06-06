import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface PuffBallProps {
  emotion: string;
  onPress: () => void;
}

export default function PuffBall({ emotion, onPress }: PuffBallProps) {
  return (
    <TouchableOpacity className="m-2 p-4 rounded-full bg-blue-200" onPress={onPress}>
      <Text className="text-center text-lg">{emotion}</Text>
    </TouchableOpacity>
  );
}
