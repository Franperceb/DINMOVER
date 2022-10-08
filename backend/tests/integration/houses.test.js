import supertest from 'supertest';
import { app, server } from '../../server.js';
import mongoose from 'mongoose';

const api = supertest(app);

test('notes are returning json', async () => {
  await api
    .get('/api/houses')
    .expect(401)
    .expect('Content-type', /application\/json/);
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});
