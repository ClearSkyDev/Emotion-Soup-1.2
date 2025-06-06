import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export default function SplashScreen({ navigation }) {
  const { setAge } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Emotion Soup</Text>
      <Button title="I'm 4-7" onPress={() => { setAge('4-7'); navigation.navigate('Home'); }} />
      <Button title="I'm 8-12" onPress={() => { setAge('8-12'); navigation.navigate('Home'); }} />
      <Button title="I'm 13-17" onPress={() => { setAge('13-17'); navigation.navigate('Home'); }} />
      <Button title="I'm 18-25" onPress={() => { setAge('18-25'); navigation.navigate('Home'); }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
