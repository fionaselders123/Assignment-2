const path = require('path');
const {
  readTextFile,
  countWords,
  findLongestWord,
  countLines,
} = require('../src/textAnalyzer');

const dataDir = path.join(__dirname, '..', 'data');

describe('countWords', () => {
  test('counts words in a simple sentence', () => {
    expect(countWords('the quick brown fox')).toBe(4);
  });

  test('returns 0 for an empty string', () => {
    expect(countWords('')).toBe(0);
  });

  test('returns 0 for a string of only whitespace', () => {
    expect(countWords('   \n\t  ')).toBe(0);
  });

  test('ignores extra spaces, tabs and newlines between words', () => {
    expect(countWords('  hello    world \n\n again\t!  ')).toBe(4);
  });

  test('counts a single word', () => {
    expect(countWords('hello')).toBe(1);
  });

  test('returns 0 for non-string input', () => {
    expect(countWords(undefined)).toBe(0);
    expect(countWords(null)).toBe(0);
    expect(countWords(42)).toBe(0);
  });

  test('counts words in data/quotes.txt', () => {
    const text = readTextFile(path.join(dataDir, 'quotes.txt'));
    expect(countWords(text)).toBe(108);
  });

  test('counts words in data/sample-text.txt', () => {
    const text = readTextFile(path.join(dataDir, 'sample-text.txt'));
    expect(countWords(text)).toBe(207);
  });
});

describe('findLongestWord', () => {
  test('finds the longest word in a sentence', () => {
    expect(findLongestWord('I love programming in JavaScript')).toBe(
      'programming'
    );
  });

  test('ignores surrounding punctuation', () => {
    expect(findLongestWord('Wow, amazing!')).toBe('amazing');
    expect(findLongestWord('"quoted," (parenthesized)')).toBe('parenthesized');
  });

  test('returns the first word when there is a tie', () => {
    expect(findLongestWord('cat dog bat')).toBe('cat');
  });

  test('returns an empty string for empty or whitespace-only input', () => {
    expect(findLongestWord('')).toBe('');
    expect(findLongestWord('   ')).toBe('');
  });

  test('returns an empty string when there are only punctuation tokens', () => {
    expect(findLongestWord('... --- !!!')).toBe('');
  });

  test('works across multiple lines', () => {
    expect(findLongestWord('short\nmuch longer\nshortest')).toBe('shortest');
  });

  test('returns an empty string for non-string input', () => {
    expect(findLongestWord(undefined)).toBe('');
  });

  test('finds the longest word in data/quotes.txt', () => {
    const text = readTextFile(path.join(dataDir, 'quotes.txt'));
    expect(findLongestWord(text)).toBe('sophistication');
  });

  test('finds the longest word in data/sample-text.txt', () => {
    const text = readTextFile(path.join(dataDir, 'sample-text.txt'));
    expect(findLongestWord(text)).toBe('infrastructure');
  });
});

describe('countLines', () => {
  test('counts a single line with no newline', () => {
    expect(countLines('just one line')).toBe(1);
  });

  test('counts multiple lines', () => {
    expect(countLines('one\ntwo\nthree')).toBe(3);
  });

  test('does not count a single trailing newline as an extra line', () => {
    expect(countLines('one\ntwo\n')).toBe(2);
  });

  test('counts blank lines in the middle of the text', () => {
    expect(countLines('one\n\nthree')).toBe(3);
  });

  test('handles Windows (CRLF) line endings', () => {
    expect(countLines('one\r\ntwo\r\nthree\r\n')).toBe(3);
  });

  test('returns 0 for an empty string', () => {
    expect(countLines('')).toBe(0);
  });

  test('returns 0 for non-string input', () => {
    expect(countLines(undefined)).toBe(0);
  });

  test('counts lines in data/quotes.txt', () => {
    const text = readTextFile(path.join(dataDir, 'quotes.txt'));
    expect(countLines(text)).toBe(10);
  });

  test('counts lines in data/sample-text.txt', () => {
    const text = readTextFile(path.join(dataDir, 'sample-text.txt'));
    expect(countLines(text)).toBe(1);
  });
});