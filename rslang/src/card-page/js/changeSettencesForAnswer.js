import { MIN_NUMBER } from './constants';

const START_MISSING_WORD = 3;

function getMissingWord(sentence, symbol) {
  const start = sentence.search(`<${symbol}>`);
  const end = sentence.search(`</${symbol}>`);
  const wordTextMeaning = sentence.slice(start + START_MISSING_WORD, end);
  return wordTextMeaning;
}

export default function getWordsForSentences(allWords) {
  const wordsForSentences = [];
  const wordMeaning = getMissingWord(allWords[MIN_NUMBER].textMeaning, 'i');
  const wordExample = getMissingWord(allWords[MIN_NUMBER].textExample, 'b');
  wordsForSentences.push(wordMeaning, wordExample);
  return wordsForSentences;
}
