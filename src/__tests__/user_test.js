const mongoose = require('mongoose');
const request = require('supertest');

require('dotenv').config();

const app = require('../app');
const db = require('../models');

beforeAll(async () => {
  connection = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Public Auth API Tests', () => {

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  test('Test user signup', async () => {
    let payload = {
      data: {
        email: 'mike@test.com',
        username: 'mike',
        password: 'testPass123'
      }
    };
    let response = await request(app)
      .post('/auth/signup')
      .send(payload);

    expect(response.statusCode).toBe(201);
    expect(response.body.is_success).toBe(true);
    expect(response.body.data).toHaveProperty('username', payload.data.username);
    expect(response.body.data).toHaveProperty('token');
  });

});

describe('Private Auth API Tests', () => {

  let user;

  beforeEach(async () => {
    user = {
      email: 'steve@test.com',
      username: 'steve',
      password: 'testPass123'
    }
    await db.User.create(user);
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  test('Test user login', async () => {
    let response = await request(app)
      .post('/auth/login')
      .send({
        data: {
          email: user.email,
          password: user.password
        }
      });
  
    expect(response.statusCode).toBe(200);
    expect(response.body.is_success).toBe(true);
    expect(response.body.data).toHaveProperty('username', user.username);
    expect(response.body.data).toHaveProperty('token');
  });

});
