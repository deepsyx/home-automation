const piBlaster = require('../utils/pi-blaster');
const HeatingRecord = require('home-records').Modules.Heating;

const RELAY_GPIO = 6;
const SERVO_GPIO = 18;

let state = new HeatingRecord();

piBlaster.turn(RELAY_GPIO, state.isEnabled);
piBlaster.pwm(SERVO_GPIO, calculatePwm(state.value));

function calculatePwm (percentage) {
    return (0.5 + percentage / 100 * 1.9) / 10;
}

module.exports = function (key, value, broadcast) {
    if (key === 'Heating') {
        piBlaster.turn(RELAY_GPIO, value.isEnabled);
        piBlaster.pwm(SERVO_GPIO, calculatePwm(value.value));

        state = value;
    }

    if (key === 'Heating' || key === 'STATUS') {
        broadcast('Heating', state);
    }
}
