import { MIN_NUMBER, NEXT_NUMBER, LAST_NUMBER_FOR_DATE } from './constants';
import { settings } from './settings';
import getDataCard from './getData';
import { changeNumberNewWords } from './writeStatistics';

const saveDeletedWords = JSON.parse(localStorage.getItem('deleted'));
const saveDifficultWords = JSON.parse(localStorage.getItem('difficult'));
const saveRepeatWords = JSON.parse(localStorage.getItem('dictionary'));
const saveNewWords = JSON.parse(localStorage.getItem('words'));

const NUMBER_REPLAYS = 4;
const allSaveData = [saveNewWords, saveRepeatWords, saveDifficultWords, saveDeletedWords];

export function getAllDataWords() {
  const allData = allSaveData.map((currentData) => currentData || []);
  return allData;
}

export function removeWord(words, key, unknownWord) {
  const wordIndex = words.map((item) => item.word.toLowerCase()).indexOf(unknownWord);
  if (wordIndex >= MIN_NUMBER) {
    changeNumberNewWords(key);
    words.splice(wordIndex, NEXT_NUMBER);
    localStorage.setItem(key, JSON.stringify(words));
  }
}

function getInterval(coefficient) {
  const currentDay = new Date().getDate();
  const date = new Date().setDate(currentDay + (NEXT_NUMBER * coefficient));
  const currentDate = new Date(date).toISOString().slice(MIN_NUMBER, LAST_NUMBER_FOR_DATE);
  return currentDate;
}

function getCoefficient(index, gettingCoefficient, word) {
  let coefficient = gettingCoefficient;
  if (index >= MIN_NUMBER && word.coefficient) {
    coefficient *= word.coefficient;
  }
  return coefficient;
}

function checkCoefficient(coefficient, gettingIndex) {
  let index = gettingIndex;
  if (coefficient === MIN_NUMBER && !gettingIndex) {
    index = NUMBER_REPLAYS;
  }
  return index;
}

function getReplays(gettingReplays) {
  let replays = gettingReplays;
  if (!replays) {
    replays = MIN_NUMBER;
  }
  replays += NEXT_NUMBER;
  return replays;
}

function addWordToWords(allWords, index, coefficient, repeatWords) {
  const word = allWords[MIN_NUMBER];
  const words = repeatWords;
  word.coefficient = getCoefficient(index, coefficient, word);
  word.index = checkCoefficient(coefficient, word.index);
  word.oldInterval = new Date().toISOString().slice(MIN_NUMBER, LAST_NUMBER_FOR_DATE);
  word.interval = getInterval(word.coefficient);
  word.replays = getReplays(word.replays);
  if (index >= MIN_NUMBER) {
    words[index] = word;
  } else {
    words.push(word);
  }
  return words;
}

export function changeRepeatWords(allWords, repeatWords, unknownWord, coefficient) {
  const allUnknownWord = repeatWords.map((item) => item.word.toLowerCase());
  const index = allUnknownWord.indexOf(unknownWord);
  let words = addWordToWords(allWords, index, coefficient, repeatWords);
  words = words.map((word) => {
    const currentWord = word;
    if (currentWord.index) {
      currentWord.index -= NEXT_NUMBER;
    }
    return currentWord;
  });
  return words;
}

export function changeDataWords(words, key, allWords, repeatWords, unknownWord) {
  const word = allWords[MIN_NUMBER];
  words.push(word);
  localStorage.setItem(key, JSON.stringify(words));
  removeWord(repeatWords, 'dictionary', unknownWord);
}

export function changeDataWordForNextCard(cards, allWords, newWords, unknownWord) {
  if (cards) {
    allWords.splice(MIN_NUMBER, NEXT_NUMBER);
  }
  removeWord(newWords, 'words', unknownWord);
  localStorage.setItem('words', JSON.stringify(newWords));
  return allWords;
}

function getWordsForToday(repeatWords) {
  const date = new Date().toISOString().slice(MIN_NUMBER, LAST_NUMBER_FOR_DATE);
  const wordsForToday = repeatWords.filter((item) => item.interval <= date && !item.index);
  return wordsForToday;
}

export async function createDataWords(gettingNewWords, oldAllWords, repeatWords, cards) {
  let newWords = gettingNewWords.slice();
  let allWords = oldAllWords.slice();
  newWords = await getDataCard(newWords);
  allWords = newWords.slice(MIN_NUMBER, settings.maxNewWords - cards);
  if (settings.showRepeatWords) {
    const words = getWordsForToday(repeatWords);
    allWords = words.concat(allWords);
  }
  return [newWords, allWords];
}
