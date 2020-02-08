const request = require('supertest');

const app = require('../app');
const { mongoDB } = require('../models/index');

describe('Test app', () => {
  beforeAll(() => {
    mongoDB.connect();
  });

  afterAll(done => {
    mongoDB.disconnect(done);
  });

  test('Test Hello World', async () => {
    let response = await request(app).get('/test');

    expect(response.statusCode).toBe(200);
  });
});
