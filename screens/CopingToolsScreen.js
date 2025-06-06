import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Animated, TextInput } from 'react-native';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import { auth, db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function CopingToolsScreen() {
  const [tool, setTool] = useState(null);
  const [journalText, setJournalText] = useState('');
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const loopRef = useRef(null);

  const logUsage = async (selected) => {
    const user = auth.currentUser;
    if (!user) return;
    await addDoc(collection(db, 'users', user.uid, 'copingLogs'), {
      tool: selected,
      timestamp: serverTimestamp(),
    });
  };

  const startBreathing = () => {
    setTool('breathing');
    logUsage('breathing');
  };

  useEffect(() => {
    if (tool === 'breathing') {
      loopRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, { toValue: 1, duration: 3000, useNativeDriver: false }),
          Animated.timing(scaleAnim, { toValue: 0, duration: 3000, useNativeDriver: false }),
        ])
      );
      loopRef.current.start();
    } else if (loopRef.current) {
      loopRef.current.stop();
      scaleAnim.setValue(0);
    }
    return () => {
      if (loopRef.current) loopRef.current.stop();
    };
  }, [tool]);

  const saveJournal = () => {
    logUsage('journaling');
    setJournalText('');
  };

  return (
    <View style={styles.container}>
      {!tool && (
        <>
          <Button title="Breathing Tool" onPress={startBreathing} />
          <Button title="Drawing Tool" onPress={() => { setTool('drawing'); logUsage('drawing'); }} />
          <Button title="Journaling Tool" onPress={() => { setTool('journaling'); logUsage('journaling'); }} />
        </>
      )}

      {tool === 'breathing' && (
        <View style={styles.toolContainer}>
          <Animated.View
            style={[styles.circle, { transform: [{ scale: scaleAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 2] }) }] }]}
          />
          <Button title="Back" onPress={() => setTool(null)} />
        </View>
      )}

      {tool === 'drawing' && (
        <View style={styles.toolContainer}>
          <SketchCanvas style={styles.canvas} />
          <Button title="Back" onPress={() => setTool(null)} />
        </View>
      )}

      {tool === 'journaling' && (
        <View style={styles.toolContainer}>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Write your thoughts..."
            value={journalText}
            onChangeText={setJournalText}
          />
          <Button title="Save" onPress={saveJournal} />
          <Button title="Back" onPress={() => setTool(null)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  toolContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' },
  circle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#93c5fd', marginBottom: 20 },
  canvas: { flex: 1, width: '100%', backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, width: '100%', minHeight: 150, marginBottom: 10 },
});
