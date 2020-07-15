import { settings } from './settings';
import {
  MIN_NUMBER, URL_MATERIALS, app, NEXT_NUMBER, metodicButtons, buttonsForAnswer,
  hideMetodicButtons,
} from './constants';
import { changeTextButton, showButtons } from './createCard';

const namesButtonsMetodic = ['isAgain', 'isHard', 'isAlright', 'isEasy'];
const audios = ['audio', 'audioMeaning', 'audioExample'];
const changeSound = document.querySelector('.change-sound');
const TEXT_PLAY_SOUND = 'Включить звук';
const TEXT_OFF_SOUND = 'Выключить звук';

let numberAudio = 0;

function searchAudio() {
  if (settings[audios[numberAudio]] === false && numberAudio < audios.length) {
    numberAudio += NEXT_NUMBER;
    searchAudio();
  }
}

export default function playAudio(allWords, repeat) {
  if (settings.audio && numberAudio < audios.length) {
    app.classList.add('no-clickable');
    const audio = new Audio();
    audio.src = `${URL_MATERIALS}${allWords[MIN_NUMBER][audios[numberAudio]]}`;
    audio.autoplay = true;
    audio.onended = () => playAudio(allWords, repeat);
    numberAudio += NEXT_NUMBER;
    searchAudio();
  } else {
    app.classList.remove('no-clickable');
    numberAudio = MIN_NUMBER;
    buttonsForAnswer.classList.add('hide');
    showButtons(namesButtonsMetodic, metodicButtons);
    if (repeat) {
      hideMetodicButtons.forEach((button) => button.classList.add('hide'));
    }
  }
}

function checkAudio() {
  if (settings.showTextExample) {
    settings.audioExample = true;
  }
  if (settings.showTextMeaning) {
    settings.audioMeaning = true;
  }
  changeTextButton(changeSound, 'audio', TEXT_PLAY_SOUND, TEXT_OFF_SOUND);
}
checkAudio();

changeSound.addEventListener('click', () => {
  settings.audio = !settings.audio;
  checkAudio();
});
