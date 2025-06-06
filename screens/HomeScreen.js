import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import PuffBall from '../components/PuffBall';
import { useApp } from '../context/AppContext';

const EMOTIONS = [
  { id: 'anger', color: '#f87171' },
  { id: 'sadness', color: '#60a5fa' },
  { id: 'happiness', color: '#facc15' },
  { id: 'fear', color: '#a78bfa' },
  { id: 'love', color: '#fb7185' },
  // add more as needed
];

export default function HomeScreen({ navigation }) {
  const { setSelectedEmotions } = useApp();

  const selectEmotion = (emotion) => {
    setSelectedEmotions([emotion]);
    navigation.navigate('EmotionDetail', { emotion });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling?</Text>
      <FlatList
        data={EMOTIONS}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectEmotion(item)} style={styles.item}>
            <PuffBall color={item.color} />
            <Text>{item.id}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40 },
  title: { fontSize: 20, marginBottom: 20 },
  item: { alignItems: 'center', margin: 10 },
});
