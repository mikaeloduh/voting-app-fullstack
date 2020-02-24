const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const db = require('../models');
const app = require('../app');

beforeAll(async () => {
  connection = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Public Poll API Tests', () => {

  let pollDoc;

  beforeEach(async () => {
    pollDoc = await db.Poll.create({
      creater: mongoose.Types.ObjectId(),
      topic: 'How would you like your steak?',
      options: [
        { option: 'rare', votes: 0 },
        { option: 'medium', votes: 0 },
        { option: 'well-done', votes: 0 }
      ]
    });
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });
  
  test('Testing retrieve all polls', async () => {
    let response = await request(app).get('/api/polls');
    
    expect(response.statusCode).toBe(200);
    expect(response.body.is_success).toBe(true);
    expect(response.body.data).toHaveLength(1);
  });

});


describe('Privaet Poll API Tests', () => {

  let user;
  let userDoc;
  let pollDoc;

  beforeEach(async () => {
    user = {
      email: 'steve@test.com',
      username: 'steve',
      password: 'testpass123'
    }
    userDoc = await db.User.create(user);

    pollDoc = await db.Poll.create({
      creater: userDoc.id,
      topic: 'How would you like your steak?',
      options: [
        { option: 'rare', votes: 0 },
        { option: 'medium', votes: 0 },
        { option: 'well-done', votes: 0 }
      ]
    });
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  test('Tesing retrieve all polls', async () => {
    let response = await request(app).get('/api/polls');

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveLength(1);
  })
  
  test('Testing create a poll', async () => {
    let payload = {
      data: {
        topic: 'Whhat is you favor color?',
        options: [
          { option: 'red', votes: 0 },
          { option: 'green', votes: 0 },
          { option: 'blue', votes: 0 }
        ]
      }
    };
    let response = await request(app)
      .post('/api/polls')
      .set('Authorization', 'Bearer ' + jwt.sign({ id: userDoc.id }, process.env.SECRET))
      .send(payload);
    
    expect(response.statusCode).toBe(201);
    expect(response.body.is_success).toBe(true);
    expect(response.body.data).toHaveProperty('topic', payload.data.topic);
  });

  test('Testing delete a poll', async () => {
    let response = await request(app)
      .delete('/api/polls/' + pollDoc.id)
      .set('Authorization', 'Bearer ' + jwt.sign({ id: userDoc.id }, process.env.SECRET));

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('is_success', true);
    expect(response.body).toHaveProperty('message', `Poll ${pollDoc.id} removed!`);
  });

  test('Testing vote for a poll', async () => {
    let response = await request(app)
      .put('/api/polls/' + pollDoc.id)
      .set('Authorization', 'Bearer ' + jwt.sign({ id: userDoc.id }, process.env.SECRET))
      .send({ data: { option_id: pollDoc.options[0].id } });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.options[0].votes).toBe(1);
  })

});
