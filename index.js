require('express-async-errors');
const winston = require('winston');
// const { createLogger, transports, format } = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

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

throw new Error('Something failed during startup.');

if (!config.get('jwtPrivateKey')) {
	console.log('FATAL ERROR: vidly_jwtPrivateKey is not defined.');
	process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error(`Could not connect to MongoDB with error: ${err.message}`));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening in port ${port}...`);
});