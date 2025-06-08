import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import PropTypes from 'prop-types';

export default function EmotionDetailScreen({ route, navigation }) {
  const { emotion } = route.params;
  const { selectedEmotions, setSelectedEmotions } = useApp();
  const [size, setSize] = useState(5);
  const [temperature, setTemperature] = useState(5);

  const addToSoup = () => {
    const newEmotion = { ...emotion, size, temperature };
    setSelectedEmotions([...selectedEmotions, newEmotion]);
    navigation.navigate('Soup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{emotion.id}</Text>
      <Text>Size</Text>
      <Slider style={{ width: 200 }} minimumValue={1} maximumValue={10} value={size} onValueChange={setSize} />
      <Text>Temperature</Text>
      <Slider style={{ width: 200 }} minimumValue={1} maximumValue={10} value={temperature} onValueChange={setTemperature} />
      <Button title="Add to Soup" onPress={addToSoup} />
    </View>
  );
}

EmotionDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      emotion: PropTypes.shape({
        id: PropTypes.string,
        color: PropTypes.string,
      }),
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
