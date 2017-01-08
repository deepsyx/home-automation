const exec = require('child_process').execSync;

let mode = 'off';

const IRSEND_CMD = 'irsend SEND_ONCE MY_REMOTE ';
exec(IRSEND_CMD + mode);

module.exports = function (key, value, broadcast) {
	if (key === 'AC') {
		// mode, fan, degree
		// irsend SEND_ONCE MY_REMOTE cool_swingauto_fanauto_30
		const pieces = value.toLowerCase().split(':');
		const mode = pieces[0] + '_swingauto_fan' + pieces[1] + '_' + degree;
		exec(IRSEND_CMD + mode);
		mode = value;
	}

	if (key === 'STATUS' || key === 'AC') {
		broadcast('AC', mode);
	}
}
