import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Simple placeholder icons
const MusicIcon = () => <Text style={{fontSize: 20}}>🎵</Text>;

export default function FreezeDanceGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [freezeCount, setFreezeCount] = useState(0);

  const emotions = [
    { name: 'Joy', instruction: "Freeze like you're happy!" },
    { name: 'Sadness', instruction: "Freeze like you're sad!" },
    { name: 'Anger', instruction: "Freeze like you're angry!" },
    { name: 'Fear', instruction: "Freeze like you're scared!" },
    { name: 'Surprise', instruction: "Freeze like you're surprised!" },
  ];

  const startGame = () => {
    setIsPlaying(true);
    setFreezeCount(0);
    setTimeout(freezeMusic, Math.random() * 5000 + 3000);
  };

  const freezeMusic = () => {
    if (!isPlaying) return;

    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setCurrentEmotion(randomEmotion.name);
    setFreezeCount(prev => prev + 1);

    setTimeout(() => {
      setCurrentEmotion(null);
      if (freezeCount < 2) {
        setTimeout(freezeMusic, Math.random() * 5000 + 3000);
      } else {
        endGame();
      }
    }, 3000);
  };

  const endGame = () => {
    setIsPlaying(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feelings Freeze Dance</Text>
      {!isPlaying ? (
        <>
          <Text style={styles.description}>
            Dance while the music plays! When it stops, freeze in the emotion shown.
          </Text>
          <TouchableOpacity style={styles.button} onPress={startGame}>
            <MusicIcon />
            <Text style={styles.buttonText}>Start Dancing</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.gameArea}>
          {currentEmotion ? (
            <View style={styles.freezeArea}>
              <Text style={styles.freezeText}>FREEZE!</Text>
              <Text>{emotions.find(e => e.name === currentEmotion)?.instruction}</Text>
            </View>
          ) : (
            <View style={styles.danceArea}>
              <Text style={styles.danceText}>Dance!</Text>
              <Text style={styles.danceEmoji}>💃🕺</Text>
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={endGame}>
            <MusicIcon />
            <Text style={styles.buttonText}>Stop Dancing</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  description: { marginBottom: 20 },
  button: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#4a90e2', borderRadius: 5 },
  buttonText: { color: 'white', marginLeft: 8 },
  gameArea: { alignItems: 'center' },
  freezeArea: { alignItems: 'center', marginBottom: 20 },
  freezeText: { fontSize: 32, fontWeight: 'bold', color: '#4a90e2' },
  danceArea: { alignItems: 'center', marginBottom: 20 },
  danceText: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  danceEmoji: { fontSize: 32 },
});
