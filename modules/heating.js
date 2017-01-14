const rpio = require('rpio');
const exec = require('child_process').execSync;

const RELAY_PIN = 31;
const SERVO_PIN = 12;

rpio.open(RELAY_PIN, rpio.OUTPUT, rpio.HIGH);
rpio.open(SERVO_PIN, rpio.OUTPUT, rpio.LOW);

let currentState = {
	isEnabled: false,
	value: 0
};

function calculatePwm (percentage) {
	return (0.5 + percentage / 100 * 1.9) / 10;
}

exec('echo "' + 18 + '=' + calculatePwm(0) + '" > /dev/pi-blaster');

module.exports = function (key, value, broadcast) {
	if (key === 'HEATING') {
		rpio.write(RELAY_PIN, value.isEnabled ? rpio.HIGH : rpio.LOW);
		exec('echo "' + 18 + '=' + calculatePwm(value.value) + '" > /dev/pi-blaster');
		currentState = value;
	}

	if (key === 'HEATING' || key === 'STATUS') {
		broadcast('HEATING', currentState);
	}
}
