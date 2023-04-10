import supertest from 'supertest';
import { app } from '../server';
import UserModel from '../models/User.model';

export const api = supertest(app);

export const initialUsers = [{
  "username": "jceballos",
  "email": "testInit@gmail.com",
  "password": "prueba1234",
  "passwordConfirm": "prueba1234",
  "role": "admin"
},
{
  "username": "userTest2",
  "email": "test2@gmail.com",
  "password": "prueba1234",
  "passwordConfirm": "prueba1234"
},
{
  "username": "userTest3",
  "email": "test3@gmail.com",
  "password": "prueba1234",
  "passwordConfirm": "prueba1234"
},
{
  "username": "userTestAdmin4",
  "email": "testAdmin4@gmail.com",
  "password": "prueba1234",
  "passwordConfirm": "prueba1234",
  "role": "admin"
}
];


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
  "username": "jceballos",
  "email": "testInit@gmail.com",
  "password": "prueba1234",
  "passwordConfirm": "prueba1234",
  "role": "admin"
};


export const newUserTest = {
  "username": "jceballos2",
  "email": "test@gmail.com",
  "password": "prueba1234",
  "passwordConfirm": "prueba1234"
};

export const userCredentials = {
  "email": "testInit@gmail.com",
  "password": "prueba1234"
};

export const newUserPass = { "password": "test1234" };

export const getUsers = async () => {
  const usersDB = await UserModel.find({});
  return usersDB.map((user: any) => user.toJSON());
};

export const getUserTokens = async (email: any) => {
  const userDB = await UserModel.findOne({ email });
  return userDB!.tokens;
};

export const getUserId = async (email: any) => {
  const userDB = await UserModel.findOne({ email });
  return userDB!._id;
};

export const getResetToken = async (email: any) => {
  const userDB = await UserModel.findOne({ email });
  return userDB!.resetPasswordToken;
};


