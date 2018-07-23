const {Rental} = require('../../models/rental');
const mongoose = require('mongoose');
const request = require('supertest');
const {User} = require('../../models/user');

/* eslint-disable no-undef */
describe('/api/returns', () => {
	let server;
	let token;
	let customerId;
	let movieId;
	let rental;

	const exec = () => {
		return request(server)
			.post('/api/returns')
			.set('x-auth-token', token)
			.send({ customerId, movieId });
	};

	beforeEach(async () => {
		server = require('../../index');
        
		customerId = mongoose.Types.ObjectId();
		movieId = mongoose.Types.ObjectId();
		token = new User().generateAuthToken();

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
		await Rental.remove({});
		await server.close();
	});

	it('should return 401 if client is not logged in', async () => {
		token = '';
		const res = await exec();

		expect(res.status).toBe(401);
	});

	it('should return 400 if customerId is not provided', async () => {
		customerId = '';
		const res = await exec();

		expect(res.status).toBe(400);
	});

	it('should return 400 if movieId is not provided', async () => {
		movieId = '';
		const res = await exec();

		expect(res.status).toBe(400);
	});

	it('should return 404 if no rental found for the customer/movie', async () => {
		await Rental.remove({});

		const res = await exec();

		expect(res.status).toBe(404);
	});

	it('should return 400 if return is already processed', async () => {
		rental.dateReturned = new Date();
		await rental.save();

		const res = await exec();

		expect(res.status).toBe(400);
	});

	it('should return 200 if we have a valid request', async () => {
		const res = await exec();

		expect(res.status).toBe(200);
	});
});
/* eslint-enable no-undef */