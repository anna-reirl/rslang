import 'bootstrap';

const constants = {
    MAX_LEVEL: '29',
    MAX_PAGE: '5',
    MAX_WORD_NUMBER: '19',
    BTN_START: document.querySelector('.btn-start'),
    START_PAGE: document.querySelector('.savannah-start-page'),
    MAIN_PAGE: document.querySelector('.savannah-game-page'),
    LOADING_PAGE: document.querySelector('.page-loading'),
    RESULT_PAGE: document.querySelector('.result-page'),
    COUNTDOWN: document.querySelector('.countdown'),
    MUTE_BTN: document.querySelector('.mute-sounds'),
    CLOSE_BTN: document.querySelector('.close-button'),
    CANCEL_BTN: document.querySelector('.btn-cancellation'),
    QUIT_BTN: document.querySelector('.btn-game-quit'),
    QUIT_BTNS: document.querySelectorAll('.btn-game-quit'),
    PROCEED_BTN: document.querySelector('.btn-proceed'),
    CROSS_OUT: document.querySelector('.cross-out'),
    MAIN_WORD: document.querySelector('.main-word'),
    MODAL: document.querySelector('#modalLoginAvatar'),
    STEAM_INNER: document.querySelector('.steam-animation'),
    STEAM: document.querySelector('.steam'),
    GLASS: document.querySelector('.glass-image'),
    POSSIBLE_ANSWERS: document.querySelectorAll('.answer-text'),
    POSSIBLE_ANSWERS_CONTAINER: document.querySelectorAll('.possible-answer'),
    ANSWER_OPTIONS: document.querySelector('.answer-options'),
    WATER_IMAGE: document.querySelector('.water-image'),
    WRONG_NUMBER: document.querySelector('.wrong-number'),
    KNOW_NUMBER: document.querySelector('.know-number'),
    STATISTIC_WRONG_INNER: document.querySelector('#wrong-result'),
    STATISTIC_RIGHT_INNER: document.querySelector('#know-result'),
    RESULT_INNER: document.querySelector('.result-info-text'),
    RESULT_PHRASE: document.querySelector('.result-info')
};

export default constants;