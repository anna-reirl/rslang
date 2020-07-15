import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import { renderSideBar } from '../js/SideBar/SideBar';
import {
  checkTokenIsValid, routeToAuth, updateToken,
} from '../js/helpers';

import './scss/style.scss';

window.onload = async() => {
    if (localStorage.getItem('SWAuthData')) {
        if (!checkTokenIsValid()) {
            updateToken();
        }
        renderSideBar();
        const { renderApp } = await
        import ('./js/savannah');
        renderApp();
    } else {
        routeToAuth();
    }
};
