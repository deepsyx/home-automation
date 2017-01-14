const exec = require('child_process').execSync;

//let mode = 'heat:max:30:0';
let mode = JSON.stringify({
    mode: 'heat',
    fanspeed: 'max',
    temperature: '30',
    isEnabled: false
});

const IRSEND_CMD = 'irsend SEND_ONCE MY_REMOTE ';
//exec(IRSEND_CMD + mode);

module.exports = function (key, value, broadcast) {
	if (key === 'AC') {
		// mode, fan, degree
		// irsend SEND_ONCE MY_REMOTE cool_swingauto_fanauto_30
		console.log(value);
		const pieces = JSON.parse(value);
		console.log(pieces);
		let command = pieces.mode + '_swingauto_fan' + pieces.fanspeed + '_' + pieces.temperature;
		console.log(command);
		if (!pieces.isEnabled) {
			command = 'off';
		}

		exec(IRSEND_CMD + command);
		mode = value;
	}

	if (key === 'STATUS' || key === 'AC') {
		broadcast('AC', mode);
	}
}
