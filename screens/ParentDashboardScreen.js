import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Dimensions, Alert } from 'react-native';
import { Appbar, Card, Text, List, Divider } from 'react-native-paper';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  limit,
} from 'firebase/firestore';
import { LineChart } from 'react-native-chart-kit';

export default function ParentDashboardScreen({ navigation, userId }) {
  const [recentEmotions, setRecentEmotions] = useState([]);
  const [trendData, setTrendData] = useState({ labels: [], data: [] });
  const [alerts, setAlerts] = useState([]);

  if (!userId) {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Parent Dashboard" />
        </Appbar.Header>
        <Text style={{ margin: 16 }}>No user selected.</Text>
      </View>
    );
  }

  useEffect(() => {
    const uid = userId;
    if (!uid) return;

    const fetchData = async () => {
      try {
        const emotionsRef = collection(db, 'users', uid, 'emotions');
        const recentQuery = query(
          emotionsRef,
          orderBy('timestamp', 'desc'),
          limit(10)
        );
        const recentSnap = await getDocs(recentQuery);
        const recent = recentSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setRecentEmotions(recent);

        const start = new Date();
        start.setHours(0, 0, 0, 0);
        start.setDate(start.getDate() - 6);
        const trendQuery = query(
          emotionsRef,
          where('timestamp', '>=', start),
          orderBy('timestamp', 'asc')
        );
        const trendSnap = await getDocs(trendQuery);
        const counts = {};
        trendSnap.forEach((doc) => {
          const dateStr = doc
            .data()
            .timestamp.toDate()
            .toISOString()
            .slice(0, 10);
          counts[dateStr] = (counts[dateStr] || 0) + 1;
        });
        const labels = [];
        const data = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const key = d.toISOString().slice(0, 10);
          labels.push(d.toISOString().slice(5, 10));
          data.push(counts[key] || 0);
        }
        setTrendData({ labels, data });

        const alertQuery = query(
          collection(db, 'users', uid, 'alerts'),
          where('flagged', '==', true),
          orderBy('timestamp', 'desc')
        );
        const alertSnap = await getDocs(alertQuery);
        const alertList = alertSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setAlerts(alertList);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
        Alert.alert(
          'Error',
          'Unable to load dashboard information. Please check your connection and try again.'
        );
      }
    };

    fetchData();
  }, [userId]);

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Parent Dashboard" />
      </Appbar.Header>

      <Card style={styles.section}>
        <Card.Title title="Recent Emotions" />
        <Card.Content>
          {recentEmotions.map((e) => (
            <Text key={e.id}>{`${e.emotion} - ${e.timestamp?.toDate?.().toLocaleString()}`}</Text>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Title title="Emotion Trend (7 days)" />
        <Card.Content>
          {trendData.labels.length > 0 && (
            <LineChart
              data={{ labels: trendData.labels, datasets: [{ data: trendData.data }] }}
              width={Dimensions.get('window').width - 64}
              height={220}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              bezier
              style={{ marginVertical: 8 }}
            />
          )}
        </Card.Content>
      </Card>

      <List.Section title="Alerts">
        {alerts.map((a) => (
          <View key={a.id} style={styles.alertItem}>
            <List.Item
              title={a.emotions?.join(', ')}
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
  container: { flex: 1 },
  section: { margin: 16 },
  alertItem: { backgroundColor: '#fff' },
});
