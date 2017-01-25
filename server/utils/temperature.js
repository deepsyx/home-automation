const exec = require('child_process').execSync;
const fs = require('fs');

exec('modprobe w1-gpio');
exec('modprobe w1-therm');

const DEVICES_DIR = '/sys/bus/w1/devices';

const files = fs.readdirSync(DEVICES_DIR);
const deviceFolder = files.find(file => /^10/.test(file));
const deviceFile = DEVICES_DIR + '/' + deviceFolder + '/w1_slave';

function getTemperature () {
    const readFilePromise = new Promise((resolve, reject) => {
        fs.readFile(deviceFile, 'utf8', (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve(result);
        });
    });

    return readFilePromise.then(file => {
        const lines = file.split('\n');
        if (lines[0].substr(-3) !== 'YES') {
            throw new Error('Temperature device not connected');
        }

        const tempString = lines[1].split('t=')[1].trim();

        return parseFloat(tempString) / 1000.0;
    });
}

module.exports = getTemperature;
