import { StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export default function SoupScreen() {
  const { selectedEmotions } = useApp();
  const data = Array.isArray(selectedEmotions) ? selectedEmotions : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Soup</Text>
      {data.length === 0 ? (
        <Text>No emotions selected yet.</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => (item.id ? item.id + index : String(index))}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.id} - size {item.size} - temp {item.temperature}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40 },
  title: { fontSize: 20, marginBottom: 20 },
  item: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
});
