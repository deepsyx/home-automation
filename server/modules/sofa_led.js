const rpio = require('rpio');
const piBlaster = require('../utils/pi-blaster');

const SOFA_LED_GPIO_PIN = 23;

let ledState = {
    isEnabled: false,
    value: 100
};

module.exports = function (key, value, broadcast) {
    if (key === 'LED_SOFA') {
        if (!value.isEnabled) {
            piBlaster(SOFA_LED_GPIO_PIN, 0);
        } else {
            piBlaster(SOFA_LED_GPIO_PIN, value.value / 100);
        }
        ledState = value;
    }

    if (key === 'LED_SOFA' || key === 'STATUS') {
        broadcast('LED_SOFA', ledState);
    }
}
