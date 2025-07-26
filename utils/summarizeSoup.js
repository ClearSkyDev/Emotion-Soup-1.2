export function summarizeSoup(emotions = []) {
  const grouped = {};
  emotions.forEach((e) => {
    const id = e.id || e.emotion;
    if (!id) return;
    if (!grouped[id]) grouped[id] = { count: 0, color: e.color, totalSize: 0 };
    grouped[id].count += 1;
    if (e.size) grouped[id].totalSize += e.size;
  });

  const breakdown = [];
  let dominant = null;
  Object.entries(grouped).forEach(([emotion, info]) => {
    const avgSize = info.count ? Math.round(info.totalSize / info.count) : 0;
    const item = { emotion, color: info.color, count: info.count, avgSize };
    breakdown.push(item);
    if (!dominant || info.count > dominant.count) {
      dominant = { emotion, color: info.color, count: info.count, avgSize };
    }
  });

  return { breakdown, dominant };
}
