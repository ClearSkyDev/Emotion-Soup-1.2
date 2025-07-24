import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Alert } from 'react-native';

export default async function logEmotionEntry({
  emotion,
  size,
  temperature,
  helpRequested = false,
}) {
  const user = auth.currentUser;
  if (!user) {
    Alert.alert('Not Signed In', 'Please log in to log emotions.');
    return;
  }

  try {
    await addDoc(collection(db, 'users', user.uid, 'emotions'), {
      emotion,
      size,
      temperature,
      helpRequested,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.error('Failed to log emotion entry:', err);
    Alert.alert('Error', 'Could not save your entry. Please try again later.');
  }
}
