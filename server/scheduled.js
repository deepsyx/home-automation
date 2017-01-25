const getTemperature = require('./utils/temperature');
const TemperatureRecord = require('home-records').Modules.Temperature;

module.exports = function ScheduledJobs (broadcast) {

    // broadcast temperature to all connections every second
    setInterval(() => {
        getTemperature().then((temperature) => {
            broadcast('Temperature', new TemperatureRecord({
                temperature
            }));
        });
    }, 1000);
}
