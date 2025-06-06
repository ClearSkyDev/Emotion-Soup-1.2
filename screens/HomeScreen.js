import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import EmotionPuffBall from '../components/EmotionPuffBall';
import Timer from '../components/Timer';
import { useApp } from '../context/AppContext';
import useUserTier from '../hooks/useUserTier';
import ModeSwitcher from '../lib/ui/ModeSwitcher';
import { useMode } from '../lib/mode_controller';
import SoupMode from '../lib/modes/soup_mode';
import IceCreamMode from '../lib/modes/ice_cream_mode';
import PotionMode from '../lib/modes/potion_mode';
import MaskMode from '../lib/modes/mask_mode';
import GardenMode from '../lib/modes/garden_mode';

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
  const { tier, loading } = useUserTier();
  const { currentMode } = useMode();

  const selectEmotion = (emotion) => {
    if ((emotion.id === 'love' || emotion.id === 'fear') && tier !== 'premium') {
      navigation.navigate('Subscribe');
      return;
    }
    setSelectedEmotions([emotion]);
    navigation.navigate('EmotionDetail', { emotion });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={{ marginTop: 50 }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>How are you feeling?</Text>
        <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      </View>
      <Timer />
      <ModeSwitcher />
      <Button title="Coping Tools" onPress={() => navigation.navigate('CopingTools')} />
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
      {tier !== 'premium' && (
        <Button
          title="Upgrade to Premium"
          onPress={() => navigation.navigate('Subscribe')}
        />
      )}

      {currentMode === 'soup' && <SoupMode />}
      {currentMode === 'iceCream' && <IceCreamMode />}
      {currentMode === 'potion' && <PotionMode />}
      {currentMode === 'mask' && <MaskMode />}
      {currentMode === 'garden' && <GardenMode />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', marginBottom: 20 },
  title: { fontSize: 20 },
  item: { alignItems: 'center', margin: 10 },
});
