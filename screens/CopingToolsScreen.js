import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function CopingToolsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Coping Tools</Text>
      <View style={styles.tool}>
        <Text style={styles.toolTitle}>1. Take Deep Breaths</Text>
        <Text style={styles.toolDesc}>Breathe in slowly, hold it, then breathe out to calm down.</Text>
      </View>
      <View style={styles.tool}>
        <Text style={styles.toolTitle}>2. Journal</Text>
        <Text style={styles.toolDesc}>Write or draw how you feel to let the feelings out.</Text>
      </View>
      <View style={styles.tool}>
        <Text style={styles.toolTitle}>3. Talk to a Friend</Text>
        <Text style={styles.toolDesc}>Share your feelings with someone you trust.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  tool: { marginBottom: 20 },
  toolTitle: { fontSize: 18, fontWeight: 'bold' },
  toolDesc: { marginTop: 4 },
});
