const piBlaster = require('../utils/pi-blaster');
const LedFloorRecord = require('home-records').Modules.LedFloor;

const FLOOR_LED_GPIO = [17, 27, 22];
const COLOR_LABEL = ['r', 'g', 'b'];

let state = new LedFloorRecord();

module.exports = function (key, value, broadcast) {
    if (key === 'LedFloor') {
        if (!value.isEnabled) {
            COLOR_LABEL.forEach((color, id) => {
                piBlaster.pwm(FLOOR_LED_GPIO[id], 0);
            });
        } else {
            COLOR_LABEL.forEach((color, id) => {
                piBlaster.pwm(FLOOR_LED_GPIO[id], value[color] / 100);
            });
        }

        state = value;
    }

    if (key === 'LedFloor' || key === 'STATUS') {
        broadcast('LedFloor', state);
    }
}
