/* eslint-disable import/no-cycle */
import 'bootstrap';
import Word from './Word';
import { handleClickByWord, getImageFromData } from './utils';

class WordsList {
  constructor(data) {
    this.data = data;
    this.wordsContainer = document.querySelector('.words__container > .wrapper');
    this.imageContainer = document.querySelector('.image__container > .wrapper');
    this.word = null;
  }

  init() {
    this.renderWordsListToDom();
    this.renderImageToDom();
    this.eventListner();
  }

  eventListner() {
    this.wordsContainer.addEventListener('click', handleClickByWord);
  }

  renderImageToDom() {
    const image = getImageFromData();
    this.imageContainer.innerHTML = '';
    this.imageContainer.insertAdjacentElement('afterbegin', image);
  }

  renderWordsListToDom() {
    const wordsListContainer = document.querySelector('section.words__container > .wrapper');
    wordsListContainer.innerHTML = '';
    const wordsFromDataList = this.getWordsFromData();
    if (wordsListContainer) {
      wordsFromDataList.map((element) => {
        const wordEl = element.getWordTemplate();
        wordsListContainer.insertAdjacentElement('beforeend', wordEl);
        return wordsListContainer;
      });
    }
  }

  getWordsFromData() {
    const wordsArr = [];
    this.data.forEach((item) => {
      const wordItem = this.renderWord(item);
      wordsArr.push(wordItem);
    });

    return wordsArr;
  }

  renderWord(item) {
    this.word = new Word(item);
    return this.word;
  }
}

export default WordsList;
