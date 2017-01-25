const exec = require('child_process').execSync;

function pwm (pin, value) {
    return exec(`echo "${pin}=${parseFloat(value)}" > /dev/pi-blaster`);
};

function turn (pin, state) {
    const value = state ? 1 : 0;
    exec(`gpio -g mode ${pin} out`);
    return exec(`gpio -g write ${pin} ${value}`);
}

module.exports = {
    pwm,
    turn,
};
