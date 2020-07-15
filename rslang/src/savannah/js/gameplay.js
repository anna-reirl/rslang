import constants from './constants';
import setNewWords from './setWords';
import buildStatistic from './build-statistic';
import checkMute from './check-mute';
import 'bootstrap';
import { _ } from 'core-js';

const increaseLevel = () => {
    const setCurrentLevelToLocalStorage = (isItNecessaryToReset, maxValue) => {
        switch (maxValue) {
            case constants.MAX_WORD_NUMBER:
                if (isItNecessaryToReset) {
                    localStorage.savannahNumberOfWord = 0;
                } else {
                    localStorage.savannahNumberOfWord = +localStorage.savannahNumberOfWord + 1;
                }
                break;
            case constants.MAX_LEVEL:
                if (isItNecessaryToReset) {
                    localStorage.savannahLevel = 0;
                } else {
                    localStorage.savannahLevel = +localStorage.savannahLevel + 1;
                }
                break;
            case constants.MAX_PAGE:
                if (isItNecessaryToReset) {
                    localStorage.savannahPage = 0;
                } else {
                    localStorage.savannahPage = +localStorage.savannahPage + 1;
                }
                break;
        }
    }

    let callCounter = 0;
    const increaseCurrent = (incrementValue, maximumPossibleValue) => {
        if (incrementValue === maximumPossibleValue) {
            callCounter += 1;
            setCurrentLevelToLocalStorage(true, maximumPossibleValue);
            switch (callCounter) {
                case 1:
                    increaseCurrent(localStorage.savannahLevel, constants.MAX_LEVEL);
                    break;
                case 2:
                    increaseCurrent(localStorage.savannahPage, constants.MAX_PAGE);
                    break;
                default:
                    break;
            }
        } else {
            setCurrentLevelToLocalStorage(false, maximumPossibleValue);
        }
    }

    increaseCurrent(localStorage.savannahNumberOfWord, constants.MAX_WORD_NUMBER);
};

const startLoweringNewWord = async() => {
    await setNewWords();
    constants.ANSWER_OPTIONS.hidden = false;
    increaseLevel();
    constants.MAIN_WORD.classList.remove('not-guessed');
    constants.STEAM_INNER.classList.add('hide-steam');
    constants.STEAM.classList.remove('steam-rise-animation');
    constants.STEAM_INNER.classList.remove('steam-up-animation');
    constants.MAIN_WORD.classList.add('main-word-animation');
};

const reduceNumberOfLives = () => {
    const currentLive = document.querySelector('.fa-heart');
    currentLive.classList.remove('fa-heart');
    currentLive.classList.add('fa-heart-broken');
    currentLive.classList.add('broken');
};

const wrongAnswer = () => {
    let isItNeedToHighlightRightWord = true;
    constants.MAIN_WORD.classList.remove('main-word-animation');
    constants.MAIN_WORD.classList.add('not-guessed');
    constants.POSSIBLE_ANSWERS_CONTAINER.forEach((item) => {
        if (item.classList.contains('highlight-right-word')) {
            isItNeedToHighlightRightWord = false;
        }
    });
    if (isItNeedToHighlightRightWord) {
        const mainWord = JSON.parse(localStorage.currentMainWordOfSavannahGame);
        constants.POSSIBLE_ANSWERS.forEach((item) => {
            if (item.innerText.toLowerCase() === mainWord.wordTranslate.toLowerCase()) {
                item.closest('.possible-answer').classList.add('highlight-right-choosen-word');
                setTimeout(() => {
                    item.closest('.possible-answer').classList.remove('highlight-right-choosen-word');
                }, 1500);
            }
        });
    }
    const tempStatisticObject = JSON.parse(localStorage.shortTermStatisticSavannah);
    tempStatisticObject.unspokenWords.push(JSON.parse(localStorage.currentMainWordOfSavannahGame));
    localStorage.setItem('shortTermStatisticSavannah', JSON.stringify(tempStatisticObject));
    constants.STEAM.classList.add('steam-rise-animation');
    constants.STEAM_INNER.classList.add('steam-up-animation');
    constants.STEAM_INNER.classList.remove('hide-steam');
    if (!checkMute()) {
        constants.WRONG_ANSWER_SOUND.play();
    }
    reduceNumberOfLives();
};

const setStatistic = async() => {
    await buildStatistic();
    setTimeout(() => {
        constants.MAIN_PAGE.hidden = true;
        constants.RESULT_PAGE.hidden = false;
    }, 1000);
};

