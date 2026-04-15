const request = require('supertest');
const app = require('../src/app');

describe('DevOps demo API', () => {

    test('GET /health returns status ok', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ status: 'ok' });
    });

    test('GET /message returns presentation info', async () => {
        const res = await request(app).get('/message');
        expect(res.statusCode).toBe(200);
        expect(res.body.course).toBe('SEng5304');
        expect(res.body.topic).toContain('DevOps');
    });

    test('GET /demo-update returns updated demo status', async () => {
        const res = await request(app).get('/demo-update');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            message: 'demo updated and ready',
            routes: ['/health', '/message', '/signup', '/login', '/profile/:id', '/about']
        });
    });

    test('GET /about returns app summary', async () => {
        const res = await request(app).get('/about');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            app: 'DevOps Demo',
            purpose: 'Show CI/CD, testing, and profile management',
            status: 'ready for presentation'
        });
    });

    test('POST /signup success', async () => {
        const res = await request(app)
            .post('/signup')
            .send({ name: 'Dagi', email: 'dagi@example.com' });

        expect(res.statusCode).toBe(201);
        expect(res.body.user.name).toBe('Dagi');
    });

    test('POST /signup fails if missing data', async () => {
        const res = await request(app)
            .post('/signup')
            .send({ name: 'Dagi' });

        expect(res.statusCode).toBe(400);
    });

    test('POST /login fails if missing data', async () => {
        const res = await request(app)
            .post('/login')
            .send({ email: 'test@test.com' });

        expect(res.statusCode).toBe(400);
    });

    test('POST /login invalid credentials', async () => {
        const res = await request(app)
            .post('/login')
            .send({ email: 'test@test.com', password: '123' });

        expect(res.statusCode).toBe(401);
    });

    test('GET /profile-fake returns demo profile', async () => {
        const res = await request(app).get('/profile-fake/999');
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Demo User');
    });

    test('GET /profile returns real profile', async () => {
        const res = await request(app).get('/profile/101');
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Dagi');
    });

    test('GET /profile returns 404 if not found', async () => {
        const res = await request(app).get('/profile/999');
        expect(res.statusCode).toBe(404);
    });

    test('PUT /profile updates profile', async () => {
        const res = await request(app)
            .put('/profile/101')
            .send({
                name: 'Updated',
                role: 'Leader',
                bio: 'Updated bio'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.profile.name).toBe('Updated');
    });

    test('PUT /profile fails if missing fields', async () => {
        const res = await request(app)
            .put('/profile/101')
            .send({ name: 'Only name' });

        expect(res.statusCode).toBe(400);
    });

});