import { omit } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';
import config from 'config';
import userModel, { JwtToken, User } from '../models/User.model';
import { excludedFields } from '../controllers/auth.controller';
import { signJwt } from '../utils/jwt';
import redisClient from '../utils/redis';
import { DocumentType } from '@typegoose/typegoose';

// CreateUser service
export const createUser = async (input: Partial<User>) => {
  const user = await userModel.create(input);
  return omit(user.toJSON(), excludedFields);
};

// Find User by Id
export const findUserById = async (id: any) => {
  const user = await userModel.findById(id).lean();
  return omit(user, excludedFields);
};

export const updateUser = async (id: any, options: QueryOptions = {}) => {
  const user = await userModel.findByIdAndUpdate(id, options)
  return omit(user, excludedFields);
};

// Find All users
export const findAllUsers = async () => {
  return await userModel.find();
};

// Find one user by any fields
export const findUser = async (
  query: FilterQuery<User>,
  options: QueryOptions = {}
) => {
  return await userModel.findOne(query, {}, options).select('+password');
};

// Sign Token
export const signToken = async (user: DocumentType<User>) => {
  // Sign the access token
  const access_token = signJwt(
    { sub: user._id },
    {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    }
  );

  // Create a Session
  redisClient.set(user.id, JSON.stringify(user), {
    EX: 60 * 60,
  });

  // Return access token
  return { access_token };
};
//
export const addJwtToken = async (id: string,
  oldTokens: [type: JwtToken], newToken: JwtToken) => {
  await userModel.findByIdAndUpdate(id, {
    tokens: [...oldTokens, newToken],
  });
}
