const winston = require('winston');
// const { createLogger, transports, format } = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports.logger = winston;

module.exports.init = function() {
	winston.add(new winston.transports.File({ filename: 'logfile.log' }));
	// winston.add(new winston.transports.Console({ 
	// 	format: winston.format.simple()
	// }));
	winston.add(new winston.transports.Console({
		format: winston.format.simple(),
		handleExceptions: true
	}));
	// winston.add(new winston.transports.MongoDB({ 
	// 	db: 'mongodb://localhost/vidly',
	// 	level: 'info'
	// }));
	winston.add(new winston.transports.File({
		filename: 'exceptions.log',
		handleExceptions: true
	}));
	// winston.exitOnError = false;

	/*
	process.on('uncaughtException', (ex) => {
		// console.log(`WE GOT AN ENCAUGHT EXCEPTION: ${ex}`);
		// winston.error(ex.message, ex);
		// process.exit(1);
	});
	*/

	process.on('unhandledRejection', (ex) => {
		// console.log(`unhandledRejection: ${ex}`);
		throw ex;
	/*
	// console.log('WE GOT AN UNHANDLED REGECTION.');
	winston.error(ex.message, ex);
	process.exit(1);
	*/
	});

	// Unhandled promise rejection
	// const p = Promise.reject(new Error('Something failed miserably!'));
	// p.then(() => console.log('Done'));

	// throw new Error('Something failed during startup.');
};