require('express-async-errors');
const winston = require('winston');
// const { createLogger, transports, format } = require('winston');
require('winston-mongodb');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();
require('./startup/routes')(app);
require('./startup/db')();

/*
process.on('uncaughtException', (ex) => {
	// console.log('WE GOT AN ENCAUGHT EXCEPTION.');
	winston.error(ex.message, ex);
	process.exit(1);
});
*/

process.on('unhandledRejection', (ex) => {
	throw ex;
	/*
	// console.log('WE GOT AN UNHANDLED REGECTION.');
	winston.error(ex.message, ex);
	process.exit(1);
	*/
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.Console({ format: winston.format.simple() }));
winston.add(new winston.transports.MongoDB({ 
	db: 'mongodb://localhost/vidly',
	level: 'info'
}));
winston.add(new winston.transports.File({
	filename: 'exceptions.log',
	handleExceptions: true
}));
winston.exitOnError = false;

// Unhandled promise rejection
// const p = Promise.reject(new Error('Something failed miserably!'));
// p.then(() => console.log('Done'));

// throw new Error('Something failed during startup.');

if (!config.get('jwtPrivateKey')) {
	console.log('FATAL ERROR: vidly_jwtPrivateKey is not defined.');
	process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening in port ${port}...`);
});