import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import * as Speech from 'expo-speech';
import { useApp } from '../context/AppContext';
import PuffBall from '../components/PuffBall';
import saveSoup from '../hooks/useSoupSaver';
import { generateSoupBuddyResponse } from '../utils/aiBehavior';

export default function SoupScreen() {
  const { selectedEmotions, age } = useApp();
  const [name, setName] = useState('');
  const [buddyText, setBuddyText] = useState('');
  const [loading, setLoading] = useState(false);

  const askBuddy = async () => {
    setLoading(true);
    try {
      const text = generateSoupBuddyResponse(selectedEmotions, age || '8-12');
      setBuddyText(text);
      Speech.speak(text);
    } catch (err) {
      setBuddyText("I'm not sure what to say, but let's take a deep breath together.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    await saveSoup(name || 'My Soup', selectedEmotions);
    setName('');
  };

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
      <TextInput
        placeholder="Name your soup"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button title="Ask Soup Buddy" onPress={askBuddy} />
      {loading && <ActivityIndicator style={{ marginVertical: 10 }} />}
      {buddyText !== '' && (
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>{buddyText}</Text>
        </View>
      )}
      <Button title="Save Soup" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40 },
  title: { fontSize: 20, marginBottom: 20 },
  item: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
    width: '90%',
    borderRadius: 6,
  },
  bubble: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginVertical: 10,
    width: '90%',
  },
  bubbleText: {
    fontSize: 16,
  },
});
