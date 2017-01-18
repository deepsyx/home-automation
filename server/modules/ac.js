const exec = require('child_process').execSync;

let mode = {
    mode: 'heat',
    fanspeed: 'max',
    temperature: '30',
    isEnabled: false
};

const IRSEND_CMD = 'irsend SEND_ONCE MY_REMOTE ';

module.exports = function (key, value, broadcast) {
    if (key === 'AC') {

        let command = value.mode + '_swingauto_fan' + value.fanspeed + '_' + value.temperature;

        if (!value.isEnabled) {
            command = 'off';
        }

        exec(IRSEND_CMD + command);
        mode = value;
    }

    if (key === 'STATUS' || key === 'AC') {
        broadcast('AC', mode);
    }
}
