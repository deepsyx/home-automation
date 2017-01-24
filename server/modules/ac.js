const exec = require('child_process').execSync;
const ACRecord = require('home-records').Modules.AC;

let state = new ACRecord();

const IRSEND_CMD = 'irsend SEND_ONCE MY_REMOTE ';

module.exports = function (key, value, broadcast) {
    if (key === 'AC') {
        let command = `${value.mode}_swingauto_fan_${value.fanspeed}_${value.temperature}`;

        if (!value.isEnabled) {
            command = 'off';
        }

        exec(IRSEND_CMD + command);
        state = value;
    }

    if (key === 'STATUS' || key === 'AC') {
        broadcast('AC', state);
    }
}
