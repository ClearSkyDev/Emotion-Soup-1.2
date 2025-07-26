// Placeholder for AI personality engine logic
export function getToneByAge(age) {
  switch (age) {
    case '4-7':
      return 'silly and friendly';
    case '8-12':
      return 'warm and explanatory';
    case '13-17':
      return 'encouraging';
    case '18-25':
      return 'insightful and supportive';
    default:
      return 'friendly';
  }
}

export function suggestActivities(emotion) {
  // Placeholder suggestions based on emotion
  return ['deep breath', 'draw', 'talk', 'move'];
}

import { summarizeSoup } from './summarizeSoup';

/**
 * Generate a child-friendly response based on the selected emotion puff balls.
 * The response reflects dominant emotions and offers a gentle regulation idea.
 *
 * @param {Array} emotions Array of emotion objects
 * @param {string} age Age range string, e.g. '4-7'
 * @returns {string} Friendly guidance text
 */
export function generateSoupBuddyResponse(emotions = [], age = '8-12') {
  const { breakdown } = summarizeSoup(emotions);
  if (!breakdown.length) {
    return "I don't see any feelings in the bowl yet. Pick some puff balls first.";
  }

  const tone = getToneByAge(age);
  const lines = breakdown.map((b) => {
    let intensity;
    if (b.count >= 7) intensity = 'so much';
    else if (b.count >= 4) intensity = 'a lot of';
    else if (b.count >= 2) intensity = 'some';
    else intensity = 'a little';
    const suggestion = suggestActivities(b.emotion)[0];
    return `${intensity} ${b.emotion}. Maybe try ${suggestion}.`;
  });

  return `In my ${tone} voice: I see ${lines.join(' ')} You are doing great!`;
}
