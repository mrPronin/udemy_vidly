const Joi = require('joi');
const mongoose = require('mongoose');

const minlength = 3;
const Customer = mongoose.model('Customer', new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: minlength,
		maxlength: 50
	},
	isGold: {
		type: Boolean,
		default: false
	},
	phone: {
		type: String,
		required: true,
		minlength: minlength,
		maxlength: 50
	}
}));

function validateCustomer(customer) {
	const schema = {
		name: Joi.string().min(minlength).max(50).required(),
		phone: Joi.string().min(minlength).max(50).required(),
		isGold: Joi.boolean()
	};
	return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;