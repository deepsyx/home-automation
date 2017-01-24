const exec = require('child_process').execSync;
const ACRecord = require('home-records').Modules.AC;

const IRSEND_CMD = 'irsend SEND_ONCE MY_REMOTE ';

let state = new ACRecord();

module.exports = function (key, value, broadcast) {
    if (key === 'AC') {
        let command = `${value.mode}_swingauto_fan${value.fanspeed}_${value.temperature}`;

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
