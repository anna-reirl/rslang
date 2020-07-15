/* eslint-disable import/no-cycle */
import apiService from './GetData';

export const createLink = (link) => {
  const linkElement = document.createElement('a');
  linkElement.href = link;
  return linkElement;
};

export const routeTo = (path) => {
  window.location.href = path;
};

export const routeToAuth = () => {
  window.location.href = 'authorization.html';
};

export const renderHeadDataToDom = (head) => {
  const headElement = document.querySelector('head');
  Array.from(head.children).forEach((it) => {
    headElement.insertAdjacentElement('beforeend', it);
  });
  return headElement;
};

export const renderBodyDataToDom = (body) => {
  const bodyElement = document.querySelector('body > script');
  Array.from(body.children).forEach((it) => {
    if (it.localName === 'script') return;
    bodyElement.insertAdjacentElement('beforebegin', it);
  });
};

export const removeToken = () => {
  const localStorageData = JSON.parse(localStorage.getItem('SWAuthData'));
  delete localStorageData.token;
  delete localStorageData.refreshToken;
  delete localStorageData.time;
  const newLocalStorageData = JSON.stringify(localStorageData);
  return localStorage.setItem('SWAuthData', newLocalStorageData);
};

export const checkTokenIsValid = () => {
  const localStorageData = JSON.parse(localStorage.getItem('SWAuthData'));
  let result = false;
  if (localStorageData && localStorageData.token) {
    const tokenTime = new Date(localStorageData.time);
    const now = new Date();
    const comp = now - tokenTime;
    result = comp < 14400000;
  }
  return result;
};

export const updateToken = () => {
  const localData = JSON.parse(localStorage.getItem('SWAuthData'));
  apiService.updateToken(`https://afternoon-falls-25894.herokuapp.com/users/${localData.userId}/tokens`, localData.refreshToken)
    .then((response) => {
      if (!response) return;
      const loginAuthData = {
        ...localData,
        token: response.data.token,
        refreshToken: response.data.refreshToken,
        time: new Date(),
      };
      localStorage.setItem('SWAuthData', JSON.stringify(loginAuthData));
    });
};

export const renderAlert = (alertValue, alertClass) => {
  const alertContainer = document.createElement('div');
  const dopClass = alertClass || 'alert-danger';
  alertContainer.classList.add('alert', dopClass);
  alertContainer.setAttribute('role', 'alert');
  alertContainer.innerText = alertValue;
  const closeIcon = document.createElement('span');
  closeIcon.classList.add('icon', 'icon-close');
  alertContainer.insertAdjacentElement('afterbegin', closeIcon);
  closeIcon.addEventListener('click', () => {
    alertContainer.classList.add('hide');
    setTimeout(() => alertContainer.remove(), 300);
  });
  setTimeout(() => {
    alertContainer.classList.add('hide');
    setTimeout(() => alertContainer.remove(), 300);
  }, 5000);
  return document.querySelector('body').insertAdjacentElement('afterbegin', alertContainer);
};

export default {};
