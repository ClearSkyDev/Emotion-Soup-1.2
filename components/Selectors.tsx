import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

interface SelectorProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
}

export function Selector({ label, value, onChange }: SelectorProps) {
  return (
    <View className="my-2">
      <Text>{label}: {value}</Text>
      <Slider minimumValue={0} maximumValue={10} value={value} onValueChange={onChange} />
    </View>
  );
}
