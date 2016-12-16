const rpio = require('rpio');

const RELAY_PIN = 7;
const SERVO_PIN = 32;

rpio.open(RELAY_PIN, rpio.OUTPUT, rpio.HIGH);

rpio.open(SERVO_PIN, rpio.PWM);
rpio.pwmSetClockDivider(256);
rpio.pwmSetRange(SERVO_PIN, 1500);

module.exports = function (key, value) {
	if (key === 'HEATING') {
		const status = Number(value);
		rpio.write(RELAY_PIN, status ? rpio.HIGH : rpio.LOW);

		console.log('Switching relay to: ' + status);
	}

	if (key === 'HEATING_VALUE') {
		const percentage = Number(value);
		const pwmValue = percentage/100 * 145 + 40
		rpio.pwmSetData(SERVO_PIN, pwmValue);

		console.log('Switching servo to ' + percentage + '%');
	}
}
