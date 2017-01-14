const rpio = require('rpio');
const exec = require('child_process').execSync;

const FLOOR_LED_STRIP_PINS = [11, 15, 13]; // 17, 22, 27
const SOFA_LED_STRIP_PIN = 33;
const FLOOR_LED_GPIO = [17, 27, 22];

// FLOOR_LED_STRIP_PINS.forEach((pinId) => rpio.open(pinId, rpio.OUTPUT, rpio.LOW));
rpio.open(SOFA_LED_STRIP_PIN, rpio.OUTPUT, rpio.LOW);

let ledState = {
	r: 0,
	g: 0,
	b: 0,
	isEnabled: false
};

module.exports = function (key, value, broadcast) {
	if (key === 'LED_FLOOR') {
		if (Object.keys(value).length !== 4) {
			return console.warn('invalid LED_FLOOR command: ' + value);
		}
		ledState = value;

		if (!pieces.isEnabled) {
			[0, 1, 2].forEach((id) => {
				exec('echo "' + FLOOR_LED_GPIO[id] + '=0" > /dev/pi-blaster');
			});
			return;
		}

		['r', 'g', 'b'].forEach((color, id) => {
			exec('echo "' + FLOOR_LED_GPIO[id] + '=' + parseFloat(pieces[color] / 100) + '" > /dev/pi-blaster');
		});
	}

	if (key === 'LED_FLOOR' || key === 'STATUS') {
		broadcast('LED_FLOOR', ledState);
	}

	if (key === 'LED_SOFA') {
		rpio.write(SOFA_LED_STRIP_PIN, Number(value) ? rpio.HIGH : rpio.LOW);
	}

	if (key === 'LED_SOFA' || key === 'STATUS') {
		broadcast('LED_SOFA', rpio.read(SOFA_LED_STRIP_PIN));
	}
}
