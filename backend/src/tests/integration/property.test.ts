/*
import { server } from '../../server.js';
import mongoose from 'mongoose';
import House from '../../models/House.js';

import {
  api,
  getAllProperties,
  newProperty,
  initialProperties,
} from '../helpers.js';

describe('Properties', () => {
  beforeEach(async () => {
    await House.deleteMany({});

    for (const property of initialProperties) {
      const propertyObject = new House(property);
      await propertyObject.save();
    }
  });

  test('are returning json', async () => {
    await api
      .get('/api/houses')
      .set('Authorization', process.env.SESSION_TEST)
      .expect(201)
      .expect('Content-type', /application\/json/);
  });

  test('response with the collection', async () => {
    const response = await api
      .get('/api/houses')
      .set('Authorization', process.env.SESSION_TEST);
    expect(response.body.data).toHaveLength(initialProperties.length);
  });

  test('add a valid new property', async () => {
    await api
      .post('/api/houses')
      .set('Authorization', process.env.SESSION_TEST)
      .send(newProperty)
      .expect(200);

    //validar que tenga algo en especifico, checar modelo
    const { contents, response } = await getAllProperties();
    expect(response.body).toHaveLength(initialHouses + 1);
    expect(contents).toContain(newNote.content);
  });

  test('are not added without name,location and type', async () => {
    await api
      .post('/api/houses')
      .set('Authorization', process.env.SESSION_TEST)
      .send(newProperty)
      .expect(400);

    const { contents, response } = await getAllProperties();
    expect(response.body).toHaveLength(initialHouses);
  });

  test('(single) are updated correctly', async () => {
    const properties = await getAllProperties();
    const propertyToUpdate = properties[0];

    propertyToUpdate.title = 'actualizando prueba';
    propertyToUpdate.location = 'Oaxaca';
    propertyToUpdate.type = 'departamento';

    await api
      .put(`/api/houses/${propertyToUpdate.id}`)
      .set('Authorization', process.env.SESSION_TEST)
      .send(propertyToUpdate)
      .expect(200);
  });

  test('(single) is deleted correctly ', async () => {
    const properties = await getAllProperties();
    const propertyToUpdate = properties[0];

    await api
      .delete(`/api/houses/${propertyToDelete.id}`)
      .set('Authorization', process.env.SESSION_TEST)
      .expect(200);
    const { response } = await getAllProperties();
    expect(response.body).toHaveLength(initialNotes.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});
*/