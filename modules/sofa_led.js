const rpio = require('rpio');
const piBlaster = require('../utils/pi-blaster');

const SOFA_LED_STRIP_PIN = 33;

rpio.open(SOFA_LED_STRIP_PIN, rpio.OUTPUT, rpio.LOW);

let ledState = {
	isEnabled: false,
	value: 50
};

module.exports = function (key, value, broadcast) {
	if (key === 'LED_SOFA') {
		if (!value.isEnabled) {
			piBlaster(13, 0);
		} else {
			piBlaster(13, value.value / 100);
		}
		ledState = value;
	}

	if (key === 'LED_SOFA' || key === 'STATUS') {
		broadcast('LED_SOFA', ledState);
	}
}
