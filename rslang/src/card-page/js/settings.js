export const initSettings = {
  showTextMeaning: true,
  showTextExample: true,
  showImage: true,
  audioMeaning: false,
  audioExample: false,
  showWordTranslate: true,
  audio: true,
  showTranscription: true,
  showAnswer: true,
  isDelete: true,
  isDifficultWords: true,
  maxCards: 10,
  maxNewWords: 10,
  isAgain: true,
  isHard: true,
  isAlright: true,
  isEasy: true,
  showRepeatWords: true,
  showOnlyDifficultWords: false,
};

export const settings = JSON.parse(localStorage.getItem('settings')) || initSettings;
