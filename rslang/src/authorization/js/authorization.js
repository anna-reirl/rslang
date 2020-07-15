import apiService from '../../js/GetData';
import 'bootstrap';
import '../scss/authorization.scss';
import { routeTo } from '../../js/helpers';

let isValidPassword = false;
let isEqualPass = false;
let isValidEmail = false;
let isFormValid = false;
const regexValidationPassword = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/;
const regexValidationEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const getActiveTabType = () => {
  const tabActiveElement = document.querySelector('.tab_navigation > .nav_item.active');
  const { dataset: { type } } = tabActiveElement;
  return type;
};

export const logIn = async (emailValue, passwordValue) => {
  const authLogin = await apiService.loginUser({ email: `${emailValue}`, password: `${passwordValue}` })
    .then((response) => {
      if (!response) return;
      const loginAuthData = {
        ...JSON.parse(localStorage.getItem('SWAuthData')),
        email: emailValue,
        password: passwordValue,
        userId: response.data.userId,
        message: response.data.message,
        token: response.data.token,
        refreshToken: response.data.refreshToken,
        time: new Date(),
      };
      localStorage.setItem('SWAuthData', JSON.stringify(loginAuthData));
      routeTo('cardpage.html');
    });

  return authLogin;
};

export const handleAuthorize = async (event) => {
  event.preventDefault();
  event.stopPropagation();
  const userEmail = document.querySelector('input.email').value;
  const userPassword = document.querySelector('input.password').value;
  const actionType = getActiveTabType();
  const isRegistration = actionType === 'register';
  if (isRegistration && !isFormValid) return;
  if (isRegistration) {
    const userName = document.querySelector('input.name').value;
    await apiService.createUser({ email: `${userEmail}`, password: `${userPassword}` })
      .then((response) => {
        if (!response) return;
        const regAuthData = {
          name: userName,
          email: userEmail,
          password: userPassword,
          userId: response.data.id,
        };
        localStorage.setItem('SWAuthData', JSON.stringify(regAuthData));
        logIn(userEmail, userPassword);
      });
  } else logIn(userEmail, userPassword);
};

const checkIsPasswordValid = (value) => {
  if (!value) return false;
  const isValid = regexValidationPassword.test(value);
  isFormValid = isValid;
  return isValid;
};

const checkIsPasswordEqual = () => {
  const mainPass = document.querySelector('.password.main').value;
  const rSWeatPass = document.querySelector('.password.rSWeat').value;
  isFormValid = mainPass === rSWeatPass;
  return mainPass === rSWeatPass;
};

const checkIsEmailValid = (value) => {
  if (!value) return false;
  const isValid = regexValidationEmail.test(value);
  isFormValid = isValid;
  return isValid;
};

const checkIsButtonActive = (action) => {
  if (document.querySelector('.login_from_item.submit')) {
    if (
      (
        action === 'register'
      && isValidPassword
      && isEqualPass
      && isValidEmail)
      || (
        action === 'login'
        && isValidPassword
        && isValidEmail
      )
    ) {
      document.querySelector('.login_from_item.submit').removeAttribute('disabled');
    } else {
      document.querySelector('.login_from_item.submit').setAttribute('disabled', true);
    }
  }
  return isFormValid;
};

const getInputEmailElement = () => {
  const emailInputElement = document.createElement('input');
  emailInputElement.classList.add('form-control', 'login_from_item', 'email');
  emailInputElement.type = 'email';
  emailInputElement.required = true;
  emailInputElement.placeholder = 'Ваш email*';
  emailInputElement.addEventListener('keyup', (event) => {
    emailInputElement.classList.remove('valid');
    emailInputElement.classList.remove('inValid');
    isValidEmail = checkIsEmailValid(event.target.value);
    if (isValidEmail) {
      emailInputElement.classList.add('valid');
    } else {
      emailInputElement.classList.add('inValid');
    }
    checkIsButtonActive(getActiveTabType());
  });
  return emailInputElement;
};

const getInputNameElement = () => {
  const emailInputElement = document.createElement('input');
  emailInputElement.classList.add('form-control', 'login_from_item', 'name');
  emailInputElement.type = 'text';
  emailInputElement.required = true;
  emailInputElement.placeholder = 'Ваше имя*';
  return emailInputElement;
};

const getInputPasswordElement = (type) => {
  const passwordInputElement = document.createElement('input');
  passwordInputElement.classList.add('form-control', 'login_from_item', 'password', type);
  passwordInputElement.type = 'password';
  passwordInputElement.required = true;
  passwordInputElement.placeholder = type === 'main' ? 'Ваш пароль*' : 'Повторите пароль*';
  passwordInputElement.addEventListener('keyup', (event) => {
    const { value } = event.target;
    passwordInputElement.classList.remove('valid');
    passwordInputElement.classList.remove('inValid');
    if (type === 'main') {
      isValidPassword = checkIsPasswordValid(value);
      if (isValidPassword) {
        passwordInputElement.classList.add('valid');
        if (value.length > 3) document.querySelector('.pass_comment').style.display = 'none';
      } else {
        passwordInputElement.classList.add('inValid');
        if (value.length > 3) document.querySelector('.pass_comment').style.display = 'block';
      }
    } else {
      isEqualPass = checkIsPasswordEqual(value);
      if (isEqualPass && isValidPassword) {
        passwordInputElement.classList.add('valid');
        if (value.length > 3) document.querySelector('.rpass_comment').style.display = 'none';
      } else {
        passwordInputElement.classList.add('inValid');
        if (value.length > 3) document.querySelector('.rpass_comment').style.display = 'block';
      }
    }
    checkIsButtonActive(getActiveTabType());
  });
  return passwordInputElement;
};

