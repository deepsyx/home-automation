const rpio = require('rpio');
const piBlaster = require('../utils/pi-blaster');
const HeatingRecord = require('home-records').Modules.Heating;

const RELAY_PIN = 31;
const SERVO_PIN = 12;
const SERVO_GPIO = 18;

rpio.open(RELAY_PIN, rpio.OUTPUT, rpio.HIGH);
rpio.open(SERVO_PIN, rpio.OUTPUT, rpio.LOW);

let state = new HeatingRecord();

function calculatePwm (percentage) {
    return (0.5 + percentage / 100 * 1.9) / 10;
}

piBlaster(SERVO_GPIO, calculatePwm(0));

module.exports = function (key, value, broadcast) {
    if (key === 'Heating') {
        rpio.write(RELAY_PIN, value.isEnabled ? rpio.HIGH : rpio.LOW);
        piBlaster(SERVO_GPIO, calculatePwm(value.value));
        state = value;
    }

    if (key === 'Heating' || key === 'STATUS') {
        broadcast('Heating', state);
    }
}
