export default class Tooltip {
  constructor(parent, value, placement) {
    this.parent = parent;
    this.value = value;
    this.placement = placement;
    this.tooltipContainer = document.createElement('div');
    this.tooltipPointer = document.createElement('span');
  }

  show() {
    this.tooltipContainer.classList.add('tooltip__container');
    const tooltipValue = document.createElement('span');
    tooltipValue.innerText = this.value;
    this.tooltipPointer.classList.add('tooltip-pointer');
    this.tooltipContainer.insertAdjacentElement('beforeend', this.tooltipPointer);
    this.tooltipContainer.insertAdjacentElement('beforeend', tooltipValue);

    return this.tooltipContainer;
  }
}

const setStyle = (parent, placement) => {
  const position = parent.getBoundingClientRect();
  const tooltipContainer = document.querySelector('.tooltip__container');
  const tooltipPointer = document.querySelector('.tooltip-pointer');
  const tooltipContainerSize = tooltipContainer.getBoundingClientRect();
  switch (placement) {
    case 'right':
      tooltipContainer.style.top = `${position.top + position.height / 2}px`;
      tooltipContainer.style.left = `${position.right}px`;
      tooltipPointer.style.left = 0;
      tooltipPointer.style.top = '50%';
      break;
    case 'left':
      tooltipContainer.style.top = `${position.top + position.height / 2}px`;
      tooltipContainer.style.left = `${position.left - (tooltipContainerSize.width + 20)}px`;
      tooltipPointer.style.right = '-5px';
      tooltipPointer.style.top = '50%';
      tooltipPointer.style.left = 'unset';
      break;
    case 'bottom':
      tooltipContainer.style.top = `${position.top + position.height}px`;
      tooltipContainer.style.left = `${position.left + position.width / 2}px`;
      tooltipContainer.style.transform = 'translate(-50%, 0%)';
      tooltipPointer.style.top = '0';
      tooltipPointer.style.left = '50%';
      break;

    default:
      tooltipContainer.style.top = `${position.top}px`;
      tooltipContainer.style.left = `${position.left + position.width / 2}px`;
      tooltipContainer.style.transform = 'translate(-50%, -100%)';
      tooltipPointer.style.top = '100%';
      tooltipPointer.style.left = '50%';
      break;
  }
  return position;
};

export const showTooltip = (event) => {
  const { dataset } = event.currentTarget;
  const tooltip = new Tooltip(event.currentTarget, dataset.tooltip, dataset.placement);
  const tooltipElement = tooltip.show();
  document.querySelector('body').insertAdjacentElement('beforeend', tooltipElement);
  setStyle(event.currentTarget, dataset.placement);
};

export const hideTooltip = () => {
  document.querySelectorAll('.tooltip__container').forEach((it) => it.remove());
};
