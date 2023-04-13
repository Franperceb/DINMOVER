import { mongoose } from '@typegoose/typegoose';
import { omit } from 'lodash';
import propertyModel from '../../models/Property.model';
import { server } from '../../server';
import {
  api,
  userCredentials,
  initialProperties,
  getUserTokens,
  newProperty,
  getUserIDFromProperty,
  getUserId,
} from '../helpers';
import dotenv from 'dotenv';
import { disconnectRedis } from '../../utils/redis';
dotenv.config();

//TODO: Add update, delete .. check if its valid or not on both and when is added.
describe('Properties', () => {
  beforeEach(async () => {
    await api.post('/api/auth/sign-in').send(userCredentials);

    await propertyModel.deleteMany({});

    for (const property of initialProperties) {
      const propertyObject = new propertyModel(property);
      await propertyObject.save();
    }
  });

  test('are delivered correctly', async () => {
    const userTokens = await getUserTokens(userCredentials.email);

    const result = await api
      .get('/api/properties')
      .set('Authorization', 'Bearer ' + userTokens[0].token)
      .expect(201)
      .expect('Content-type', /application\/json/);

    expect(result.body.data).toHaveLength(initialProperties.length);
  });

  test('added successfully w/ user id of the logged user', async () => {
    const userTokens = await getUserTokens(userCredentials.email);
    const user_id_user = await getUserId(userCredentials.email);

    await api
      .post('/api/properties')
      .set('Authorization', 'Bearer ' + userTokens[0].token)
      .send(newProperty)
      .expect(201);

    const resultProperties = await api
      .get('/api/properties')
      .set('Authorization', 'Bearer ' + userTokens[0].token)

    const { title, location, property_type } = newProperty;
    const user_id = await getUserIDFromProperty(title, location, property_type);


    expect(resultProperties.body.data).toHaveLength(initialProperties.length + 1);
    expect(user_id).toEqual(user_id_user);
  });

  test('are not duplicated', async () => {
    const userTokens = await getUserTokens(userCredentials.email);
    newProperty.title = 'Casa Real 1'

    await api
      .post('/api/properties')
      .set('Authorization', 'Bearer ' + userTokens[0].token)
      .send(newProperty)
      .expect(409)

    const resultProperties = await api
      .get('/api/properties')
      .set('Authorization', 'Bearer ' + userTokens[0].token)
    expect(resultProperties.body.data).toHaveLength(initialProperties.length);
  });


  test('are not added without missing fields', async () => {
    const userTokens = await getUserTokens(userCredentials.email);

    const newPropertyWithSomeKeys = Object.fromEntries(
      Object.entries(newProperty).map(([k, v]: any) => [k, v.title]));


    await api
      .post('/api/properties')
      .set('Authorization', 'Bearer ' + userTokens[0].token)
      .send(newPropertyWithSomeKeys)
      .expect(400);

  });

  test('(single) are updated correctly', async () => {
    const userTokens = await getUserTokens(userCredentials.email);

    const resultProperties = await api
      .get('/api/properties')
      .set('Authorization', 'Bearer ' + userTokens[0].token)


    const propertyToUpdate = resultProperties.body.data[0];

    propertyToUpdate.title = 'actualizando prueba';
    propertyToUpdate.location = 'Oaxaca';
    propertyToUpdate.property_type = 'departamento';

    await api
      .put(`/api/properties/${propertyToUpdate._id}`)
      .set('Authorization', 'Bearer ' + userTokens[0].token)
      .send(propertyToUpdate)
      .expect(200);


    const propertiesAfterUpdate = await api
      .get('/api/properties')
      .set('Authorization', 'Bearer ' + userTokens[0].token)

    const propertyUpdated = propertiesAfterUpdate.body.data[0];
    const excludedFields = ['updatedAt', 'user_id'];

    expect(omit(propertyToUpdate, excludedFields)).toEqual(omit(propertyUpdated, excludedFields));
  });

  test('(single) is deleted correctly ', async () => {
    const userTokens = await getUserTokens(userCredentials.email);

    const resultProperties = await api
      .get('/api/properties')
      .set('Authorization', 'Bearer ' + userTokens[0].token)

    const propertyToDelete = resultProperties.body.data[0];

    await api
      .delete(`/api/properties/${propertyToDelete._id}`)
      .set('Authorization', 'Bearer ' + userTokens[0].token)
      .expect(200);


    const propertiesAfterDelete = await api
      .get('/api/properties')
      .set('Authorization', 'Bearer ' + userTokens[0].token)

    expect(propertiesAfterDelete.body.data).toHaveLength(initialProperties.length - 1);
  });
});
afterAll(async () => {
  await mongoose.connection.close();
  await disconnectRedis();
  server.close();
});
