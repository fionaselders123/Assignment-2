# Assignment #2: File Processing Toolkit

This repository contains your starter code for the File Processing Toolkit assignment.

## Getting Started

1. Clone this repository to your local machine
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Assignment Overview

You will build two main scripts:

- **textAnalyzer.js** - Analyzes text files (word count, longest word, line count)
- **numberProcessor.js** - Processes number files (sum, average, highest, lowest)

## Data Files

Your repository includes sample data files to work with:

- `data/sample-text.txt` - Text content for analysis
- `data/sample-numbers.txt` - Numbers for processing
- `data/quotes.txt` - Programming quotes for text analysis

## Testing

Write Jest tests for your functions:

```bash
npm test
```

## File Structure

```
src/
├── textAnalyzer.js
├── numberProcessor.js
└── fileToolkit.js

tests/
├── textAnalyzer.test.js
└── numberProcessor.test.js

data/
├── sample-text.txt
├── sample-numbers.txt
└── quotes.txt
```