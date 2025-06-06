import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, List, Divider } from 'react-native-paper';
import { auth, db } from '../firebase';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';

export default function ParentDashboardScreen() {
  const [topEmotions, setTopEmotions] = useState([]);
  const [trend, setTrend] = useState([]);
  const [coping, setCoping] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const fetchData = async () => {
      // fetch emotions
      const emoSnap = await getDocs(collection(db, 'users', uid, 'emotions'));
      const counts = {};
      const daily = {};
      emoSnap.forEach((doc) => {
        const d = doc.data();
        counts[d.emotion] = (counts[d.emotion] || 0) + 1;
        const date = d.timestamp?.toDate?.().toISOString().slice(0, 10);
        if (date) daily[date] = (daily[date] || 0) + 1;
      });
      const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      setTopEmotions(sorted);

      const last7 = Object.entries(daily)
        .sort((a, b) => (a[0] > b[0] ? 1 : -1))
        .slice(-7);
      setTrend(last7);

      // coping tools summary (if exists)
      try {
        const copeSnap = await getDocs(collection(db, 'users', uid, 'coping_tools'));
        const list = [];
        copeSnap.forEach((d) => list.push(d.data()));
        setCoping(list);
      } catch (e) {
        setCoping([]);
      }

      // alerts
      const alertQuery = query(
        collection(db, 'users', uid, 'alerts'),
        where('flagged', '==', true),
        orderBy('timestamp', 'desc')
      );
      const alertSnap = await getDocs(alertQuery);
      const alertList = alertSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setAlerts(alertList);
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text variant="titleLarge" style={styles.welcome}>Welcome, Parent!</Text>

      <Card style={styles.section}>
        <Card.Title title="Top Emotions" />
        <Card.Content>
          {topEmotions.map(([emotion, count]) => (
            <Text key={emotion}>{emotion}: {count}</Text>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Title title="Past 7 Days" />
        <Card.Content>
          {trend.map(([date, count]) => (
            <Text key={date}>{date}: {count}</Text>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Title title="Coping Tools" />
        <Card.Content>
          {coping.length === 0 && <Text>No data</Text>}
          {coping.map((c, idx) => (
            <Text key={idx}>{c.tool}: {c.count}</Text>
          ))}
        </Card.Content>
      </Card>

      <List.Section title="Hidden Alerts">
        {alerts.map((a) => (
          <View key={a.id} style={styles.alertItem}>
            <List.Item
              title={`${a.emotions?.join(', ')}`}
              description={`${a.reason} - ${a.timestamp?.toDate?.().toLocaleDateString()}`}
            />
            <Divider />
          </View>
        ))}
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  welcome: { marginBottom: 16 },
  section: { marginBottom: 16 },
  alertItem: { backgroundColor: '#fff' },
});
