/* eslint-disable import/no-cycle */
import 'bootstrap';
import {
  getDataArrActive,
  renderWords,
  setLevel,
} from './speakit';
import apiService from '../../js/GetData';

const DATAPATH = 'https://raw.githubusercontent.com/okrypets/rslang-data/master/data/';
let isPlay = false;

export const setIsPlay = (bool) => {
  isPlay = bool;
};

export const getIsPlay = () => isPlay;

const getWordId = (item) => {
  const { image } = item;
  const idFromImageName = Number(image.match(/[0-9]{4}/g)[0]);
  return idFromImageName;
};

export const getImageById = (id) => {
  const dataArrActive = getDataArrActive();
  const url = dataArrActive.find((it) => {
    const { image } = it;
    const imageNumb = Number(image.match(/[0-9]{4}/g)[0]);
    if (imageNumb === Number(id)) {
      return imageNumb;
    }
    return false;
  });
  const imageName = url.image.replace(/[files/]/g, '');
  const src = DATAPATH + imageName;
  return src;
};

export const reRenderImage = (id) => {
  const imageElement = document.querySelector('section.image__container > .wrapper img');
  const imageFile = getImageById(id);
  imageElement.setAttribute('src', imageFile);
};

export const showTranslateById = (id) => {
  const wordElement = document.querySelector(`section.words__container > .wrapper > div[data-id='${id}'] > p.translation`);
  const translationElement = document.createElement('p');
  translationElement.innerText = wordElement.innerText;
  const imageContainerElement = document.querySelector('section.image__container > .wrapper');
  const translationContainer = document.querySelector('.translation__container') || document.createElement('div');
  if (!translationContainer.classList.contains('translation__container')) {
    translationContainer.classList.add('translation__container');
  }
  translationContainer.style.display = 'block';
  translationContainer.innerHTML = '';
  imageContainerElement.insertAdjacentElement('beforeend', translationContainer);
  translationContainer.insertAdjacentElement('beforeend', translationElement);
};

export const toggleMenu = () => {
  document.querySelector('nav.header_navigation > ul > li').classList.toggle('active');
};

export const setMenuActive = (level) => {
  const menuList = document.querySelector('nav.header_navigation > ul').children;
  Array.from(menuList)
    .forEach((it) => {
      const { classList, dataset } = it;
      if (classList.contains('active')) {
        classList.remove('active');
      }
      if (Number(dataset.level) === Number(level)) {
        classList.add('active');
      }
    });
  setLevel(level);
  renderWords();
};

export const getActiveLevel = () => {
  const localdataLevel = JSON.parse(localStorage.getItem('speakitConfig')).level;
  let activeLevel = localdataLevel || 0;
  setMenuActive(activeLevel);
  const menuList = document.querySelector('nav.header_navigation > ul').children;
  const activeMenuElement = Array.from(menuList)
    .find((it) => it.classList.contains('active'));
  const { dataset: { level } } = activeMenuElement;
  activeLevel = Number(level);
  return activeLevel;
};

export const getActiveLevelPage = () => {
  const rand = Math.random() * 30;
  return Math.floor(rand);
};

export const handleMenuClick = (event) => {
  const { dataset: { level = 0 } } = event.target.parentNode;
  setMenuActive(level);
};

const wordAudioPlay = (id) => {
  const audioElement = document.querySelector(`section.words__container > .wrapper > div[data-id='${id}'] > audio`);
  audioElement.play();
};

export const hideTranslation = () => {
  if (document.querySelector('.translation__container')) {
    document.querySelector('.translation__container').style.display = 'none';
  }
};

export const hideMicropgoneLine = () => {
  if (document.querySelector('.microphone_line')) {
    document.querySelector('.microphone_line').remove();
  }
};

export const renderMicrophoneLineToDom = () => {
  const isMicriphoneLine = document.querySelector('.image__container > .wrapper > .microphone_line');
  let microphoneLine = null;
  if (!isMicriphoneLine) {
    microphoneLine = document.createElement('div');
    microphoneLine.classList.add('microphone_line');
  } else {
    microphoneLine = document.querySelector('.image__container > .wrapper > .microphone_line');
  }
  document.querySelector('.image__container > .wrapper').insertAdjacentElement('beforeend', microphoneLine);
};

const setWordChecked = (id) => {
  const wordElement = document.querySelector(`section.words__container > .wrapper > div[data-id='${id}']`);
  wordElement.classList.add('checked');
};

const getDificaltyByLevel = (level) => {
  switch (Number(level)) {
    case 0:
    case 1:
      return '3';
    case 2:
    case 3:
      return '2';
    case 4:
    case 5:
      return '1';

    default: return '3';
  }
};

export const checkResult = async (value) => {
  const microphoneLineContainer = document.querySelector('.image__container > .wrapper > .microphone_line');
  microphoneLineContainer.innerText = '';
  const microphoneLineValue = document.createElement('span');
  microphoneLineContainer.insertAdjacentElement('beforeend', microphoneLineValue);
  const dataArrActive = getDataArrActive();
  const matchedWord = dataArrActive.find((it) => {
    const itWord = it.word.toLowerCase();
    const val = value.toLowerCase();
    return itWord === val;
  });
  if (matchedWord) {
    microphoneLineValue.innerText = value;
    const wordId = getWordId(matchedWord);
    setWordChecked(wordId);
    const userWordId = matchedWord.id;
    const authData = JSON.parse(localStorage.getItem('SWAuthData'));
    const localdataLevel = JSON.parse(localStorage.getItem('speakitConfig')).level || 0;
    const difficultyWord = getDificaltyByLevel(localdataLevel);
    const word = { difficulty: difficultyWord, optional: {} };
    await apiService.createUserWord(`https://afternoon-falls-25894.herokuapp.com/users/${authData.userId}/words/${userWordId}`, word)
      .then((response) => {
        console.log(response);
      });
  }
};

export const hideElement = (element) => {
  element.setAttribute('style', 'display: none');
};

export const showElement = (element) => {
  element.setAttribute('style', 'display: block');
};
export const restart = () => {
  document.querySelectorAll('section.words__container > .wrapper > div.word_item.checked').forEach((it) => {
    it.classList.remove('checked');
  });
  document.querySelector('section.buttons__container .btn.btn_speach').classList.remove('active');
  setIsPlay(false);
  hideTranslation();
  hideMicropgoneLine();
  renderWords();
};

export const handleClickByWord = (event) => {
  event.preventDefault();
  if (isPlay) return;
  const { parentNode, dataset: targetDataSet } = event.target;
  const { dataset: { id: parentId = '' } } = parentNode;
  const { id = '' } = targetDataSet;
  const currentId = id || parentId;
  if (currentId) {
    reRenderImage(currentId);
    showTranslateById(currentId);
    wordAudioPlay(currentId);
  }
};

export const getImageFromData = () => {
  const imageElement = document.createElement('img');
  const firstId = Number(document.querySelectorAll('.word_item')[0].dataset.id);
  const imageUrl = getImageById(firstId);
  imageElement.src = imageUrl;
  return imageElement;
};
