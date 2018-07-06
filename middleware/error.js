const logger = require('../startup/logging').logger;

/* eslint-disable no-unused-vars */

module.exports = function(err, req, res, next) {
	// Log the exception
	// logging levels
	// error
	// warn
	// info
	// verbose
	// debug
	// silly

	logger.log({
		level: 'error', 
		message: err.message,
		meta: err
	});
	// winston.error(err.message, err);
	
	res.status(500).send('Something failed.');
};

/* eslint-enable no-unused-vars */