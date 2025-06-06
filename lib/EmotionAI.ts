export interface EmotionGuidance {
  emotion: string;
  suggestions: string[];
  narration: string;
}

const copingStrategies: Record<string, string[]> = {
  happy: ['Share your joy', 'Keep a gratitude journal'],
  sad: ['Talk to a friend', 'Write down your feelings'],
  angry: ['Take deep breaths', 'Walk it off'],
  fear: ['Find a safe space', 'Talk about it'],
};

export function getGuidance(emotion: string, age: number): EmotionGuidance {
  const strategies = copingStrategies[emotion] || ['Take a moment'];
  const narration = age < 10
    ? `Hey there! It seems you're feeling ${emotion}. Let's try: ${strategies[0]}.`
    : `It looks like you're ${emotion}. Maybe you could ${strategies.join(' or ')}.`;
  return {
    emotion,
    suggestions: strategies,
    narration,
  };
}
