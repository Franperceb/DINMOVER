
import UserModel from '../../models/User.model';
import { mongoose } from '@typegoose/typegoose';
import { disconnectRedis } from '../../utils/redis';
import { server } from '../../server';
import {
  api,
  getUsers,
  userTest,
  newUserTest,
  userCredentials,
  getUserTokens,
  getUserId,
  newUserPass,
  getResetToken,
} from '../helpers';
import dotenv from 'dotenv';
dotenv.config();


describe('User', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({});
    const user = new UserModel(userTest);
    await user.save();
  });

  test('is created successfully', async () => {
    const usersAtStart = await getUsers();
    await api
      .post('/api/auth/sign-up')
      .send(newUserTest)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const usersAtEnd = await getUsers();

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const emails = usersAtEnd.map((u: any) => u.email);
    expect(emails).toContain(newUserTest.email);
  });

  test('creation fails with proper status and message if email is already taken', async () => {
    const usersAtStart = await getUsers();

    const result = await api
      .post('/api/auth/sign-up')
      .send(userTest)
      .expect(409)
      .expect('Content-Type', /application\/json/);


    expect(result.text).toContain('Email already used');

    const usersAtEnd = await getUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('is logged succesfully', async () => {
    const result = await api
      .post('/api/auth/sign-in')
      .send(userCredentials)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const userToken = result.body.token;
    expect(userToken).not.toBe(null);
  });

  test('failed to log when put bad credentials', async () => {
    userCredentials.email = 'giovanni2@gmail.com';

    const result = await api
      .post('/api/auth/sign-in')
      .send(userCredentials)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(result.text).toContain('Invalid email or password');
  });

  test('is logged successfully on multiple devices', async () => {
    userCredentials.email = 'testInit@gmail.com';
    const userTokensBeforeLog = await getUserTokens(userCredentials.email);
    await api
      .post('/api/auth/sign-in')
      .send(userCredentials)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const userTokens = await getUserTokens(userTest.email);
    expect(userTokens).toHaveLength(userTokensBeforeLog.length + 1);
  });

  test('is logged out successfully', async () => {
    const user_id = (await getUserId(userCredentials.email));
    await api.post('/api/auth/sign-in').send(userCredentials);
    const userTokensBeforeLogOut = await getUserTokens(userCredentials.email);
    await api
      .post('/api/auth/sign-out')
      .send({ user_id })
      .set('Authorization', 'Bearer ' + userTokensBeforeLogOut[0].token)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const userTokens = await getUserTokens(userCredentials.email);
    expect(userTokens).toHaveLength(userTokensBeforeLogOut.length - 1);
  });

  test('failed to sign out. No session found', async () => {
    const result = await api
      .post('/api/auth/sign-out')
      .set('Authorization', 'Bearer 123452')
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(result.text).toContain(
      'User not logged'
    );
  });

  test('forgot password and email is sent to generate a new one', async () => {
    const result = await api.post('/api/auth/forgot-password')
      .send(userCredentials)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const resetPasswordToken = await getResetToken(userCredentials.email);
    expect(resetPasswordToken).not.toBe(null);
    expect(result.text).toContain('Email Sent');
  });

  test('email is not sent when user does not exist', async () => {

    const result = await api.post('/api/auth/forgot-password')
      .send(newUserTest.email)
      .expect(404)
      .expect('Content-Type', /application\/json/);

    expect(result.body.message).toContain('Email not sent');
  });

  test('reset password is successful', async () => {

    await api.post('/api/auth/forgot-password').send(userCredentials);

    const resetPasswordToken = await getResetToken(userCredentials.email);

    const result = await api.put(`/api/auth/reset-password/${resetPasswordToken}`)
      .send(newUserPass)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(result.body.data).toContain('Password Updated Success');
  });

  test('reset password failed, no user with reset token password', async () => {

    const resetPasswordToken = await getResetToken(userCredentials.email);

    const result = await api.put(`/api/auth/reset-password/${resetPasswordToken}`)
      .send(newUserPass)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.message).toContain('Invalid reset token');
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await disconnectRedis();
    server.close();
  })
});

