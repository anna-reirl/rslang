import { removeClassOfElements } from './checkAnswer';
import { translatedWords, NEXT_NUMBER } from './constants';
import { settings } from './settings';
import getWordsForSentences from './changeSettencesForAnswer';

const englishSentences = document.querySelectorAll('.english-sentence');
const progressBar = document.querySelector('.progress-bar');
const MAX_PERCENTS = 100;

function showMissingWords(wordsForSentences) {
  wordsForSentences.forEach((word, index) => {
    const text = englishSentences[index].innerText.replace('[...]', word);
    englishSentences[index].innerText = text;
  });
}

export function changeCardForAnswer(allWords) {
  const wordsForSentences = getWordsForSentences(allWords);
  if (settings.showWordTranslate) {
    removeClassOfElements(translatedWords, ['hide']);
  }
  showMissingWords(wordsForSentences);
}

export function changeProgressBar(cards) {
  const progress = (cards - NEXT_NUMBER) / settings.maxCards;
  progressBar.style.width = `${progress * MAX_PERCENTS}%`;
  progressBar.innerText = `${cards - NEXT_NUMBER}/${settings.maxCards}`;
}
