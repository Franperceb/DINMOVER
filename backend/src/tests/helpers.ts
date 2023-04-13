import supertest from 'supertest';
import { app } from '../server';
import UserModel from '../models/User.model';
import propertyModel from '../models/Property.model';

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
    property_type: 'casa',
    operation_type: 'venta',
    address: 'Quinta Cadiz',
    description: 'Casa bonita cerca del mar',
    rooms: 3,
    baths: 3,
    price: 1000000,
    m2: 190,
  },
  {
    title: 'Departamento Real 2',
    location: 'Veracruz',
    property_type: 'departamento',
    operation_type: 'rent',
    address: 'Torre Real',
    description: 'Departamento bonito con vista al mar',
    rooms: 2,
    baths: 2,
    price: 2500000,
    m2: 110,
  },
  {
    title: 'Terreno Real 2',
    location: 'CDMX',
    property_type: 'terreno',
    operation_type: 'venta',
    address: ' ',
    rooms: 1,
    baths: 2,
    description: 'terreno a lado de la condesa',
    price: 5000000,
    m2: 210,
  },
];

export const newProperty = {
  title: 'Casa Real 2',
  location: 'Monterrey',
  property_type: 'casa',
  operation_type: 'venta',
  address: 'Quinta Cadiz',
  description: 'Casa bonita cerca del mar',
  rooms: 3,
  baths: 3,
  price: 1000000,
  m2: 190,
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

export const getUserIDFromProperty = async (title: any, location: any, property_type: any) => {
  const property = await propertyModel.findOne({ title, location, property_type });
  return property!.user_id;
};

