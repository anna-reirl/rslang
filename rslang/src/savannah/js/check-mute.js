import constants from './constants';
import 'bootstrap';

const checkMute = () => {
    if (constants.MUTE_BTN.classList.contains('muted')) return true;
    return false;
};

export default checkMute;