const correctAnswer = async() => {
    constants.MAIN_WORD.classList.remove('main-word-animation');
    constants.WATER_IMAGE.classList.add('water-animation');
    constants.WATER_IMAGE.hidden = false;
    let strikSound;
    const tempStatisticObject = JSON.parse(localStorage.shortTermStatisticSavannah);
    const numberOfWordsPlayed = tempStatisticObject.guessedWords.length +
        tempStatisticObject.unspokenWords.length;
    tempStatisticObject.guessedWords.push(JSON.parse(localStorage.currentMainWordOfSavannahGame));
    localStorage.setItem('shortTermStatisticSavannah', JSON.stringify(tempStatisticObject));
    if (!checkMute()) {
        constants.RIGHT_ANSWER_SOUND.play();
    }
    if (tempStatisticObject.guessedWords.length % 3 === 0) {
        strikSound = setTimeout(() => {
            const computedStyleOfGlass = getComputedStyle(constants.GLASS);
            if (!checkMute()) constants.STRIK_SOUND.play();
            constants.GLASS.style.width = `${+(computedStyleOfGlass.width.slice(0, -2)) + 4}px`;
            constants.GLASS.style.height = `${+(computedStyleOfGlass.height.slice(0, -2)) + 4}px`;
        }, 500);
    }
    if (numberOfWordsPlayed === 30) clearTimeout(strikSound);
};

const runListenters = () => {
    constants.MAIN_WORD.addEventListener('animationend', () => {
        wrongAnswer();
    });
    constants.ANSWER_OPTIONS.addEventListener('click', async({ target }) => {
        let realTarget;
        if (target.classList.contains('number-of-answer')) {
            realTarget = target.nextSibling;
        } else if (target.classList.contains('possible-answer')) {
            realTarget = target.lastChild;
        } else {
            realTarget = target;
        }
        const mainWord = JSON.parse(localStorage.currentMainWordOfSavannahGame);
        const rightAnswerActions = () => {
            if (!constants.MAIN_WORD.classList.contains('not-guessed')) {
                target.closest('.possible-answer').classList.add('highlight-right-choosen-word');
                setTimeout(() => {
                    target.closest('.possible-answer').classList.remove('highlight-right-choosen-word');
                }, 1500);
                correctAnswer();
            }
        }
        const wrongAnswerActions = () => {
            target.closest('.possible-answer').classList.add('highlight-wrong-word');
            constants.POSSIBLE_ANSWERS.forEach((item) => {
                if (item.innerText.toLowerCase() === mainWord.wordTranslate.toLowerCase()) {
                    item.closest('.possible-answer').classList.add('highlight-right-word');
                    setTimeout(() => {
                        target.closest('.possible-answer').classList.remove('highlight-wrong-word');
                        item.closest('.possible-answer').classList.remove('highlight-right-word');
                    }, 1500);
                }
            });
            wrongAnswer();
        }


        if (constants.MAIN_WORD.classList.contains('main-word-animation')) {
            switch (realTarget.innerText.toLowerCase()) {
                case mainWord.wordTranslate.toLowerCase():
                    rightAnswerActions();
                    break;
                default:
                    wrongAnswerActions();
                    break;
            }
            const tempStatisticObject = JSON.parse(localStorage.shortTermStatisticSavannah);
            const numberOfWordsPlayed = tempStatisticObject.guessedWords.length +
                tempStatisticObject.unspokenWords.length;
            if (numberOfWordsPlayed >= 30) {
                if (!checkMute()) {
                    constants.END_GAME_SOUND.play();
                }
                await setStatistic();
            }
        }
    });
    constants.STEAM_INNER.addEventListener('animationend', async() => {
        constants.STEAM_INNER.classList.add('hide-steam');
        if (document.querySelectorAll('.fa-heart-broken').length === 5) {
            if (!checkMute()) {
                constants.END_GAME_SOUND.play();
            }
            await setStatistic();
        } else {
            setTimeout(() => {
                startLoweringNewWord();
            }, 250);
        }
    });
    constants.WATER_IMAGE.addEventListener('animationend', () => {
        constants.WATER_IMAGE.classList.remove('water-animation');
        constants.WATER_IMAGE.hidden = true;
        setTimeout(() => {
            startLoweringNewWord();
        }, 250);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === '1' ||
            event.key === '2' ||
            event.key === '3' ||
            event.key === '4') {
            constants.POSSIBLE_ANSWERS_CONTAINER[event.key - 1].dispatchEvent(new Event('click', {
                bubbles: true,
            }));
        }
    });

    constants.RESULT_INNER.addEventListener('click', ({ target }) => {
        if (target.classList.contains('fa-bullhorn')) {
            setTimeout(constants.allResultPronunciation[target.id].play(), 1000);
        }
    });
};

const setLocalStorageValues = () => {
    let tempDictionary;
    if (localStorage.dictionary === undefined) {
        tempDictionary = [];
    } else {
        tempDictionary = JSON.parse(localStorage.dictionary);
    }
    localStorage.setItem('learningWordsForSavannahGame', JSON.stringify(tempDictionary));
    localStorage.setItem('shortTermStatisticSavannah', JSON.stringify({
        guessedWords: [],
        unspokenWords: [],
    }));
    if (localStorage.savannahPage === undefined) {
        localStorage.savannahPage = 1;
        localStorage.savannahLevel = 1;
        localStorage.savannahNumberOfWord = 0;
    }
};



export const runGameplay = () => {
    setLocalStorageValues();
    runListenters();
    startLoweringNewWord();
};
