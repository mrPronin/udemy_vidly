const {Rental} = require('../../models/rental');
const mongoose = require('mongoose');
const request = require('supertest');

/* eslint-disable no-undef */
describe('/api/returns', () => {
	let server;
	let token;
	let customerId;
	let movieId;
	let rental;

	const exec = async () => {
		return await request(server)
			.post('/api/returns')
			.set('x-auth-token', token)
			.send({ customerId, movieId });
	};

	beforeEach(async () => {
		server = require('../../index');
        
		customerId = mongoose.Types.ObjectId();
		movieId = mongoose.Types.ObjectId();

		rental = new Rental({
			customer: {
				_id: customerId,
				name: '12345',
				phone: '12345'
			},
			movie: {
				_id: movieId,
				title: '12345',
				dailyRentalRate: 2
			}
		});
		await rental.save();
	});
	afterEach(async () => { 
		await server.close();
		await Rental.remove({});
	});

	it('should return 401 if client is not logged in', async () => {
		token = '';
		const res = await exec();

		expect(res.status).toBe(401);
	});
});
/* eslint-enable no-undef */