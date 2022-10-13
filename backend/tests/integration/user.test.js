import User from '../../models/User.js';
import {
  api,
  getUsers,
  userTest,
  newUserTest,
  getUserTokens,
} from '../helpers.js';
import mongoose from 'mongoose';
import { server } from '../../server.js';

describe('User', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const user = new User(userTest);
    await user.save();
  });

  test('is created successfully', async () => {
    const usersAtStart = await getUsers();
    await api
      .post('/api/auth/signUp')
      .send(newUserTest)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await getUsers();

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUserTest.username);
  });

  test('creation fails with proper status and message if email is already taken', async () => {
    const usersAtStart = await getUsers();

    const result = await api
      .post('/api/auth/signUp')
      .send(userTest)
      .expect(500)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Existing user with email written');

    const usersAtEnd = await getUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('is logged succesfully', async () => {
    const result = await api
      .post('/api/auth/signIn')
      .send(userTest)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const userToken = result.body.token;
    expect(userToken).not.toBe(null);
  });

  test('failed to log when put bad credentials', async () => {
    userTest.email = 'giovanni2@gmail.com';

    const result = await api
      .post('/api/auth/signIn')
      .send(userTest)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('User doesn´t exist');
  });

  test('is logged successfully on multiple devices', async () => {
    const userTokensBeforeLog = await getUserTokens(userTest.email);

    const result = await api
      .post('/api/auth/signIn')
      .send(userTest)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const userTokens = await getUserTokens(userTest.email);
    expect(userTokens).toHaveLength(userTokensBeforeLog.length + 1);
  });

  test('is logged out successfully', async () => {
    await api.post('/api/auth/signIn').send(userTest);

    const userTokensBeforeLog = await getUserTokens(userTest.email);
    const userToken = userTokensBeforeLog[0].token;

    const result = await api
      .post('/api/auth/signOut')
      .set('Authorization', 'Bearer ' + userToken)
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const userTokens = await getUserTokens(userTest.email);
    expect(userTokens).toHaveLength(userTokensBeforeLog.length - 1);
  });

  test('failed to sign out. No session found', async () => {
    const result = await api
      .post('/api/auth/signOut')
      .set('Authorization', 'Bearer 123452')
      .set('Content-Type', 'application/json')
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      'Not authorized to access this router!'
    );
  });
  /*
  test('reset password works', async () => {
    await api.post('/api/auth/signIn').send(userTest);

    console.log(userToken);
  });
  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });*/
});
