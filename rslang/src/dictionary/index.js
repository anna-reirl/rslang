import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import { renderSideBar } from '../js/SideBar/SideBar';
import './css/style.scss';
import {
  // setBodyDataToDom,
  checkTokenIsValid, routeToAuth, updateToken,
} from '../js/helpers';

window.onload = async () => {
  if (localStorage.getItem('SWAuthData')) {
    if (!checkTokenIsValid()) {
      updateToken();
    }
    // await setBodyDataToDom('dictionary.html');
    renderSideBar();
    await import('./js/dictionary');
  } else {
    routeToAuth();
  }
};
