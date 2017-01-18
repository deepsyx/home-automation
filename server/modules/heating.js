const rpio = require('rpio');
const piBlaster = require('../utils/pi-blaster');

const RELAY_PIN = 31;
const SERVO_PIN = 12;
const SERVO_GPIO = 18;

rpio.open(RELAY_PIN, rpio.OUTPUT, rpio.HIGH);
rpio.open(SERVO_PIN, rpio.OUTPUT, rpio.LOW);

let currentState = {
	isEnabled: false,
	value: 0
};

function calculatePwm (percentage) {
	return (0.5 + percentage / 100 * 1.9) / 10;
}

piBlaster(SERVO_GPIO, calculatePwm(0));

module.exports = function (key, value, broadcast) {
	if (key === 'HEATING') {
		rpio.write(RELAY_PIN, value.isEnabled ? rpio.HIGH : rpio.LOW);
		piBlaster(SERVO_GPIO, calculatePwm(value.value));
		currentState = value;
	}

	if (key === 'HEATING' || key === 'STATUS') {
		broadcast('HEATING', currentState);
	}
}
