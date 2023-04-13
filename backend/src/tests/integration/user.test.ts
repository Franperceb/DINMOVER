import UserModel from '../../models/User.model';
import { mongoose } from '@typegoose/typegoose';
import { server } from '../../server';
import {
  api,
  userCredentials,
  getUserTokens,
  initialUsers,
  getUserId,
} from '../helpers';
import dotenv from 'dotenv';
import { disconnectRedis } from '../../utils/redis';
dotenv.config();



describe('Users', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({});

    for (const user of initialUsers) {
      const userObject = new UserModel(user);
      await userObject.save();
    }
    await api.post('/api/auth/sign-in').send(userCredentials);
  });

  test('delivers a collection', async () => {
    const userTokens = await getUserTokens(userCredentials.email);

    const result = await api
      .get('/api/users/')
      .set('Authorization', 'Bearer ' + userTokens[0].token)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(result.body.data.users).toHaveLength(initialUsers.length);

  });

  test('get correctly the logged user info', async () => {
    const userTokens = await getUserTokens(userCredentials.email);

    const user_id = await getUserId(userCredentials.email);
    const expected = decodeURI(encodeURI(user_id))

    const result = await api
      .get('/api/users/user-info')
      .set('Authorization', 'Bearer ' + userTokens[0].token)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(result.body).not.toBe(null);
    expect(result.body.data.user._id).toEqual(expected);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await disconnectRedis();
    server.close();
  })
});

