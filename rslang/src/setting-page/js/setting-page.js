import apiService from '../../js/GetData';
import { removeToken, routeToAuth } from '../../js/helpers';

const informations = document.querySelectorAll('.informations');
const buttonArrow = document.querySelectorAll('.button_arrow');
const change = document.querySelectorAll('.change');
const userEmail = document.querySelector('.email');
const userName = document.querySelector('.user_name');
const inputPassword = document.querySelector('.input_password');
const changeSeeHover = document.querySelector('.change.see_hover');
const textareaMistake = document.querySelector('.textarea_mistake');
const buttonSettingAll = document.querySelectorAll('.button_setting');
const settingAll = document.querySelectorAll('.container_settings');
const checkboxAll = document.querySelectorAll('.checkbox_word');
const maxWordCardAll = document.querySelectorAll('.max_word_card');
const numberWords = document.querySelector('#maxNewWords');
const numberCards = document.querySelector('#maxCards');
const checkboxTranslation = document.querySelector('#showWordTranslate');
const checkboxMeaning = document.querySelector('#showTextMeaning');
const checkboxUse = document.querySelector('#showTextExample');
const checkboxTranscription = document.querySelector('#showTranscription');
const checkboxImage = document.querySelector('#showImage');
const checkboxAnswer = document.querySelector('#showAnswer');
const checkboxDifficultGroup = document.querySelector('#isDifficultWords');
const checkboxDeleteWord = document.querySelector('#isDelete');
const checkboxAgain = document.querySelector('#isAgain');
const checkboxHard = document.querySelector('#isHard');
const checkboxAlright = document.querySelector('#isAlright');
const checkboxEasy = document.querySelector('#isEasy');
const repeatWords = document.querySelector('#repeat_word');
const onlyDifficultWords = document.querySelector('#onlyDifficultWords');
const noRepeatWord = document.querySelector('#no_repeat_word');
const themeLight = document.querySelector('#theme_light');
const temeDark = document.querySelector('#theme_dark');

let checkRepeatedClick;

let settings = {
  userFullName: JSON.parse(localStorage.getItem('SWAuthData')).name || '',
  userEmail: '',
  userPassword: '',
  canDeleteUser: false,
  theme: 'light',
  maxNewWords: 10,
  maxCards: 10,
  showWordTranslate: true,
  showTextMeaning: true,
  showTextExample: true,
  showTranscription: true,
  showImage: true,
  showAnswer: true,
  isDifficultWords: true,
  isDelete: true,
  isAgain: true,
  isHard: true,
  isAlright: true,
  isEasy: true,
  showRepeatWords: true,
  showOnlyDifficultWords: false,
  showNoRepeatWord: false,
};

function getUserData() {
  const settingsParse = localStorage.getItem('SWAuthData');
  const userData = JSON.parse(settingsParse);

  settings.userEmail = `${userData.email}`;
  userEmail.innerText = `${userData.email}`;
  userName.innerText = `${settings.userFullName}`;
}

getUserData();

function setSettingsLocalstorage() {
  localStorage.setItem('settings', JSON.stringify(settings));
}

if (!localStorage.getItem('settings')) {
  setSettingsLocalstorage();
}

// ----------------------reload change checked----------------------------------

function applySettings() {
  maxWordCardAll.forEach((el) => {
    for (const key in settings) {
      if (el.id === key) {
        el.value = settings[key];
      }
    }
  });

  checkboxAll.forEach((el) => {
    for (const key in settings) {
      if (el.id === key && settings[key] === true) {
        el.checked = true;
      } else if (el.id === key && settings[key] === false) {
        el.checked = false;
      }
    }
  });

  if (settings.theme === 'dark') {
    temeDark.checked = 'on';
  } else {
    themeLight.checked = 'on';
  }

  if (settings.showRepeatWords === true) {
    repeatWords.checked = 'on';
  } else if (settings.showOnlyDifficultWords === true) {
    onlyDifficultWords.checked = 'on';
  } else if (settings.showNoRepeatWord === true) {
    noRepeatWord.checked = 'on';
  }
}

function reload() {
  const settingsParse = localStorage.getItem('settings');
  settings = JSON.parse(settingsParse);
  applySettings();
}

reload();

// ---------------------------------------------------------------------------

function openChangeBlock(ind) {
  buttonArrow.forEach((el) => el.classList.remove('active'));
  change.forEach((el) => el.classList.remove('active'));

  if (checkRepeatedClick !== ind) {
    applySettings();

    buttonArrow[ind].classList.add('active');
    change[ind].classList.add('active');

    if (informations[ind].classList.value === 'informations change_password') {
      inputPassword.value = '';
    }

    if (informations[ind].classList.value === 'informations report_error') {
      textareaMistake.value = '';
    }
    checkRepeatedClick = ind;
  } else {
    checkRepeatedClick = -1;
  }
}

