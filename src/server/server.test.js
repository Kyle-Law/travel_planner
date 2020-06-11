const addition = require('./server');

test('adds 1 + 1 to equal 2', () => {
  expect(addition(1, 1)).toBe(2);
});