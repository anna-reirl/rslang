import { checkAnswer } from './checkAnswer';
import {
  MIN_NUMBER, textElementAnswer, context, input, app, NEXT_NUMBER,
  notification, metodicButtons, buttonsForAnswer, hideMetodicButtons,
} from './constants';
import { createCard } from './createCard';
import { settings } from './settings';
import {
  changeDataWordForNextCard, changeDataWords, createDataWords, getAllDataWords,
  changeRepeatWords,
} from './changeDataWords';
import { changeCardForAnswer, changeProgressBar } from './changePageForAnswer';
import playAudio from './playAudio';
import {
  changeRightAnswer, checkError, changeNumberNewWords,
} from './writeStatistics';

const nextBtn = document.querySelector('.next');
const deleteButton = document.querySelector('.delete-btn');
const continueButton = document.querySelector('.continue-card');
const difficultWordsButton = document.querySelector('.difficult-words');
const showAnswerButton = document.querySelector('.show-answer-btn');

let unknownWord = '';
let repeat = false;
let cards = 0;
let deletedWords = [];
let difficultWords = [];
let repeatWords = [];
let newWords = [];

[newWords, repeatWords, difficultWords, deletedWords] = getAllDataWords();
let allWords = repeatWords.concat(newWords);

export default function changeCard() {
  unknownWord = allWords[MIN_NUMBER].word.toLowerCase();
  [...context.children, ...textElementAnswer.children].forEach((elem) => elem.remove());
  createCard(allWords, unknownWord);
}

function checkNumberCard() {
  if (cards < settings.maxCards && allWords.length) {
    changeCard();
    input.click();
    app.classList.remove('no-clickable');
  } else {
    checkError(repeatWords, cards);
  }
}

async function checkWhichDataWords() {
  if (settings.showOnlyDifficultWords) {
    allWords = difficultWords;
    settings.isDifficultWords = false;
  } else {
    [newWords, allWords] = await createDataWords(newWords, allWords, repeatWords, cards);
  }
}

export async function nextCard() {
  metodicButtons.forEach((button) => button.classList.add('hide'));
  buttonsForAnswer.classList.remove('hide');
  await checkWhichDataWords();
  checkNumberCard();
  cards += NEXT_NUMBER;
  changeProgressBar(cards);
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    nextBtn.click();
  }
});

function rightAnswer() {
  changeCardForAnswer(allWords);
  playAudio(allWords, repeat);
  changeRightAnswer(repeat);
  repeat = false;
}

nextBtn.addEventListener('click', () => {
  const isRightWord = checkAnswer(unknownWord);
  if (isRightWord) {
    rightAnswer();
  } else {
    repeat = true;
  }
});

showAnswerButton.addEventListener('click', () => {
  hideMetodicButtons.forEach((button) => button.classList.add('hide'));
  repeat = true;
  input.value = unknownWord;
  nextBtn.click();
});

continueButton.addEventListener('click', async () => {
  cards = MIN_NUMBER;
  await nextCard();
  app.classList.remove('hide');
  notification.classList.add('hide');
});

function eventForButton(button, words, key) {
  button.addEventListener('click', async () => {
    changeDataWords(words, key, allWords, repeatWords, unknownWord, newWords);
    changeDataWordForNextCard(cards, allWords, newWords, unknownWord);
    changeNumberNewWords();
    cards -= NEXT_NUMBER;
    if (!cards) {
      allWords.splice(MIN_NUMBER, NEXT_NUMBER);
    }
    await nextCard();
  });
}
eventForButton(difficultWordsButton, difficultWords, 'difficult');
eventForButton(deleteButton, deletedWords, 'deleted');

async function eventMetodicButtons(index) {
  repeatWords = changeRepeatWords(allWords, repeatWords, unknownWord, index);
  localStorage.setItem('dictionary', JSON.stringify(repeatWords));
  changeDataWordForNextCard(cards, allWords, newWords, unknownWord);
  await nextCard();
}

[...metodicButtons].forEach((element, index) => {
  const button = element;
  button.addEventListener('click', () => eventMetodicButtons(index));
});
