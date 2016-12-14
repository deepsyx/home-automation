const rpio = require('rpio');

const RELAY_PIN = 26;
const SERVO_PIN = 19;

rpio.open(RELAY_PIN, rpio.OUTPUT, rpio.LOW);

rpio.open(SERVO_PIN, rpio.PWM);
rpio.pwmSetClockDivider(50);
rpio.pwmSetRange(SERVO_PIN, 100);

module.exports = function (key, value) {
	if (key === 'HEATING') {
		const status = Number(value);
		rpio.write(RELAY_PIN, status ? rpio.HIGH : rpio.LOW);

		console.log('Switching relay to: ' + status);
	}

	if (key === 'HEATING_VALUE') {
		const percentage = Number(value);
		rpio.pwmSetData(SERVO_PIN, percentage);

		console.log('Switching servo to ' + percentage);
	}
}