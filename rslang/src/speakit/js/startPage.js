import {
  // showElement,
  hideElement, showElement,
} from './utils';
import 'bootstrap';
import { renderApp } from './speakit';

const STARTPAGECONTAINER = document.querySelector('.start_page__container');
// const MAINCONTAINER = document.querySelector('.main__container');

const renderInitText = () => {
  const initTextContainer = document.createElement('div');
  initTextContainer.classList.add('start_text_container');
  const h1Element = document.createElement('h1');
  h1Element.innerText = 'SpeakIt';

  const h3ElementFirst = document.createElement('h3');
  h3ElementFirst.innerText = 'Слушай произношение слов и повторяй.';
  //   const h3ElementSec = document.createElement('h3');
  //   h3ElementSec.innerText = '';

  initTextContainer.insertAdjacentElement('beforeend', h1Element);
  initTextContainer.insertAdjacentElement('beforeend', h3ElementFirst);
  // initTextContainer.insertAdjacentElement('beforeend', h3ElementSec);

  return initTextContainer;
};

const hideStartPage = (event) => {
  event.preventDefault();
  event.stopPropagation();
  STARTPAGECONTAINER.innerHTML = '';
  document.querySelector('.start_page__container').style.display = 'none';
};

const renderStartButton = () => {
  const buttonElement = document.createElement('button');
  buttonElement.setAttribute('type', 'button');
  buttonElement.classList.add('btn', 'btn-info');
  buttonElement.innerText = 'Старт';
  buttonElement.addEventListener('click', (event) => {
    hideStartPage(event);
    showElement(document.querySelector('.header'));
    showElement(document.querySelector('.main'));
    renderApp();
  });

  return buttonElement;
};

export const renderStartPage = () => {
  hideElement(document.querySelector('.header'));
  hideElement(document.querySelector('.main'));
  const startButtonElement = renderStartButton();
  const initTextElement = renderInitText();

  STARTPAGECONTAINER.insertAdjacentElement('beforeend', initTextElement);
  STARTPAGECONTAINER.insertAdjacentElement('beforeend', startButtonElement);
};

export default {};
