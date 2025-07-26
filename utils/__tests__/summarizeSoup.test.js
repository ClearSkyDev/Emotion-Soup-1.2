const { summarizeSoup } = require('../summarizeSoup');

test('summarizeSoup computes breakdown and dominant', () => {
  const data = [
    { id: 'anger', color: 'red', size: 80 },
    { id: 'anger', color: 'red', size: 60 },
    { id: 'sadness', color: 'blue', size: 40 }
  ];
  const result = summarizeSoup(data);
  expect(result).toEqual({
    breakdown: [
      { emotion: 'anger', color: 'red', count: 2, avgSize: 70 },
      { emotion: 'sadness', color: 'blue', count: 1, avgSize: 40 }
    ],
    dominant: { emotion: 'anger', color: 'red', count: 2, avgSize: 70 }
  });
});
