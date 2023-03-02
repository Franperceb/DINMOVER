import supertest from 'supertest';
import { app } from '../server.js';
import User from '../models/User.model.js';

export const api = supertest(app);

export const initialProperties = [
  {
    title: 'Casa Real 1',
    location: 'Monterrey',
    type: 'casa',
    operationType: 'venta',
    adress: 'Quinta Cadiz',
    description: 'Casa bonita cerca del mar',
    rooms: 3,
    baths: 3,
    price: 1000000,
    m2: 190,
  },
  {
    title: 'Departamento Real 2',
    location: 'Veracruz',
    type: 'departamento',
    operationType: 'rent',
    adress: 'Torre Real',
    description: 'Departamento bonito con vista al mar',
    rooms: 2,
    baths: 2,
    price: 2500000,
    m2: 110,
  },
  {
    title: 'Terreno Real 2',
    location: 'CDMX',
    type: 'terreno',
    operationType: 'venta',
    adress: ' ',
    description: 'terreno a lado de la condesa',
    price: 5000000,
    m2: 210,
  },
];

export const newProperty = {
  title: 'Casa Real 1',
  location: 'Monterrey',
  type: 'casa',
  operationType: 'venta',
  adress: 'Quinta Cadiz',
  description: 'Casa bonita cerca del mar',
  rooms: 3,
  baths: 3,
  price: 1000000,
  m2: 190,
};

export const getAllProperties = async () => {
  const response = await api.get('/api/houses');
  //validar que tenga  la longitud igual
  //  return response.body.map(p. =>)
  return response;
};

export const userTest = {
  username: 'jceballos',
  email: 'giorgio19@gmail.com',
  password: 'prueba',
};

export const newUserTest = {
  username: 'jceballos5',
  email: 'giorgio21@gmail.com',
  password: 'prueba2',
};

export const getUsers = async () => {
  const usersDB = await User.find({});
  return usersDB.map((user: any) => user.toJSON());
};

export const getUserTokens = async (email: any) => {
  const userDB = await User.findOne({ email });
  return userDB.tokens;
};
