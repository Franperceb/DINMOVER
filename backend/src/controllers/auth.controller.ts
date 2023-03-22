
import { CookieOptions, NextFunction, Request, Response } from 'express';
import { CreateUserInput, LoginUserInput } from '../schemas/user.schema';
import { createUser, findUser, signToken } from '../services/user.service';
import ErrorResponse from '../utils/errorResponse';
import sendEmail from '../utils/sendEmail';
import crypto from 'crypto';
import config from 'config';


// Exclude this fields from the response
export const excludedFields = ['password'];

// Creating  token cookie.
const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

// Only set secure to true in production
if (process.env.NODE_ENV === 'production')
  accessTokenCookieOptions.secure = true;

//Registering new User 
export const registerHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  const { password, username, email } = req.body;
  console.log('entro a ')

  try {
    const user = await createUser({
      email,
      username,
      password,
    });
    //verify what to send 
    res.status(201).json({
      status: 'success',
      data: {
        user
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email already exist',
      });
    }
    return next(err);
  }
};

//Login user 
export const loginHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    // Get the user from the collection
    const user = await findUser({ email });

    // Check if user exist and password is correct
    if (
      !user ||
      !(await user.comparePasswords(user.password, req.body.password)) //no funciona
    ) {
      return next(new ErrorResponse('Invalid email or password', 401));
    }

    // Create an Access Token and adding to the list of the user's token
    const { access_token } = await signToken(user);

    user.addJwtTokens(access_token);


    // Send Access Token in Cookie
    res.cookie('accessToken', access_token, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // Send Access Token
    res.status(200).json({
      status: 'success',
      access_token,
    });
  } catch (err: any) {
    next(err);
  }

}

//Password user forgotten
export const forgotPasswordHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction) => {
  const { email } = req.body;

  try {
    const user = await findUser({ email });

    if (!user) return next(new ErrorResponse('Email not sent', 404));

    const resetToken = user.getResetPasswordToken();

    user.save();

    const resetUrl = `${process.env.FRONT_URL}/${resetToken}`;

    const message = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `;

    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        text: message,
      });

      res.status(200).json({ success: true, data: 'Email Sent' });
    } catch (err) {
      user.resetPasswordToken = '';
      user.resetPasswordExpire = 0;

      await user.save();

      return next(new ErrorResponse('Email not sent server error', 500));
    }
  } catch {
    next(new ErrorResponse('Server Error', 500));
  }
};


//reset user's password 
export const resetPassword = async (req: any,
  res: Response,
  next: NextFunction) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  try {
    const user = await findUser({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return next(new ErrorResponse('Invalid reset token', 400));

    (user.password = req.body.password), (user.resetPasswordToken = '');
    user.resetPasswordExpire = 0;
    await user.save();

    res.status(201).json({
      success: true,
      data: 'Password Updated Success',
      token: await signToken(user),
    });
  } catch (err) {
    next(err);
  }
};

//signing out user
export const signOut = async (req: any,
  res: Response,
  next: NextFunction) => {
  try {
    if (req.headers && req.headers.authorization) {
      const { user_id } = req.body;
      const user = await findUser({ user_id });

      const token = req.headers.authorization.split(' ')[1];

      if (!token) {
        return res.status(401).json({ success: false, message: 'Auth failed' });
      }
      const tokens = req.user.tokens;

      const newTokens = tokens.filter((t: any) => t.token !== token);

      await findUser(user_id)

      user!.update(req.user._id, { tokens: newTokens });

      res.status(200).json({ msg: 'Sucessful signOut' });
    }
  } catch (err) {
    return next(err)
  }
};

