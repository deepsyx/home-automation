const exec = require('child_process').execSync;

function pwm (pin, value) {
    return exec(`echo "${pin}=${parseFloat(value)}" > /dev/pi-blaster`);
};

function turn (pin, state) {
    const value = state ? 1 : 0;
    return exec(`echo "${pin}=${parseFloat(value)}" > /dev/pi-blaster`);
}

module.exports = {
    pwm,
    turn,
};