informations.forEach((el, ind) => {
  el.addEventListener('click', () => openChangeBlock(ind));
});

// ---------------------change info-------------------------

function changeInfoCard() {
  settings.showWordTranslate = checkboxTranslation.checked;
  settings.showTextMeaning = checkboxMeaning.checked;
  settings.showTextExample = checkboxUse.checked;
  settings.showTranscription = checkboxTranscription.checked;
  settings.showImage = checkboxImage.checked;
  setSettingsLocalstorage();
  applySettings();
}

function sendReportError() {
  const reportValue = textareaMistake.value;
  localStorage.setItem('reportError', JSON.stringify(reportValue));
}

function changeMaxCards() {
  settings.maxCards = numberCards.value;
  setSettingsLocalstorage();
  applySettings();
}

function changeMaxNewWords() {
  settings.maxNewWords = numberWords.value;
  setSettingsLocalstorage();
  applySettings();
}

function changeButtonCards() {
  settings.showAnswer = checkboxAnswer.checked;
  settings.isDifficultWords = checkboxDifficultGroup.checked;
  settings.isDelete = checkboxDeleteWord.checked;
  setSettingsLocalstorage();
  applySettings();
}

function changeButtonPage() {
  settings.isAgain = checkboxAgain.checked;
  settings.isHard = checkboxHard.checked;
  settings.isAlright = checkboxAlright.checked;
  settings.isEasy = checkboxEasy.checked;
  setSettingsLocalstorage();
  applySettings();
}

function changeLearningWords() {
  settings.showRepeatWords = repeatWords.checked;
  settings.showOnlyDifficultWords = onlyDifficultWords.checked;
  settings.showNoRepeatWord = noRepeatWord.checked;
  setSettingsLocalstorage();
  applySettings();
}

function changePassword() {
  settings.userPassword = inputPassword.value;
  setSettingsLocalstorage();
  applySettings();
  apiService.updateUser(inputPassword.value)
    .then((response) => {
      console.log(response);
    });
}

function changeDeleteUser() {
  settings.canDeleteUser = true;
  setSettingsLocalstorage();
  applySettings();
  apiService.deleteUser()
    .then((response) => {
      if (response.status === 204) {
        removeToken();
        routeToAuth();
      }
    });
}

function changeTheme() {
  if (themeLight.checked) {
    settings.theme = 'light';
  } else {
    settings.theme = 'dark';
  }
  setSettingsLocalstorage();
  applySettings();
}

// ----------------------work with button block_change_setting------------------------

function clickButtonBlockChangeSetting(ind, event) {
  const buttonClick = `${event.target.className}`;
  let isClickButtonChange = true;

  switch (buttonClick) {
    case 'button_change save_password':
      changePassword();
      break;
    case 'button_change cancel':
      break;
    case 'button_change send':
      sendReportError();
      break;
    case 'button_change delete':
      changeDeleteUser();
      break;
    case 'button_change save_number_words':
      changeMaxNewWords();
      break;
    case 'button_change save_number_cards':
      changeMaxCards();
      break;
    case 'button_change save_info_card':
      changeInfoCard();
      break;
    case 'button_change save_learning_words':
      changeLearningWords();
      break;
    case 'button_change save_button_cards':
      changeButtonCards();
      break;
    case 'button_change save_button_page':
      changeButtonPage();
      break;
    case 'button_change save_theme':
      changeTheme();
      break;
    default:
      isClickButtonChange = false;
      break;
  }
  if (isClickButtonChange) {
    openChangeBlock(ind);
  }
}

change.forEach((el, ind) => {
  el.addEventListener('click', (event) => clickButtonBlockChangeSetting(ind, event));
});

// ---------------------see password-------------------------

function seePassword(event) {
  if (event.target.className === 'eye') {
    inputPassword.type = 'text';
  } else {
    inputPassword.type = 'password';
  }
}

changeSeeHover.addEventListener('mouseover', (event) => seePassword(event));

// ------------------click button setting----------------------

function clickButtonSetting(elem, ind) {
  buttonSettingAll.forEach((el) => el.classList.remove('active'));
  settingAll.forEach((el) => el.classList.remove('active'));

  elem.classList.add('active');
  settingAll[ind].classList.add('active');
}

buttonSettingAll.forEach((el, ind) => {
  el.addEventListener('click', () => clickButtonSetting(el, ind));
});

export { setSettingsLocalstorage };
