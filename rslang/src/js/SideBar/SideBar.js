import 'bootstrap';
import { createLink, removeToken } from '../helpers';
import { showTooltip, hideTooltip } from '../Tooltip';
import sideBarList from './sideBarList';
import './SideBar.scss';

const closeCollapsed = () => {
  const linkCollapsed = document.querySelector('.dropdown-toggle');
  const ulCollapsed = document.querySelector('ul.collapse');
  linkCollapsed.classList.add('collapsed');
  linkCollapsed.setAttribute('aria-expanded', 'false');
  ulCollapsed.classList.remove('show');
};

const toggleSidebar = () => {
  const sidebar = document.getElementById('sidebar');
  const sideBarBtn = document.querySelector('.navbar');
  if (sidebar.classList.contains('active')) {
    closeCollapsed();
  }
  sidebar.classList.toggle('active');
  sideBarBtn.classList.toggle('active');
};

const renderNavButtonToDom = () => {
  const navButtonContainer = document.createElement('nav');
  navButtonContainer.classList.add('navbar', 'navbar-expand-lg', 'navbar-light');
  const buttonElement = document.createElement('button');
  buttonElement.classList.add('btn', 'btn-light');
  buttonElement.id = 'sidebarCollapse';
  buttonElement.setAttribute('type', 'button');
  const spanElement = document.createElement('span');
  buttonElement.insertAdjacentElement('beforeend', spanElement);
  navButtonContainer.insertAdjacentElement('beforeend', buttonElement);
  document.querySelector('header').insertAdjacentElement('beforeend', navButtonContainer);
  buttonElement.addEventListener('click', toggleSidebar);
};

const renderSidebarHeaderToDom = () => {
  const sidebarHeaderContainer = document.createElement('div');
  sidebarHeaderContainer.classList.add('sidebar-header');
  const linkElement = createLink('/');
  const logoElement = document.createElement('h1');
  logoElement.classList.add('logo');
  logoElement.innerText = ('RSLang');
  logoElement.style.backgroundImage = 'url(assets/images/logo.png)';
  linkElement.insertAdjacentElement('beforeend', logoElement);
  sidebarHeaderContainer.insertAdjacentElement('beforeend', linkElement);
  document.querySelector('header').insertAdjacentElement('afterbegin', sidebarHeaderContainer);
  return sidebarHeaderContainer;
};

export default class SideBar {
  constructor() {
    this.data = sideBarList;
    this.sideBar = document.createElement('nav');
  }

  init() {
    this.sideBar.id = 'sidebar';
    renderSidebarHeaderToDom();
    this.renderNavListToDom();
    renderNavButtonToDom();
    this.addEventListener();
    return this.sideBar;
  }

  renderNavListToDom() {
    const ulElement = document.createElement('ul');
    ulElement.classList.add('list-unstyled', 'components');
    this.data.forEach((it) => {
      const liElement = document.createElement('li');
      liElement.classList.add('li-item');
      const liLink = createLink(it.link);
      liLink.classList.add(it.icon);
      liLink.innerText = it.title;
      liElement.insertAdjacentElement('beforeend', liLink);
      const iconElement = document.createElement('span');
      iconElement.classList.add('icon', it.icon);
      iconElement.style.backgroundImage = `url(assets/images/icon/${it.icon}.svg)`;
      liLink.insertAdjacentElement('afterbegin', iconElement);
      liLink.setAttribute('data-tooltip', it.title);
      liLink.setAttribute('data-placement', 'right');
      if (it.child.length > 0) {
        liLink.classList.add('dropdown-toggle');
        liLink.setAttribute('data-toggle', 'collapse');
        liLink.setAttribute('aria-expanded', 'false');
        const childUl = document.createElement('ul');
        childUl.classList.add('collapse', 'list-unstyled');
        childUl.id = 'pageSubmenu';
        it.child.forEach((ch) => {
          const chilLi = document.createElement('li');
          const childLink = createLink(ch.link);
          childLink.innerText = ch.title;
          chilLi.insertAdjacentElement('beforeend', childLink);
          childUl.insertAdjacentElement('beforeend', chilLi);
        });
        liElement.insertAdjacentElement('beforeend', childUl);
      }
      ulElement.insertAdjacentElement('beforeend', liElement);
      liLink.addEventListener('mouseover', (event) => {
        if (this.sideBar.classList.contains('active')) return;
        showTooltip(event);
      });
      liLink.addEventListener('mouseout', (event) => {
        if (this.sideBar.classList.contains('active')) return;
        hideTooltip(event);
      });
    });
    this.sideBar.insertAdjacentElement('beforeend', ulElement);
    return ulElement;
  }

  addEventListener() {
    this.sideBar.addEventListener('click', (event) => {
      if (!this.sideBar.classList.contains('active') && event.target.parentNode.classList.contains('dropdown-toggle')) {
        toggleSidebar();
        hideTooltip(event);
      }
      if (event.target.classList.contains('logout')) {
        removeToken();
      }
    });
  }
}

export const renderSideBar = () => {
  const sideBar = new SideBar();
  const sideBarElement = sideBar.init();
  document.querySelector('body').insertAdjacentElement('afterbegin', sideBarElement);
};
