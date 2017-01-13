const rpio = require('rpio');
const exec = require('child_process').execSync;


const RELAY_PIN = 31;
const SERVO_PIN = 12;

rpio.open(RELAY_PIN, rpio.OUTPUT, rpio.HIGH);
rpio.open(SERVO_PIN, rpio.OUTPUT, rpio.LOW);

let pwmPercentage = 0;

function calculatePwm (percentage) {
	return (0.5 + percentage / 100 * 1.9) / 10;
}

module.exports = function (key, value, broadcast) {
	if (key === 'HEATING') {
		const status = Number(value);
		rpio.write(RELAY_PIN, status ? rpio.HIGH : rpio.LOW);
	}

	if (key === 'HEATING' || key === 'STATUS') {
		broadcast('HEATING', rpio.read(RELAY_PIN));
	}


	if (key === 'HEATING_VALUE') {
		const percentage = Number(value);
		pwmPercentage = percentage;
		exec('echo "' + 18 + '=' + calculatePwm(percentage) + '" > /dev/pi-blaster');
	}

	if (key === 'HEATING_VALUE' || key === 'STATUS') {
		broadcast('HEATING_VALUE', pwmPercentage);
	}
}
