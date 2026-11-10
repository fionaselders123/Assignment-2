const fs = require('fs');
const os = require('os');
const path = require('path');
const {
  readNumbersFromFile,
  calculateSum,
  findHighest,
  findLowest,
  calculateAverage,
} = require('../src/numberProcessor');

const sampleFile = path.join(__dirname, '..', 'data', 'sample-numbers.txt');

describe('calculateSum', () => {
  test('adds up a list of numbers', () => {
    expect(calculateSum([1, 2, 3, 4])).toBe(10);
  });

  test('returns 0 for an empty array', () => {
    expect(calculateSum([])).toBe(0);
  });

  test('handles negative numbers', () => {
    expect(calculateSum([-5, 5, -10])).toBe(-10);
  });

  test('handles decimals', () => {
    expect(calculateSum([0.5, 0.25])).toBeCloseTo(0.75);
  });

  test('handles a single number', () => {
    expect(calculateSum([7])).toBe(7);
  });
});

describe('findHighest', () => {
  test('finds the highest number', () => {
    expect(findHighest([3, 9, 2, 7])).toBe(9);
  });

  test('works when all numbers are negative', () => {
    expect(findHighest([-8, -3, -20])).toBe(-3);
  });

  test('handles a single number', () => {
    expect(findHighest([42])).toBe(42);
  });

  test('handles duplicate maximums', () => {
    expect(findHighest([5, 9, 9, 1])).toBe(9);
  });

  test('returns null for an empty array', () => {
    expect(findHighest([])).toBeNull();
  });
});

describe('findLowest', () => {
  test('finds the lowest number', () => {
    expect(findLowest([3, 9, 2, 7])).toBe(2);
  });

  test('works when all numbers are negative', () => {
    expect(findLowest([-8, -3, -20])).toBe(-20);
  });

  test('handles a single number', () => {
    expect(findLowest([42])).toBe(42);
  });

  test('handles zero', () => {
    expect(findLowest([4, 0, 6])).toBe(0);
  });

  test('returns null for an empty array', () => {
    expect(findLowest([])).toBeNull();
  });
});

describe('calculateAverage', () => {
  test('calculates the average', () => {
    expect(calculateAverage([2, 4, 6, 8])).toBe(5);
  });

  test('returns a decimal when the average is not whole', () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });

  test('handles a single number', () => {
    expect(calculateAverage([10])).toBe(10);
  });

  test('handles negative numbers', () => {
    expect(calculateAverage([-2, 2, -4, 4])).toBe(0);
  });

  test('returns null for an empty array', () => {
    expect(calculateAverage([])).toBeNull();
  });
});

describe('readNumbersFromFile', () => {
  test('reads numbers from data/sample-numbers.txt', () => {
    const numbers = readNumbersFromFile(sampleFile);
    expect(numbers).toHaveLength(30);
    expect(numbers[0]).toBe(85);
    expect(numbers[numbers.length - 1]).toBe(92);
  });

  test('skips blank lines and invalid entries', () => {
    const tmp = path.join(
      fs.mkdtempSync(path.join(os.tmpdir(), 'numproc-')),
      'messy.txt'
    );
    fs.writeFileSync(tmp, '10\n\nabc\n  20  \n3.5\n');
    expect(readNumbersFromFile(tmp)).toEqual([10, 20, 3.5]);
  });

  test('returns an empty array for an empty file', () => {
    const tmp = path.join(
      fs.mkdtempSync(path.join(os.tmpdir(), 'numproc-')),
      'empty.txt'
    );
    fs.writeFileSync(tmp, '');
    expect(readNumbersFromFile(tmp)).toEqual([]);
  });

  test('throws if the file does not exist', () => {
    expect(() => readNumbersFromFile('/no/such/file.txt')).toThrow();
  });
});

describe('sample-numbers.txt end to end', () => {
  const numbers = readNumbersFromFile(sampleFile);

  test('sum is 2597', () => {
    expect(calculateSum(numbers)).toBe(2597);
  });

  test('highest is 96', () => {
    expect(findHighest(numbers)).toBe(96);
  });

  test('lowest is 73', () => {
    expect(findLowest(numbers)).toBe(73);
  });

  test('average is about 86.57', () => {
    expect(calculateAverage(numbers)).toBeCloseTo(86.5667, 3);
  });
});