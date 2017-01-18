const exec = require('child_process').execSync;

export default function (pin, value) {
	return exec(`echo "${pin}=${parseFloat(value)}" > /dev/pi-blaster`);
};