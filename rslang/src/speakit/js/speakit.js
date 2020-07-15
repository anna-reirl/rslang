/* eslint-disable import/no-cycle */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import apiService from '../../js/GetData';
import { handleMenuClick, getActiveLevel, getActiveLevelPage } from './utils';
import WordsList from './WordsList';
import { renderButtonsToDom } from './buttons';

let dataArr = [];
let dataArrActive = [];
let page = 0;
let level = 0;

export const setDataArr = (data) => {
  dataArr = data;
};

export const getDataArr = () => dataArr;

export const setDataArrActive = (data) => {
  dataArrActive = data;
};

export const getDataArrActive = () => dataArrActive;

export const setPage = (num) => {
  page = num;
  const localDataConfig = JSON.parse(localStorage.getItem('speakitConfig'));
  const newLocalDataConfig = { ...localDataConfig, page: num };
  localStorage.setItem('speakitConfig', JSON.stringify(newLocalDataConfig));
};

export const getPage = () => JSON.parse(localStorage.getItem('speakitConfig')).page;

export const setLevel = (num) => {
  level = num;
  const localDataConfig = JSON.parse(localStorage.getItem('speakitConfig'));
  const newLocalDataConfig = { ...localDataConfig, level: num };
  localStorage.setItem('speakitConfig', JSON.stringify(newLocalDataConfig));
};

export const getLevel = () => JSON.parse(localStorage.getItem('speakitConfig')).level;

const getActiveDataList = () => {
  const suffleArr = Array.isArray(dataArr) ? dataArr.sort(() => Math.random() - 0.5) : [];
  const dataList = suffleArr.slice(0, 10);
  setDataArrActive(dataList);
  return dataList;
};

export const renderWordsList = () => {
  const dataLIst = getActiveDataList();
  const wordsList = new WordsList(dataLIst);
  wordsList.init();
};

export const setDataFromReq = (data) => {
  dataArr = [];
  setDataArr(data);
  renderWordsList();
};

export const setActiveLevel = () => {
  level = getActiveLevel();
  const localDataConfig = JSON.parse(localStorage.getItem('speakitConfig'));
  const newLocalDataConfig = { ...localDataConfig, level: getActiveLevel() };
  localStorage.setItem('speakitConfig', JSON.stringify(newLocalDataConfig));
};

export const setActiveLevelPage = () => {
  const activePage = getActiveLevelPage();
  page = activePage;
  const localDataConfig = JSON.parse(localStorage.getItem('speakitConfig'));
  const newLocalDataConfig = { ...localDataConfig, page: activePage };
  localStorage.setItem('speakitConfig', JSON.stringify(newLocalDataConfig));
};

export const renderWords = () => {
  setActiveLevelPage();
  const linkRequest = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${level}`;
  return apiService.getWords(linkRequest)
    .then((response) => setDataFromReq(response.data))
    .catch((error) => {
      throw new Error(error);
    })
    .then(() => document.querySelector('nav.header_navigation > ul').addEventListener('click', handleMenuClick));
};

export const renderApp = () => {
  setActiveLevelPage();
  setActiveLevel();
  renderWords();
  renderButtonsToDom();
};
