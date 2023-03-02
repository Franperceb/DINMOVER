import { omit } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';
import config from 'config';
import userModel, { User } from '../models/User.model';
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
export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean();
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
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`
    }
  );

  // Create a Session
  redisClient.set(`user:id:${user.username}`, JSON.stringify(user), {
    EX: 60 * 60,
  });

  // Return access token
  return { access_token };
};



/*
import User from '../models/User';
import ErrorResponse from '../utils/errorResponse';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail';

export const signUp = async (req: any, res: any, next: any) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return next(new ErrorResponse('Existing user with email written', 500));

    const user = await User.create({
      username,
      email,
      password,
    });

    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req: any, res: any, next: any) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorResponse('Provide an email and password', 400));

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) return next(new ErrorResponse('User doesn´t exist', 400));

    //validate password matching. Use the bcrypt imported on model.
    const isMatch = await user.matchPassword(password);

    if (!isMatch) return next(new ErrorResponse('Invalid password or email', 401));

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req: any, res: any, next: any) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return next(new ErrorResponse('Email not sent', 404));

    const resetToken = user.getResetPasswordToken();
    user.save();

    const resetUrl = `${process.env.FRONT_URL}/${resetToken}`;

    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
    console.log('wtf');
    try {
      console.log('entrando a try');
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        text: message,
      });

      res.status(200).json({ success: true, data: 'Email Sent' });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse('Email not sent server error', 500));
    }
  } catch {
    next(new ErrorResponse('Server Error', 500));
  }
};
export const resetPassword = async (req: any, res: any, next: any) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return next(new ErrorResponse('Invalid reset token', 400));

    (user.password = req.body.password), (user.resetPasswordToken = undefined);
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(201).json({
      success: true,
      data: 'Password Updated Success',
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};

export const signOut = async (req: any, res: any) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Auth failed' });
    }
    const tokens = req.user.tokens;

    const newTokens = tokens.filter((t: any) => t.token !== token);
    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.status(200).json({ msg: 'Sucessful signOut' });
  }
};

const sendToken = (user: any, statusCode: any, res: any) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ success: true, token });
};
*/