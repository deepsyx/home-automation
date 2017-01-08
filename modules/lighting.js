const rpio = require('rpio');

const FLOOR_LED_STRIP_PINS = [11, 15, 13]; // 17, 22, 27
const SOFA_LED_STRIP_PIN = 33;

FLOOR_LED_STRIP_PINS.forEach((pinId) => rpio.open(pinId, rpio.OUTPUT, rpio.LOW));
rpio.open(SOFA_LED_STRIP_PIN, rpio.OUTPUT, rpio.LOW);

module.exports = function (key, value, broadcast) {
	if (key === 'LED_FLOOR') {
		const pieces = value.split(':');

		if (pieces.length !== 3) {
			return console.warn('invalid LED_FLOOR command: ' + value);
		}

		[0, 1, 2].forEach((id) => {
			rpio.write(
				FLOOR_LED_STRIP_PINS[id],
				pieces[id] === '1' ? rpio.HIGH : rpio.LOW
			);
		});
	}

	if (key === 'LED_FLOOR' || key === 'STATUS') {
		const status = [0, 1, 2].map((id) => {
			return rpio.read(FLOOR_LED_STRIP_PINS[id]);
		}).join(':');

		broadcast('LED_FLOOR', status);
	}

	if (key === 'LED_SOFA') {
		rpio.write(SOFA_LED_STRIP_PIN, Number(value) ? rpio.HIGH : rpio.LOW);
		console.log(Number(value));
	}

	if (key === 'LED_SOFA' || key === 'STATUS') {
		broadcast('LED_SOFA', rpio.read(SOFA_LED_STRIP_PIN));
	}
}
