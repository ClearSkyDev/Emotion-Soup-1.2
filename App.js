import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation';
import { AppProvider } from './context/AppContext';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const snap = await getDoc(doc(db, 'users', u.uid));
        if (snap.exists()) setRole(snap.data().role);
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) return null;

  return (
    <AppProvider>
      <NavigationContainer>
        <Navigation user={user} role={role} />
      </NavigationContainer>
    </AppProvider>
  );
}
