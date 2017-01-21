const rpio = require('rpio');
const piBlaster = require('../utils/pi-blaster');

const FLOOR_LED_GPIO = [17, 27, 22];

let ledState = {
    r: 0,
    g: 0,
    b: 0,
    isEnabled: false,
    record: 'LedFloor'
};

module.exports = function (key, value, broadcast) {
    if (key === 'LedFloor') {
        const pieces = value;
        ledState = value;

        if (!pieces.isEnabled) {
            [0, 1, 2].forEach((id) => {
                piBlaster(FLOOR_LED_GPIO[id], 0);
            });
        } else {
            ['r', 'g', 'b'].forEach((color, id) => {
                piBlaster(FLOOR_LED_GPIO[id], pieces[color] / 100);
            });
        }
    }

    if (key === 'LedFloor' || key === 'STATUS') {
        broadcast('LedFloor', ledState);
    }
}
