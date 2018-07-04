const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const minlength = 3;

const userSchema = new mongoose.Schema({
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
});

// Information Expert Principle
userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
	return token;
};

const User = mongoose.model('User', userSchema);

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