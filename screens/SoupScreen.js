import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import PuffBall from '../components/PuffBall';

export default function SoupScreen() {
  const { selectedEmotions } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Soup</Text>
      <FlatList
        data={selectedEmotions}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <PuffBall color={item.color} size={item.size} />
            <Text>{item.id} - size {item.size} - temp {item.temperature}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40 },
  title: { fontSize: 20, marginBottom: 20 },
  item: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
});
