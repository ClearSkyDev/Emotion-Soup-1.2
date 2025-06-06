import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { db } from '@utils/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Soup() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const load = async () => {
      const q = query(collection(db, 'emotions'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setData(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="p-2 border-b border-gray-200">
          <Text>{item.emotion}</Text>
        </View>
      )}
    />
  );
}
