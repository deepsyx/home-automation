const rpio = require('rpio');
const piBlaster = require('../utils/pi-blaster');

const SOFA_LED_GPIO_PIN = 23;

let ledState = {
    isEnabled: false,
    value: 100,
    record: 'LedSofa'
};

module.exports = function (key, value, broadcast) {
    if (key === 'LedSofa') {
        if (!value.isEnabled) {
            piBlaster(SOFA_LED_GPIO_PIN, 0);
        } else {
            piBlaster(SOFA_LED_GPIO_PIN, value.value / 100);
        }
        ledState = value;
    }

    if (key === 'LedSofa' || key === 'STATUS') {
        broadcast('LedSofa', ledState);
    }
}
