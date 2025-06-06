import React from 'react';
import { View, Text, StyleSheet, Image, Button, FlatList, Alert } from 'react-native';
import { useApp } from '../../context/AppContext';
import EmotionPuffBall from '../../components/EmotionPuffBall';
import { modeThemes } from '../mode_themes';
import { useMode } from '../mode_controller';
import { getNarratorResponse } from '../narrator_logic';

export default function GardenMode() {
  const { selectedEmotions } = useApp();
  const { currentMode } = useMode();
  const theme = modeThemes.garden;

  const interact = () => {
    if (selectedEmotions.length) {
      const message = getNarratorResponse(selectedEmotions[0], currentMode);
      Alert.alert('Narrator', message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={theme.background} style={styles.bg} />
      <Text style={styles.title}>Garden Mode</Text>
      <FlatList
        data={selectedEmotions}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <EmotionPuffBall color={item.color} size={item.size || 50} />
            <Text>{item.id}</Text>
          </View>
        )}
      />
      <Button title="Plant" onPress={interact} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  item: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  bg: { position: 'absolute', width: '100%', height: '100%', opacity: 0.1 },
});
