const piBlaster = require('../utils/pi-blaster');
const LedSofaRecord = require('home-records').Modules.LedSofa;

const SOFA_LED_GPIO_PIN = 23;

let state = new LedSofaRecord();

module.exports = function (key, value, broadcast) {
    if (key === 'LedSofa') {
        if (!value.isEnabled) {
            piBlaster.pwm(SOFA_LED_GPIO_PIN, 0);
        } else {
            piBlaster.pwm(SOFA_LED_GPIO_PIN, value.value / 100);
        }

        state = value;
    }

    if (key === 'LedSofa' || key === 'STATUS') {
        broadcast('LedSofa', state);
    }
}
