const request = require('supertest');
const app = require('../src/app');

describe('DevOps demo API', () => {
	test('GET /health returns status ok', async () => {
		const response = await request(app).get('/health');
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({ status: 'ok' });
	});

	test('GET /message returns presentation info', async () => {
		const response = await request(app).get('/message');
		expect(response.statusCode).toBe(200);
		expect(response.body.course).toBe('SEng5304');
		expect(response.body.topic).toContain('DevOps');
	});
});
