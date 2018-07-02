const Joi = require('joi');
const mongoose = require('mongoose');

const minlength = 3;

const User = mongoose.model('User', new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: minlength,
		maxlength: 50
	},
	email: {
		type: String,
		required: true,
		minlength: minlength,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: minlength,
		maxlength: 1024
	}
}));

function validateUser(user) {
	const schema = {
		name: Joi.string().min(minlength).max(50).required(),
		email: Joi.string().min(minlength).max(255).required().email(),
		password: Joi.string().min(minlength).max(255).required()
	};
	return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;