/* eslint-disable import/no-cycle */
import { createLink } from '../helpers';

export default class Modal {
  constructor(title, value, addClass, buttons) {
    this.title = title;
    this.value = value;
    this.addClass = addClass;
    this.buttons = buttons;
    this.modal = document.createElement('div');
    this.modalDialog = document.createElement('div');
    this.modalContent = document.createElement('div');
  }

  init() {
    const modalContainer = this.renderModalContainer();
    const modalTitle = this.renderModalTitle();
    const modalValue = this.renderModalBody();
    const modalButtons = this.buttons.length > 0 ? this.renderModalButtons() : null;
    this.modalContent.insertAdjacentElement('beforeend', modalTitle);
    this.modalContent.insertAdjacentElement('beforeend', modalValue);
    this.modalContent.insertAdjacentElement('beforeend', modalButtons);
    this.modal.style.display = 'block';
    document.querySelector('body').insertAdjacentElement('afterbegin', this.modal);
    return modalContainer;
  }

  renderModalContainer() {
    this.modal.classList.add('modal');
    this.modal.setAttribute('tabindex', '-1');
    this.modal.setAttribute('role', 'dialog');
    this.modalDialog.classList.add('modal-dialog', 'modal-dialog-centered', 'modal-dialog-scrollable', this.addClass);
    this.modalContent.classList.add('modal-content');
    this.modalDialog.insertAdjacentElement('beforeend', this.modalContent);
    this.modal.insertAdjacentElement('beforeend', this.modalDialog);
    return this.modal;
  }

  renderModalTitle() {
    const modalTitleContainer = document.createElement('div');
    const modalTitle = document.createElement('h5');
    modalTitleContainer.classList.add('modal-header');
    modalTitle.classList.add('modal-title');
    modalTitle.innerText = this.title;
    const modalClose = this.renderButtonClode();
    modalTitleContainer.insertAdjacentElement('beforeend', modalTitle);
    modalTitleContainer.insertAdjacentElement('beforeend', modalClose);
    return modalTitleContainer;
  }

  renderButtonClode() {
    const closeContainer = document.createElement('button');
    const closeContainerSpan = document.createElement('span');
    closeContainer.classList.add('close');
    closeContainer.setAttribute('data-dismiss', 'modal');
    closeContainer.setAttribute('aria-label', 'Close');
    closeContainerSpan.setAttribute('aria-hidden', 'true');
    closeContainerSpan.classList.add('icon', 'icon-close');
    closeContainer.insertAdjacentElement('beforeend', closeContainerSpan);
    closeContainerSpan.addEventListener('click', () => this.modal.remove());
    return closeContainer;
  }

  renderModalBody() {
    const modalBodyContainer = document.createElement('div');
    const modalBodyP = document.createElement('p');
    modalBodyContainer.classList.add('modal-body');
    modalBodyP.innerText = this.value;
    modalBodyContainer.insertAdjacentElement('beforeend', modalBodyP);
    return modalBodyContainer;
  }

  renderModalButtons() {
    const modalFooterContainer = document.createElement('div');
    modalFooterContainer.classList.add('modal-footer');
    if (this.buttons.length > 0) {
      this.buttons.forEach((it) => {
        const buttonElement = createLink(it.buttonLink);
        buttonElement.classList.add('btn', it.buttonClass);
        buttonElement.innerText = it.buttonText;
        modalFooterContainer.insertAdjacentElement('beforeend', buttonElement);
      });
    }
    return modalFooterContainer;
  }
}
