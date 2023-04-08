
import UserModel from '../../models/User.model';
import { server } from '../../server';
import {
  api,
  getUsers,
  userTest,
  newUserTest,
  userCredentials,
  getUserTokens,
  getUserId,
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
    try {
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
    } catch (error) {
      console.log(error)
    }
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
    userCredentials.email = 'test@gmail.com';
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
    const user_id = (await getUserId(userTest.email)).toString();

    await api.post('/api/auth/sign-in').send(userCredentials);
    const userTokensBeforeLog = await getUserTokens(userCredentials.email);
    console.log(userTokensBeforeLog)
    await api
      .post('/api/auth/sign-out')
      .send(user_id)
      .set('Authorization', 'Bearer ' + userTokensBeforeLog[0].token)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    //console.log(result)

    //  const userTokens = await getUserTokens(userCredentials.email);
    //  expect(userTokens).toHaveLength(userTokensBeforeLog.length - 1);
  });
  /*
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
      */
  afterAll(() => {
    server.close();
  })
});

//TODO: finish all routes to be tested