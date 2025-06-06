import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import logCopingTool from '../hooks/useCopingLogger';

export default function CopingToolsScreen() {
  const [journalEntry, setJournalEntry] = useState('');
  const [tool, setTool] = useState(null);

  const startBreathing = async () => {
    setTool('breathing');
    await logCopingTool('breathing');
  };

  const startDrawing = async () => {
    setTool('drawing');
    await logCopingTool('drawing');
  };

  const saveJournal = async () => {
    await logCopingTool('journal');
    setJournalEntry('');
    setTool(null);
  };

  if (tool === 'breathing') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Breathe in... Breathe out...</Text>
        <Button title="Done" onPress={() => setTool(null)} />
      </View>
    );
  }

  if (tool === 'drawing') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Imagine a drawing pad here!</Text>
        <Button title="Done" onPress={() => setTool(null)} />
      </View>
    );
  }

  if (tool === 'journal') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Write about your feelings:</Text>
        <TextInput
          value={journalEntry}
          onChangeText={setJournalEntry}
          multiline
          style={styles.input}
        />
        <Button title="Save" onPress={saveJournal} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coping Tools</Text>
      <Button title="Breathing Exercise" onPress={startBreathing} />
      <Button title="Drawing Pad" onPress={startDrawing} />
      <Button title="Journal Entry" onPress={() => setTool('journal')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, width: '100%', minHeight: 100, marginBottom: 20, padding: 10 },
});
