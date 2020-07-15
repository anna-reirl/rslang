import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import { renderSideBar } from '../js/SideBar/SideBar';
import {
  // setBodyDataToDom,
  checkTokenIsValid, routeToAuth, updateToken,
} from '../js/helpers';

import './css/style.scss';

window.onload = async () => {
  if (localStorage.getItem('SWAuthData')) {
    if (!checkTokenIsValid()) {
      updateToken();
    }
    // await setBodyDataToDom('speakit.html');
    renderSideBar();
    const { renderStartPage } = await import('./js/startPage');
    renderStartPage();
  } else {
    routeToAuth();
  }
};
