import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default async function logEmotionEntry({
  emotion,
  size,
  temperature,
  helpRequested = false,
}) {
  const user = auth.currentUser;
  if (!user) return;

  await addDoc(collection(db, 'users', user.uid, 'emotions'), {
    emotion,
    size,
    temperature,
    helpRequested,
    timestamp: serverTimestamp(),
  });
}
