import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function SubscribeScreen() {
  const [thanks, setThanks] = useState(false);

  const upgrade = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      Alert.alert('Not Signed In', 'Please log in or create an account to upgrade.');
      return;
    }
    try {
      await setDoc(
        doc(db, 'users', uid),
        { subscriptionTier: 'premium' },
        { merge: true }
      );
      setThanks(true);
    } catch (err) {
      console.error('Upgrade failed:', err);
      Alert.alert(
        'Upgrade Failed',
        'Could not upgrade at this time. Please check your connection and try again.'
      );
    }
  };

  return (
    <View style={styles.container}>
      {thanks ? (
        <Text style={styles.thanks}>Thank you!</Text>
      ) : (
        <>
          <Text style={styles.title}>Upgrade to Premium</Text>
          <Button title="Confirm Upgrade" onPress={upgrade} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  thanks: { fontSize: 24 },
});
