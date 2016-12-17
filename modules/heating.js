const rpio = require('rpio');

const RELAY_PIN = 7;
const SERVO_PIN = 32;

rpio.open(RELAY_PIN, rpio.OUTPUT, rpio.HIGH);

rpio.open(SERVO_PIN, rpio.PWM);
rpio.pwmSetClockDivider(256);
rpio.pwmSetRange(SERVO_PIN, 1500);

let pwmPercentage = 0;

function calculatePwm (percentage) {
	return percentage / 100 * 145 + 40;
}

rpio.pwmSetData(SERVO_PIN, calculatePwm(0));

module.exports = function (key, value, socket) {
	if (key === 'HEATING') {
		const status = Number(value);
		rpio.write(RELAY_PIN, status ? rpio.HIGH : rpio.LOW);
	}

	if (key === 'HEATING' || key === 'STATUS') {
		socket.send('HEATING|' + rpio.read(RELAY_PIN));
	}


	if (key === 'HEATING_VALUE') {
		const percentage = Number(value);
		pwmPercentage = percentage;
		rpio.pwmSetData(SERVO_PIN, calculatePwm(percentage));
	}

	if (key === 'HEATING_VALUE' || key === 'STATUS') {
		socket.send('HEATING_VALUE|' + pwmPercentage);
	}
}
