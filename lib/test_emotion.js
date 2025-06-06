import Emotion from './emotion_model';

export const testEmotion = new Emotion({
  name: 'anxiety',
  intensity: 4,
  location: 'stomach',
  color: '#FFC107',
  modeMeta: {
    soup: { simmerTime: 'long' },
    iceCream: { meltSpeed: 'fast' },
    potion: { magicEffect: 'invisibility' },
    mask: { outerEmotion: 'calm' },
    garden: { growthStage: 'sprout' },
  },
});
