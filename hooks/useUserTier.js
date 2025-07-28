import React from 'react';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function useUserTier() {
  const [tier, setTier] = useState('free');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      setLoading(false);
      return;
    }

    const fetchTier = async () => {
      try {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTier(data.subscriptionTier || data.tier || 'free');
        } else {
          setTier('free');
        }
      } catch (err) {
        console.error('Failed to fetch user tier:', err);
        setTier('free');
      } finally {
        setLoading(false);
      }
    };

    fetchTier();
  }, []);

  return { tier, loading };
}
