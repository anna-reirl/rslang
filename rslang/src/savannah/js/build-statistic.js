import constants from './constants';
import createElement from './create-element';
import 'bootstrap';

const buildStatistic = async() => {
    let idNumber = 0;
    constants.allResultPronunciation = [];
    const wrongAnswers = {
        wrongWords: [],
        wrongVolumeIcons: [],
        wordsInner: [],
        wordsTranslation: [],
    };
    const rightAnswers = {
        rightWords: [],
        rightVolumeIcons: [],
        wordsInner: [],
        wordsTranslation: [],
    };

    const tempStatisticObject = JSON.parse(localStorage.shortTermStatisticSavannah);
    constants.KNOW_NUMBER.innerText = tempStatisticObject.guessedWords.length;
    constants.WRONG_NUMBER.innerText = tempStatisticObject.unspokenWords.length;

    const createStatisticElements = (item, index, array) => {
        const newStatisticElement = createElement('li', {
            classList: ['statistic-element'],
        });
        const volumeIcon = createElement('i', {
            classList: ['fas', 'fa-bullhorn'],
            id: idNumber,
        });
        const wordInner = createElement('i', {
            classList: ['english-word'],
            id: idNumber,
            innerHTML: item.word,
        });
        const translateInner = createElement('i', {
            classList: ['word-translation'],
            id: idNumber,
            innerHTML: ` — ${item.wordTranslate}`,
        });
        idNumber += 1;
        const pronunciation = new Audio();
        pronunciation.src = `https://raw.githubusercontent.com/nikita3026/rslang-data/master/${item.audio}`;
        constants.allResultPronunciation.push(pronunciation);
        if (array.length === JSON.parse(localStorage.shortTermStatisticSavannah).unspokenWords.length) {
            wrongAnswers.wrongVolumeIcons.push(volumeIcon);
            wrongAnswers.wrongWords.push(newStatisticElement);
            wrongAnswers.wordsInner.push(wordInner);
            wrongAnswers.wordsTranslation.push(translateInner);
        } else {
            rightAnswers.rightVolumeIcons.push(volumeIcon);
            rightAnswers.rightWords.push(newStatisticElement);
            rightAnswers.wordsInner.push(wordInner);
            rightAnswers.wordsTranslation.push(translateInner);
        }
    };

    JSON.parse(localStorage.getItem('shortTermStatisticSavannah')).unspokenWords.forEach(createStatisticElements);
    constants.STATISTIC_WRONG_INNER.innerHTML = '';
    wrongAnswers.wrongWords.forEach((item, index) => {
        constants.STATISTIC_WRONG_INNER.append(item);
        item.prepend(wrongAnswers.wrongVolumeIcons[index]);
        item.append(wrongAnswers.wordsInner[index]);
        item.append(wrongAnswers.wordsTranslation[index]);
    });

    JSON.parse(localStorage.getItem('shortTermStatisticSavannah')).guessedWords.forEach(createStatisticElements);
    constants.STATISTIC_RIGHT_INNER.innerHTML = '';
    rightAnswers.rightWords.forEach((item, index) => {
        constants.STATISTIC_RIGHT_INNER.append(item);
        item.prepend(rightAnswers.rightVolumeIcons[index]);
        item.append(rightAnswers.wordsInner[index]);
        item.append(rightAnswers.wordsTranslation[index]);
    });

    const outcomeOptions = ['В этот раз не получилось, но продолжай тренироваться!',
        'Неплохо, но есть над чем поработать',
        'Поздравляем, отличный результат!',
    ];

    const arrayOfGuessedWords = JSON.parse(localStorage.getItem('shortTermStatisticSavannah')).guessedWords;
    let indexOfOutcomeOption;
    if (arrayOfGuessedWords.length < 5) {
        indexOfOutcomeOption = 0;
    } else if (arrayOfGuessedWords.length < 25) {
        indexOfOutcomeOption = 1;
    } else {
        indexOfOutcomeOption = 2;
    }
    constants.RESULT_PHRASE.innerText = outcomeOptions[indexOfOutcomeOption];
};

export default buildStatistic;