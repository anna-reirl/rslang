import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';

import { routeTo } from '../../js/helpers';
import constants from './constants';
import checkMute from './check-mute';
import { runGameplay } from './gameplay';

const runListeners = () => {
    constants.BTN_START.addEventListener('click', () => {
        constants.START_PAGE.hidden = true;
        constants.LOADING_PAGE.hidden = false;
        if (!checkMute()) {
            constants.START_SOUND.play();
        }
        const countdownInterval = setInterval(() => {
            if (constants.COUNTDOWN.innerText === '1') {
                clearInterval(countdownInterval);
                constants.LOADING_PAGE.hidden = true;
                constants.MAIN_PAGE.hidden = false;
                constants.COUNTDOWN.innerText = 3;
            } else {
                constants.COUNTDOWN.innerText = +constants.COUNTDOWN.innerText - 1;
            }
        }, 1000);
    });

    const changeSoundMode = () => {
        if (constants.CROSS_OUT.hidden) {
            constants.CROSS_OUT.hidden = false;
            constants.MUTE_BTN.classList.add('muted');
            localStorage.setItem('isSoundsMute', true);
        } else {
            constants.CROSS_OUT.hidden = true;
            constants.MUTE_BTN.classList.remove('muted');
            localStorage.setItem('isSoundsMute', false);
        }
    };

    if (localStorage.isSoundsMute === 'true') changeSoundMode();

    constants.MUTE_BTN.addEventListener('click', changeSoundMode);
    constants.CROSS_OUT.addEventListener('click', changeSoundMode);

    constants.CLOSE_BTN.addEventListener('click', () => {
        constants.MAIN_WORD.classList.remove('main-word-animation');
    });

    constants.CANCEL_BTN.addEventListener('click', () => {
        constants.MAIN_WORD.classList.add('main-word-animation');
    });
    constants.MODAL.addEventListener('click', ({ target }) => {
        if (target.classList.contains('modal')) {
            constants.MAIN_WORD.classList.add('main-word-animation');
        }
    })

    constants.QUIT_BTNS.forEach((item) => {
        item.addEventListener('click', () => {
            routeTo('cardpage.html');
        });
    });

    constants.PROCEED_BTN.addEventListener('click', () => {
        routeTo('savannah.html');
    });
};

const createSounds = () => {
    const sounds = {
        RIGHT_ANSWER_SOUND: new Audio(),
        WRONG_ANSWER_SOUND: new Audio(),
        END_GAME_SOUND: new Audio(),
        START_SOUND: new Audio(),
        STRIK_SOUND: new Audio()
    };
    sounds.RIGHT_ANSWER_SOUND.src = '../../assets/audio/rightAnswer.wav';
    sounds.WRONG_ANSWER_SOUND.src = '../../assets/audio/wrongAnswer.wav';
    sounds.END_GAME_SOUND.src = '../../assets/audio/endGame.mp3';
    sounds.START_SOUND.src = '../../assets/audio/gong.mp3';
    sounds.STRIK_SOUND.src = '../../assets/audio/strik.mp3';
    Object.keys(sounds).forEach((key) => {
        constants[key] = sounds[key];
    })
}

export const renderApp = () => {
    createSounds();
    runListeners();
    runGameplay();
};