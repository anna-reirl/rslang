import {
  MIN_NUMBER, NEXT_NUMBER, notification, statistic, app, LAST_NUMBER_FOR_DATE,
} from './constants';

const numbersStatistic = document.querySelector('.numbers-statistics');
const buttonStatistic = document.querySelector('.button-statistic');
const numberSeria = document.querySelector('.number-seria');

const numbersStatisticElements = [...numbersStatistic.children]
  .map((element) => element.children[NEXT_NUMBER]);
const valuesRightAnswer = [];
const MAX_PERCENT = 100;

let maxRightAnswer = 0;
let currentStatistic = JSON.parse(localStorage.getItem('statistic'));
let numberNewWords = 0;
let rightAnswer = 0;

if (!currentStatistic) {
  currentStatistic = {
    seria: 0,
    cards: 0,
    rightAnswer: 0,
  };
}

export function changeRightAnswer(repeat) {
  if (!repeat) {
    maxRightAnswer += NEXT_NUMBER;
    rightAnswer += NEXT_NUMBER;
  } else {
    maxRightAnswer = MIN_NUMBER;
  }
  valuesRightAnswer.push(maxRightAnswer);
}

export function changeNumberNewWords(key) {
  if (key === 'words') {
    numberNewWords += NEXT_NUMBER;
  } else {
    numberNewWords -= NEXT_NUMBER;
  }
}

function resetValues() {
  numberNewWords = MIN_NUMBER;
  valuesRightAnswer.length = MIN_NUMBER;
  maxRightAnswer = MIN_NUMBER;
  rightAnswer = MIN_NUMBER;
}

function saveStatistic(learningWords, cards) {
  const date = new Date().toISOString().slice(MIN_NUMBER, LAST_NUMBER_FOR_DATE);
  currentStatistic.seria += NEXT_NUMBER;
  currentStatistic.cards += cards;
  currentStatistic.rightAnswer += rightAnswer;
  currentStatistic[date] = learningWords.length;
  localStorage.setItem('statistic', JSON.stringify(currentStatistic));
  numberSeria.innerText = currentStatistic.seria;
}

function writeStatistic(learningWords, cards) {
  const numberMaxRights = Math.max.apply(null, valuesRightAnswer);
  const proportionRightAnswer = rightAnswer / cards;
  const percentRightAnswer = `${proportionRightAnswer * MAX_PERCENT}%`;
  const valuesStatistic = [cards, percentRightAnswer, numberNewWords, numberMaxRights];
  valuesStatistic.forEach((number, index) => {
    numbersStatisticElements[index].innerText = number;
  });
  saveStatistic(learningWords, cards);
  resetValues();
  app.classList.add('hide');
  statistic.classList.remove('hide');
}

export function checkError(learningWords, cards) {
  if (cards) {
    writeStatistic(learningWords, cards);
  }
}

buttonStatistic.addEventListener('click', () => {
  statistic.classList.add('hide');
  notification.classList.remove('hide');
});
