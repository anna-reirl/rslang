import Chart from 'chart.js';
import {
  elementNumberWords, speedCanvas, series, cards, rightAnswer, MIN_NUMBER, NEXT_NUMBER,
  NUMBER_DATES, NUMBER_STEP_SIZE, NUMBER_ONE_PERCENT,
} from './constans';

let statisticData = JSON.parse(localStorage.getItem('statistic'));

let days = [];
let words = [];
let numberWords = 0;

function createStatisticsText() {
  if (!statisticData) {
    statisticData = {};
  } else {
    const proportionRightAnswer = statisticData.rightAnswer / statisticData.cards;
    series.innerText = `Общее количество серий прохождения карточек: ${statisticData.seria}`;
    cards.innerText = `Общее количество пройденных карточек: ${statisticData.cards}`;
    rightAnswer.innerText = `Процент правильных ответов: ${proportionRightAnswer * 100}%`;
    delete statisticData.seria;
    delete statisticData.cards;
    delete statisticData.rightAnswer;
  }
}
createStatisticsText();
statisticData['начало использования приложения'] = 0;

function createDataWords() {
  const statistics = Object.entries(statisticData);
  statistics.sort((first, second) => first[NEXT_NUMBER] - second[NEXT_NUMBER]);
  days = statistics.map((element) => element[MIN_NUMBER]);
  words = statistics.map((element) => element[NEXT_NUMBER]);
  numberWords = words.slice(-NEXT_NUMBER);
  elementNumberWords.innerText = numberWords;
}

function createLabels() {
  createDataWords();
  const numberLabels = Math.round(days.length / NUMBER_DATES);
  const dataLabels = days.map((day, index) => {
    let currentDay = '';
    if (index % numberLabels === MIN_NUMBER) {
      currentDay = day;
    }
    return currentDay;
  });
  return dataLabels;
}

const speedData = {
  labels: createLabels(),
  datasets: [{
    label: 'Изучаемые слова',
    data: words,
    borderColor: 'rgba(255,45,45,1)',
    backgroundColor: 'rgba(255,90,90,0.5)',
  }],
};

const chartOptions = {
  tooltips: {
    enabled: true,
    titleFontSize: MIN_NUMBER,
    callbacks: {
      label(tooltipItem, data) {
        let label = data.datasets[tooltipItem.datasetIndex].label || '';
        label = `${days[tooltipItem.index]}, количество слов: ${words[tooltipItem.index]}`;
        return label;
      },
    },
  },
  scales: {
    yAxes: [{
      ticks: {
        suggestedMin: MIN_NUMBER,
        stepSize: NUMBER_STEP_SIZE,
        callback(value) {
          return `${value / NUMBER_ONE_PERCENT}%`;
        },
      },
    }],
  },
};

const lineChart = new Chart(speedCanvas, {
  type: 'line',
  data: speedData,
  options: chartOptions,
});
lineChart.update();
