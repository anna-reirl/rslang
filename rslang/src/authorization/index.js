import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import './scss/authorization.scss';
import { authorization } from './js/authorization';
// import { setBodyDataToDom } from '../js/helpers';

window.onload = async () => {
  // await setBodyDataToDom('authorization.html');
  authorization();
};
