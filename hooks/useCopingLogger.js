import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Alert } from 'react-native';

/**
 * Log a coping tool usage for the current user.
 *
 * @param {string} tool One of 'breathing', 'drawing', or 'journal'
 */
export default async function logCopingTool(tool) {
  const user = auth.currentUser;
  if (!user) {
    Alert.alert('Not Signed In', 'Please log in to record coping tools.');
    return;
  }

  try {
    await addDoc(collection(db, 'users', user.uid, 'copingLogs'), {
      tool,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.error('Failed to log coping tool:', err);
    Alert.alert('Error', 'Could not log this action. Please try again later.');
  }
}
