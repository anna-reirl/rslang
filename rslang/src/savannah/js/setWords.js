import constants from './constants';
import getWord from './getWord';
import 'bootstrap';

const getWrongAnswerOptions = async() => {
    const arrayOfWrongAnswerOptions = [];
    const arrayOfrandomValues = [];
    for (let i = 0; i < 3; i += 1) {
        const randomValue = {
            randomPage: Math.round(Math.random() * ((+constants.MAX_PAGE) - 1) + 1),
            randomLevel: Math.round(Math.random() * (+constants.MAX_LEVEL - 1) + 1),
            randomNumberOfWord: Math.round(Math.random() * (+constants.MAX_WORD_NUMBER)),
        };
        arrayOfrandomValues.push(randomValue);
    }
    for (const value of arrayOfrandomValues) {
        const randomWord = await getWord(value.randomPage, value.randomLevel);
        arrayOfWrongAnswerOptions.push(randomWord[value.randomNumberOfWord]);
    }
    return arrayOfWrongAnswerOptions;
};

const setWrongOptions = (wrongOptions, positionOfRightAnswer) => {
    let tempIndex = 0;
    wrongOptions.forEach((item) => {
        if (tempIndex === positionOfRightAnswer) {
            tempIndex += 1;
        }
        constants.POSSIBLE_ANSWERS[tempIndex].innerText = item.wordTranslate.toLowerCase();
        tempIndex += 1;
    });
};

const setNewWords = async() => {
    let mainWord;
    let randomWordNumber;
    const tempArrayOfLearningWords = JSON.parse(localStorage.learningWordsForSavannahGame);
    const wrongOptions = await getWrongAnswerOptions();
    const maxPositionValue = constants.POSSIBLE_ANSWERS.length - 1;
    const positionForRightAnswer = Math.round(Math.random() * maxPositionValue);
    const rightAnswerPlace = constants.POSSIBLE_ANSWERS[positionForRightAnswer];
    if (tempArrayOfLearningWords.length === 0) {
        mainWord = await getWord(localStorage.savannahPage, localStorage.savannahLevel);
        mainWord = mainWord[+localStorage.savannahNumberOfWord];
    } else {
        const max = tempArrayOfLearningWords.length - 1;
        randomWordNumber = Math.trunc(Math.random() * (max - 0) + 0);
        mainWord = tempArrayOfLearningWords[randomWordNumber];
        tempArrayOfLearningWords.splice(randomWordNumber, 1);
        localStorage.setItem('learningWordsForSavannahGame', JSON.stringify(tempArrayOfLearningWords));
    }
    constants.MAIN_WORD.innerText = mainWord.word.toLowerCase();
    rightAnswerPlace.innerText = mainWord.wordTranslate.toLowerCase();
    setWrongOptions(wrongOptions, positionForRightAnswer);
    localStorage.currentMainWordOfSavannahGame = JSON.stringify(mainWord);
};

export default setNewWords;
