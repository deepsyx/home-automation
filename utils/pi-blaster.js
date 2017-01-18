const exec = require('child_process').execSync;

module.exports = function (pin, value) {
	return exec(`echo "${pin}=${parseFloat(value)}" > /dev/pi-blaster`);
};