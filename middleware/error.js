const winston = require('winston');

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

	winston.log({
		level: 'error', 
		message: err.message,
		meta: err
	});
	// winston.error(err.message, err);
	
	res.status(500).send('Something failed.');
};

/* eslint-enable no-unused-vars */