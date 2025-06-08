const { getEmotionStats } = require('../getEmotionStats');
const { getDocs, Timestamp } = require('firebase/firestore');

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  Timestamp: { fromDate: jest.fn() },
}));

jest.mock('../../firebase', () => ({ db: {} }));

const mockDoc = (emotion, date) => ({
  data: () => ({
    emotion,
    timestamp: { toDate: () => new Date(date) },
  }),
});

describe('getEmotionStats', () => {
  it('groups emotions by day', async () => {
    const docs = [
      mockDoc('happy', '2024-05-20T10:00:00Z'),
      mockDoc('sad', '2024-05-20T12:00:00Z'),
      mockDoc('happy', '2024-05-21T08:00:00Z'),
    ];

    getDocs.mockResolvedValue({
      forEach: (fn) => docs.forEach(fn),
      docs,
    });
    Timestamp.fromDate.mockReturnValue({});

    const result = await getEmotionStats('uid123');

    expect(result).toEqual([
      { date: '2024-05-20', emotionCounts: { happy: 1, sad: 1 } },
      { date: '2024-05-21', emotionCounts: { happy: 1 } },
    ]);
  });
});
