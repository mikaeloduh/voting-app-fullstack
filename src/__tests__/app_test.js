const mongoose = require('mongoose');
const request = require('supertest');

require('dotenv').config();

const app = require('../app');

describe('Test app', () => {

  beforeAll(async () => {
    connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('Test Hello World', async () => {
    let response = await request(app).get('/test');

    expect(response.statusCode).toBe(200);
  });

});
