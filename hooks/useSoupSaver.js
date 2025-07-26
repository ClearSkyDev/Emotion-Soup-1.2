import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Alert } from 'react-native';

export default async function saveSoup(name, emotions) {
  const user = auth.currentUser;
  if (!user) {
    Alert.alert('Not Signed In', 'Please log in to save your soup.');
    return;
  }
  try {
    await addDoc(collection(db, 'users', user.uid, 'soups'), {
      name,
      emotions,
      timestamp: serverTimestamp(),
    });
    Alert.alert('Saved', 'Your soup has been saved!');
  } catch (err) {
    console.error('Failed to save soup:', err);
    Alert.alert('Error', 'Could not save your soup. Please try again later.');
  }
}
