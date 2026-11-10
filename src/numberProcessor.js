const fs = require('fs');
const path = require('path');

function readNumbersFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line !== '')
    .map(Number)
    .filter((n) => Number.isFinite(n));
}

function calculateSum(numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

function findHighest(numbers) {
  if (numbers.length === 0) return null;
  return numbers.reduce((max, n) => (n > max ? n : max), numbers[0]);
}

function findLowest(numbers) {
  if (numbers.length === 0) return null;
  return numbers.reduce((min, n) => (n < min ? n : min), numbers[0]);
}

function calculateAverage(numbers) {
  if (numbers.length === 0) return null;
  return calculateSum(numbers) / numbers.length;
}

module.exports = {
  readNumbersFromFile,
  calculateSum,
  findHighest,
  findLowest,
  calculateAverage,
};


if (require.main === module) {
  const numbers = readNumbersFromFile(
    path.join(__dirname, '..', 'data', 'sample-numbers.txt')
  );
  console.log('Count:  ', numbers.length);
  console.log('Sum:    ', calculateSum(numbers));
  console.log('Highest:', findHighest(numbers));
  console.log('Lowest: ', findLowest(numbers));
  console.log('Average:', calculateAverage(numbers));
}