import 'bootstrap';

const createElement = (type, attributes = {}, styles = {}) => {
    const elem = document.createElement(type);
    Object.keys(attributes).forEach((key) => {
        if (key === 'classList') {
            elem.classList.add(...attributes[key]);
        } else {
            elem[key] = attributes[key];
        }
    });
    Object.keys(styles).forEach((key) => {
        elem.style[key] = styles[key];
    });
    return elem;
};
export default createElement;