const getSubmitBtnElement = (text) => {
  const submitBtnElement = document.createElement('button');
  submitBtnElement.classList.add('btn', 'btn-success', 'login_from_item', 'submit');
  submitBtnElement.type = 'button';
  submitBtnElement.disabled = !isFormValid;
  submitBtnElement.innerText = text;
  submitBtnElement.addEventListener('click', (event) => handleAuthorize(event));
  return submitBtnElement;
};

export const getAuthIdFromLocalStorage = () => {
  const isRegister = localStorage.getItem('SWAuthId') && localStorage.getItem('SWAuthId') !== 'undefined';
  return isRegister;
};

const getFormElements = (type) => {
  const emailInputElement = getInputEmailElement();
  const nameInputElement = type === 'register' ? getInputNameElement() : null;
  const passInputElement = getInputPasswordElement('main');
  const rSWeatPassInputElement = type === 'register' ? getInputPasswordElement('rSWeat') : null;
  const isRegistrated = getAuthIdFromLocalStorage();
  const submitInputElement = getSubmitBtnElement(!isRegistrated ? 'Войти' : 'Регистрация');
  const commentPassword = document.createElement('label');
  commentPassword.innerText = 'Пароль должен содержать не менее 8 символов, как минимум одну прописную букву,'
  + 'одну заглавную букву, одну цифру и один спецсимвол из +-_@$!%*?&#.,;:[]{}';
  commentPassword.classList.add('pass_comment');
  commentPassword.style.display = 'none';
  const commentRPassword = document.createElement('label');
  commentRPassword.innerText = 'Пароли не совпадают';
  commentRPassword.classList.add('rpass_comment');
  commentRPassword.style.display = 'none';
  return [
    nameInputElement,
    emailInputElement,
    passInputElement,
    commentPassword,
    rSWeatPassInputElement,
    commentRPassword,
    submitInputElement,
  ];
};

const renderAuthForm = (type) => {
  const formContainer = document.querySelector('form.login_form');
  formContainer.innerHTML = '';
  const formContainerElements = getFormElements(type);
  formContainerElements.map((it) => {
    if (!it) return false;
    formContainer.insertAdjacentElement('beforeend', it);
    return formContainer;
  });
  return false;
};

const runListener = () => {
  const TABNAVIGATION = document.querySelector('.tab_navigation');
  TABNAVIGATION.addEventListener('click', (event) => {
    const { parentElement: { dataset: { type }, classList } } = event.target;
    event.preventDefault();
    if (classList.contains('active')) {
      return false;
    }
    return Array.from(TABNAVIGATION.children).forEach((ch) => {
      ch.classList.remove('active');
      if (ch.dataset.type === type) {
        ch.classList.add('active');
        renderAuthForm(type);
      }
    });
  });
};

const getWrapperContainer = () => {
  const wrapperContainer = document.createElement('div');
  wrapperContainer.classList.add('wrapper');
  return wrapperContainer;
};

const getHelloText = () => {
  const helloWordContainer = document.createElement('div');
  helloWordContainer.classList.add('login_form__header');
  const h1Element = document.createElement('h1');
  h1Element.innerText = 'RSLang';

  const h3Element = document.createElement('h3');
  h3Element.innerText = 'Авторизуйтесь или зарегистрируйтесь для начала игры.';

  helloWordContainer.insertAdjacentElement('beforeend', h1Element);
  helloWordContainer.insertAdjacentElement('beforeend', h3Element);
  return helloWordContainer;
};

const getNavigateTabs = () => {
  const tabNavigationContainer = document.createElement('nav');
  tabNavigationContainer.classList.add('tab_navigation__container');
  const ulTabNavigation = document.createElement('ul');
  ulTabNavigation.classList.add('nav', 'tab_navigation');
  ['login', 'register'].map((it) => {
    const liElement = document.createElement('li');
    liElement.classList.add('nav_item', it);
    if (it === 'login') liElement.classList.add('active');
    liElement.setAttribute('data-type', it);
    const link = document.createElement('a');
    link.classList.add('nav-link');
    link.setAttribute('href', '#');
    link.innerText = it === 'login' ? 'Авторизация' : 'Регистрация';
    liElement.insertAdjacentElement('beforeend', link);
    return ulTabNavigation.insertAdjacentElement('beforeend', liElement);
  });
  tabNavigationContainer.insertAdjacentElement('beforeend', ulTabNavigation);
  return tabNavigationContainer;
};

const getFromContainer = () => {
  const fromContainer = document.createElement('div');
  fromContainer.classList.add('login_form__form_container');
  return fromContainer;
};

const getFormElementContainer = () => {
  const fromElement = document.createElement('form');
  fromElement.classList.add('form-group', 'login_form', 'from_login');
  return fromElement;
};

export const authorization = () => {
  const AUTHCONTANER = document.querySelector('section.login_from__container');
  const wrapperContainer = getWrapperContainer();
  const helloText = getHelloText();
  const formContainer = getFromContainer();
  const formElementContainer = getFormElementContainer();
  const navigateTabs = getNavigateTabs();
  formContainer.insertAdjacentElement('beforeend', navigateTabs);
  formContainer.insertAdjacentElement('beforeend', formElementContainer);
  wrapperContainer.insertAdjacentElement('beforeend', helloText);
  wrapperContainer.insertAdjacentElement('beforeend', formContainer);
  AUTHCONTANER.insertAdjacentElement('beforeend', wrapperContainer);
  renderAuthForm('login');
  runListener();
};
