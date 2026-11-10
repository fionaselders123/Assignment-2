const fs = require('fs');
const path = require('path');

function readTextFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function countWords(text) {
  if (typeof text !== 'string') return 0;
  const trimmed = text.trim();
  if (trimmed === '') return 0;
  return trimmed.split(/\s+/).length;
}

function findLongestWord(text) {
  if (typeof text !== 'string') return '';
  const words = text
    .split(/\s+/)
    .map((word) => word.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, ''))
    .filter((word) => word.length > 0);

  let longest = '';
  for (const word of words) {
    if (word.length > longest.length) {
      longest = word;
    }
  }
  return longest;
}

function countLines(text) {
  if (typeof text !== 'string' || text === '') return 0;
  const lines = text.split(/\r?\n/);
  if (lines[lines.length - 1] === '') {
    lines.pop();
  }
  return lines.length;
}

module.exports = {
  readTextFile,
  countWords,
  findLongestWord,
  countLines,
};


if (require.main === module) {
  const dataDir = path.join(__dirname, '..', 'data');
  const files = ['quotes.txt', 'sample-text.txt'];

  for (const file of files) {
    const text = readTextFile(path.join(dataDir, file));
    console.log(`--- ${file} ---`);
    console.log('Total words:   ', countWords(text));
    console.log('Longest word:  ', findLongestWord(text));
    console.log('Number of lines:', countLines(text));
    console.log();
  }
}

