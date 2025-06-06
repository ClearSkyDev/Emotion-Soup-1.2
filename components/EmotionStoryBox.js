import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

/**
 * EmotionStoryBox displays a short story generated about the given emotion.
 * While the story is being generated, an ActivityIndicator is shown.
 *
 * @param {{emotion: string, size: number, temp: number}} props
 */
export default function EmotionStoryBox({ emotion, size, temp }) {
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app this would call an API like OpenAI. We simulate the delay.
    setLoading(true);
    const timer = setTimeout(() => {
      const storyText = generateSimpleStory(emotion, size, temp);
      setStory(storyText);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [emotion, size, temp]);

  return (
    <View style={styles.box}>
      <Text style={styles.title}>Story about {emotion}</Text>
      {loading ? (
        <ActivityIndicator size="small" color="#666" />
      ) : (
        <Text style={styles.story}>{story}</Text>
      )}
    </View>
  );
}

/**
 * generateSimpleStory creates a very short and kid-friendly story
 * describing the emotion, how big it feels and the temperature.
 */
export function generateSimpleStory(emotion, size, temp) {
  const intensity =
    size > 75
      ? 'very strong'
      : size < 25
      ? 'small and quiet'
      : 'just the right size';
  const temperature =
    temp > 25
      ? 'hot like a summer day'
      : temp < -25
      ? 'cold like snow'
      : temp > 0
      ? 'a little warm'
      : temp < 0
      ? 'a little chilly'
      : 'neutral and calm';

  return `One day, a kid felt ${emotion}. It was ${intensity} and felt ${temperature}. They took a deep breath, and slowly started to feel better.`;
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    marginVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  story: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
});
