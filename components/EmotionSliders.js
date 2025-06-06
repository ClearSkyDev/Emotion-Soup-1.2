import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

export default function EmotionSliders({ sizeValue, setSizeValue, tempValue, setTempValue }) {
  return (
    <View style={styles.container}>
      <View style={styles.sliderBlock}>
        <Text style={styles.label}>How BIG does it feel?</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={sizeValue}
          onValueChange={setSizeValue}
          minimumTrackTintColor="#00BFFF"
          maximumTrackTintColor="#ccc"
        />
        <Text style={styles.value}>{sizeValue}/100</Text>
      </View>

      <View style={styles.sliderBlock}>
        <Text style={styles.label}>Is it HOT or COLD?</Text>
        <Slider
          style={styles.slider}
          minimumValue={-50}
          maximumValue={50}
          step={1}
          value={tempValue}
          onValueChange={setTempValue}
          minimumTrackTintColor="#FF4500"
          maximumTrackTintColor="#00CED1"
        />
        <Text style={styles.value}>
          {tempValue < 0 ? 'Cold' : tempValue > 0 ? 'Hot' : 'Neutral'} ({tempValue}°)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 10,
  },
  sliderBlock: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  value: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
  },
});
