import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

/**
 * Log a coping tool usage for the current user.
 *
 * @param {string} tool One of 'breathing', 'drawing', or 'journal'
 */
export default async function logCopingTool(tool) {
  const user = auth.currentUser;
  if (!user) return;

  await addDoc(collection(db, 'users', user.uid, 'copingLogs'), {
    tool,
    timestamp: serverTimestamp(),
  });
}
