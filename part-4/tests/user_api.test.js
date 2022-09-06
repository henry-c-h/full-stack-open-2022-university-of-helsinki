const app = require('../app');
const supertest = require('supertest');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');

const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('root', 10);
    const user = new User({
      username: 'root',
      name: 'root',
      passwordHash,
    });
    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDB();
    const newUser = {
      username: 'harold',
      name: 'harold',
      password: 'harold',
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-type', /application\/json/);

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: 'root',
      name: 'root',
      password: 'root',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username must be unique');

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: 'ro',
      password: 'root',
    };

    const result = await api.post('/api/users').send(newUser).expect(400);
    expect(result.body.error).toContain('User validation failed');

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with proper statuscode and message if username is missing', async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      password: 'root',
    };

    const result = await api.post('/api/users').send(newUser).expect(400);
    expect(result.body.error).toContain('User validation failed');

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('login succeeds with correct credentials, and user details and token are returned', async () => {
    const user = await User.findOne({ username: 'root' });
    const credentials = { username: 'root', password: 'root' };

    const result = await api.post('/api/login').send(credentials).expect(200);

    expect(result.body.token).toBeDefined();
    expect(result.body.username).toBe(user.username);
    expect(result.body.name).toBe(user.name);
  });
});
