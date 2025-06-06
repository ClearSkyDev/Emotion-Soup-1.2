import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Fetch emotion logs for the given user over the last 7 days and group
 * them by day and emotion. Results are formatted for use with a line
 * chart component where the x-axis is the date (YYYY-MM-DD) and the
 * y-axis is the count for each emotion.
 *
 * @param {string} userId Firebase user id
 * @returns {Promise<Array<{date: string, emotionCounts: Record<string, number>}>>}
 */
export async function getEmotionStats(userId) {
  if (!userId) return [];

  const today = new Date();
  // Start date 6 days ago to include today (total 7 days)
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 6);

  const q = query(
    collection(db, 'users', userId, 'emotions'),
    where('timestamp', '>=', Timestamp.fromDate(startDate))
  );

  const snap = await getDocs(q);
  const grouped = {};

  snap.forEach((doc) => {
    const data = doc.data();
    const ts = data.timestamp?.toDate?.();
    if (!ts) return;
    const day = ts.toISOString().slice(0, 10); // YYYY-MM-DD
    if (!grouped[day]) grouped[day] = {};
    const emotion = data.emotion || 'unknown';
    grouped[day][emotion] = (grouped[day][emotion] || 0) + 1;
  });

  return Object.entries(grouped)
    .sort(([d1], [d2]) => d1.localeCompare(d2))
    .map(([date, counts]) => ({ date, emotionCounts: counts }));
}
