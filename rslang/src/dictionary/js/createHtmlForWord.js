const initSettings = {
  showTextMeaning: true,
  showTextExample: true,
  showImage: true,
  showTranscription: true,
  isDelete: true,
  isDifficultWords: true,
};

const settings = JSON.parse(localStorage.getItem('settings')) || initSettings;
const NO_LEARNING_WORD = '<span>Слово еще не изучалось</span>';
const URL_MATERIALS = 'https://raw.githubusercontent.com/Nikita3026/rslang-data/master/';
const additionalForWord = ['textMeaning', 'textExample', 'transcription'];
const namesSettings = ['showTextMeaning', 'showTextExample', 'showTranscription'];
const levelsLearning = ['у вас прекрасная память',
  'это слово так и вертится у вас на языке', 'вы в процессе запоминания слова',
  'это слово нужно подучить'];

function createButtons() {
  let htmlCode = '';
  if (settings.isDelete) {
    htmlCode += "<button class='remove'>Удалить</button>";
  }
  if (settings.isDifficultWords) {
    htmlCode += "<button class='difficult'>Сложные</button>";
  }
  return htmlCode;
}

function createImage(data) {
  let htmlCode = '';
  if (settings.showImage) {
    htmlCode += `<img src='${URL_MATERIALS}${data.image}'>`;
  }
  return htmlCode;
}

function checkSettingsForHTMLCode(data) {
  let code = '';
  namesSettings.forEach((name, index) => {
    if (settings[name]) {
      code += `<p>${data[additionalForWord[index]]}</p>`;
    }
  });
  code += '</div>';
  return code;
}

function createProgressLearning(data) {
  let htmlCode = '';
  if (data.replays) {
    htmlCode = `<span>Количество повторений: ${data.replays}</span>`;
    htmlCode += `<span>Повторялось последний раз: ${data.oldInterval}</span>`;
    htmlCode += `<span>Повторится снова: ${data.interval}</span>`;
    htmlCode += `<span>Уровень изучения слова: ${levelsLearning[data.coefficient]}</span>`;
  } else {
    htmlCode += NO_LEARNING_WORD;
  }
  htmlCode += '</div>';
  return htmlCode;
}

export function createHtmlForWord(data) {
  let htmlCode = `<div class='word' data-name='${data.word}'><div><span class="word-text">
  ${data.word}</span><button class="audio">Слушать</button>`;
  htmlCode += createButtons(htmlCode);
  htmlCode += `<p>${data.wordTranslate}</p>`;
  htmlCode += checkSettingsForHTMLCode(data);
  htmlCode += createImage(data, htmlCode);
  htmlCode += createProgressLearning(data);
  return htmlCode;
}

export function playAudio(dom, words) {
  const index = words.map((el) => el.word).indexOf(dom.dataset.name);
  const audio = new Audio();
  audio.src = `${URL_MATERIALS}${words[index].audio}`;
  audio.autoplay = true;
}
