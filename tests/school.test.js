const request = require('supertest');
const app = require('../src/app');
const db = require('../src/config/database');

beforeAll(async () => {
    await db(); // Establish database connection
});

afterAll(async () => {
    // Close database connection if necessary
});

describe('School Management API', () => {
    describe('POST /addSchool', () => {
        it('should add a new school and return the school data', async () => {
            const newSchool = {
                name: 'Test School',
                address: '123 Test St',
                latitude: 40.7128,
                longitude: -74.0060
            };

            const response = await request(app)
                .post('/addSchool')
                .send(newSchool)
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(newSchool.name);
            expect(response.body.address).toBe(newSchool.address);
            expect(response.body.latitude).toBe(newSchool.latitude);
            expect(response.body.longitude).toBe(newSchool.longitude);
        });

        it('should return 400 if data is invalid', async () => {
            const invalidSchool = {
                name: '',
                address: '123 Test St',
                latitude: 'invalid_latitude',
                longitude: -74.0060
            };

            const response = await request(app)
                .post('/addSchool')
                .send(invalidSchool)
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });
    });

    describe('GET /listSchools', () => {
        it('should return a list of schools sorted by proximity', async () => {
            const userLocation = {
                latitude: 40.7128,
                longitude: -74.0060
            };

            const response = await request(app)
                .get('/listSchools')
                .query(userLocation)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('should return 400 if location parameters are missing', async () => {
            const response = await request(app)
                .get('/listSchools')
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });
    });
});