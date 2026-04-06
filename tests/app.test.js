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

    test('POST /signup returns created user when data is valid', async () => {
        const response = await request(app)
            .post('/signup')
            .send({ name: 'Dagi', email: 'dagi@example.com' });

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            message: 'signup successful',
            user: {
                name: 'Dagi',
                email: 'dagi@example.com'
            }
        });
    });

    test('POST /signup returns 400 when name or email is missing', async () => {
        const response = await request(app)
            .post('/signup')
            .send({ name: 'Dagi' });

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            error: 'name and email are required'
        });
    });

    test('POST /login returns 400 when email or password is missing', async () => {
        const response = await request(app)
            .post('/login')
            .send({ email: 'user@example.com' });

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            error: 'email and password are required'
        });
    });

    test('POST /login returns 401 for invalid credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({ email: 'user@example.com', password: 'wrong-pass' });

        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual({
            error: 'invalid credentials'
        });
    });
});
