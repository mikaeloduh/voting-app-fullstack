const config = require('config');
const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');

const db = require('../models');
const app = require('../app');

const SECRET = config.get('secret');

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
      creator: mongoose.Types.ObjectId(),
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


describe('Private Poll API Tests', () => {

  let user = {
    email: 'steve@test.com',
    username: 'steve',
    password: 'testPass123'
  };
  let anotherUser = {
    email: 'otherUser@test.com',
    username: 'otherUser',
    password: 'otherTestPass456'
  };
  let userDoc;
  let pollDoc;

  beforeEach(async () => {
    userDoc = await db.User.create(user);
    anotherUserDoc = await db.User.create(anotherUser);

    pollDoc = await db.Poll.create({
      creator: userDoc.id,
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
    let response = await request(app)
      .get('/api/polls')
      .set('Authorization', 'Bearer ' + jwt.sign({ id: userDoc.id }, SECRET));

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveLength(1);
  })
  
  test('Testing create a poll', async () => {
    let payload = {
      data: {
        topic: 'What is you favor color?',
        options: [
          { option: 'red', votes: 0 },
          { option: 'green', votes: 0 },
          { option: 'blue', votes: 0 }
        ]
      }
    };
    let response = await request(app)
      .post('/api/polls')
      .set('Authorization', 'Bearer ' + jwt.sign({ id: userDoc.id }, SECRET))
      .send(payload);
    
    expect(response.statusCode).toBe(201);
    expect(response.body.is_success).toBe(true);
    expect(response.body.data).toHaveProperty('topic', payload.data.topic);
  });

  test('Test that an unauthenticated user cannot create a poll', async () => {
    let payload = {
      data: {
        topic: 'What is you favor color?',
        options: [
          { option: 'red', votes: 0 },
          { option: 'green', votes: 0 },
          { option: 'blue', votes: 0 }
        ]
      }
    };
    let response = await request(app)
      .post('/api/polls')
      .send(payload);
    
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toHaveProperty('type', 'authenticate');
  });

  test('Testing delete a poll', async () => {
    let response = await request(app)
      .delete('/api/polls/' + pollDoc.id)
      .set('Authorization', 'Bearer ' + jwt.sign({ id: userDoc.id }, SECRET));

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('is_success', true);
    expect(response.body).toHaveProperty('message', `Poll ${pollDoc.id} removed!`);
  });

  test('Test that unauthorized user delete a poll should fail', async () => {
    let response = await request(app)
      .delete('/api/polls/' + pollDoc.id)
      .set('Authorization', 'Bearer ' + jwt.sign({ id: anotherUserDoc.id }, SECRET));

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toHaveProperty('type', 'authorize');
  });

  test('Testing vote for a poll', async () => {
    let response = await request(app)
      .put('/api/polls/' + pollDoc.id)
      .set('Authorization', 'Bearer ' + jwt.sign({ id: userDoc.id }, SECRET))
      .send({ data: { option_id: pollDoc.options[0].id } });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.options[0].votes).toBe(1);
  });

  test('Test that voting for a non-exited poll should receive bad request', async () => {
    let response = await request(app)
      .put('/api/polls/' + 'nonExitedPollId')
      .set('Authorization', 'Bearer ' + jwt.sign({ id: userDoc.id }, SECRET))
      .send({ data: { option_id: 'nonExitedOptionsId' } });

    expect(response.statusCode).toBe(500);
  });
});
