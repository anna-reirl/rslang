import { input, NUMBER_MILLISECONDS } from './constants';

export function addClassOfElements(array, className) {
  array.forEach((elem) => {
    elem.classList.add(className);
  });
}

export function removeClassOfElements(arrayElements, arrayClassNames) {
  arrayClassNames.forEach((className) => {
    arrayElements.forEach((elem) => {
      elem.classList.remove(className);
    });
  });
}

function changeColorLetter(arrayElementsText, text) {
  const wrongLetters = [];
  const rightLetters = [];
  arrayElementsText.forEach((word, index) => {
    if (word.textContent !== text[index]) {
      wrongLetters.push(word);
    } else {
      rightLetters.push(word);
    }
  });
  if (wrongLetters.length === arrayElementsText.length) {
    addClassOfElements(wrongLetters, 'red');
  } else {
    addClassOfElements(wrongLetters, 'orange');
    addClassOfElements(rightLetters, 'right-answer');
  }
}

function changeOpacityLetters(arrayElementsText) {
  setTimeout(() => {
    addClassOfElements(arrayElementsText, 'opacity');
    removeClassOfElements(arrayElementsText, ['red', 'orange', 'right-answer']);
  }, NUMBER_MILLISECONDS);
}

function showWrongLetters() {
  const letters = document.querySelectorAll('.letter');
  const arrayElementsText = [...letters];
  const text = input.value;
  input.classList.add('transparent');
  changeColorLetter(arrayElementsText, text);
  changeOpacityLetters(arrayElementsText);
}

function hideLetters() {
  const letters = document.querySelectorAll('.letter');
  const arrayElementsText = [...letters];
  removeClassOfElements(arrayElementsText, ['opacity']);
}

export function checkAnswer(unknownWord) {
  const isCorrect = input.value === unknownWord;
  input.classList.add('transparent');
  if (!isCorrect) {
    showWrongLetters();
  }
  hideLetters();
  input.value = '';
  return isCorrect;
}

input.addEventListener('click', () => {
  hideLetters();
  input.value = '';
  input.classList.remove('transparent');
});

input.addEventListener('input', (event) => {
  if (event.target.classList.contains('transparent')) {
    hideLetters();
    input.classList.remove('transparent');
  }
});
