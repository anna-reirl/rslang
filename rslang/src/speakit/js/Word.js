import 'bootstrap';

const DATAPATH = 'https://raw.githubusercontent.com/okrypets/rslang-data/master/data/';
class Word {
  constructor(item) {
    this.word = item.word;
    this.image = item.image;
    this.audio = item.audio;
    this.transcription = item.transcription;
    this.translate = item.wordTranslate;
    this.getWordTemplate = this.getWordTemplate.bind(this);
    this.setTranslate = this.setTranslate.bind(this);
    this.translationTextElement = document.createElement('p');
  }

  getWordTemplate() {
    const wordContainer = this.getWordContainer();
    const wordElement = this.getWordElement();
    const transcriptionTextElement = this.getTranscriptionElement();
    const audioElement = this.getAudioElement();
    const translationTextElement = this.getTranslationElement(this.translate);
    const audioIconElement = document.createElement('span');
    audioIconElement.style.backgroundImage = 'url(/assets/images/icon/audioIcon.svg)';
    audioIconElement.classList.add('icon-audio');
    
    wordContainer.insertAdjacentElement('beforeend', audioIconElement);
    wordContainer.insertAdjacentElement('beforeend', wordElement);
    wordContainer.insertAdjacentElement('beforeend', transcriptionTextElement);
    wordContainer.insertAdjacentElement('beforeend', audioElement);
    wordContainer.insertAdjacentElement('beforeend', translationTextElement);

    return wordContainer;
  }

  getTranslationElement(text) {
    this.translationTextElement.classList.add('translation');
    this.translationTextElement.innerText = text;
    return this.translationTextElement;
  }

  getWordContainer() {
    const wordContainer = document.createElement('div');
    const wordId = this.getWordId();
    wordContainer.classList.add('word_item');
    wordContainer.setAttribute('data-id', wordId);
    return wordContainer;
  }

  getWordElement() {
    const wordTextElement = document.createElement('p');
    wordTextElement.classList.add('word');
    wordTextElement.innerText = this.word;
    return wordTextElement;
  }

  getTranscriptionElement() {
    const transcriptionTextElement = document.createElement('p');
    transcriptionTextElement.classList.add('transcription');
    transcriptionTextElement.innerText = this.transcription;
    return transcriptionTextElement;
  }

  setTranslate(text) {
    this.translation = text;
  }

  getWordId() {
    const regexp = (/[0-9]{4}/g);
    const id = Number(this.image.match(regexp)[0]);
    return id;
  }

  getAudioElement() {
    const audioElement = document.createElement('audio');
    const audio = this.audio.replace(/[files/]/g, '');
    audioElement.id = 'audio-player';
    audioElement.controls = 'controls';
    audioElement.src = `${DATAPATH}${audio}`;
    audioElement.type = 'audio/mpeg';
    return audioElement;
  }
}

export default Word;
