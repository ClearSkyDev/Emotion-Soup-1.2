import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default async function logEmotionEntry({ emotion, size, temperature }) {
  const user = auth.currentUser;
  if (!user) return;

  await addDoc(collection(db, 'journal_entries'), {
    userId: user.uid,
    emotion,
    size,
    temperature,
    timestamp: serverTimestamp(),
  });
}
