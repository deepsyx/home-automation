const getTemperature = require('./utils/temperature');

module.exports = function ScheduledJobs (broadcast) {

    // broadcast temperature to all connections every second
    setInterval(() => {
        getTemperature().then((temperature) => {
            broadcast('Temperature', {
                temperature,
                record: 'Temperature'
            });
        });
    }, 1000);
}