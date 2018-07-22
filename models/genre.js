const Joi = require('joi');
const mongoose = require('mongoose');

const minlength = 3;
const maxlength = 50;

const genreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: minlength,
		maxlength: maxlength
	}
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
	const schema = {
		name: Joi.string().min(minlength).max(maxlength).required()
	};
	return Joi.validate(genre, schema);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;