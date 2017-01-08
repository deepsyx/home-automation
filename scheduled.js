const getTemperature = require('./utils/temperature');

module.exports = function ScheduledJobs (broadcast) {
	setInterval(() => {
		getTemperature().then((temperature) => {
			broadcast('TEMPERATURE', temperature);
		});
	}, 1000);
}