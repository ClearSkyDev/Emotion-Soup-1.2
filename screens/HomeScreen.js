import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import EmotionPuffBall from '../components/EmotionPuffBall';
import Timer from '../components/Timer';
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
      <View style={styles.header}>
        <Text style={styles.title}>How are you feeling?</Text>
        <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      </View>
      <Button title="Coping Tools" onPress={() => navigation.navigate('CopingTools')} />
      <Timer />
      <FlatList
        data={EMOTIONS}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <EmotionPuffBall
              emotion={item.id}
              color={item.color}
              size={70}
              onPress={() => selectEmotion(item)}
            />
            <Text>{item.id}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', marginBottom: 20 },
  title: { fontSize: 20 },
  item: { alignItems: 'center', margin: 10 },
});
