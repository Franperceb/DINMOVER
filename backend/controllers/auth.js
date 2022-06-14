import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    console.log(user);
    console.log(res);
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorResponse('Provide an email and password', 400));

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) return next(new ErrorResponse('User doesn´t exist', 400));

    //validate password matching. Use the bcrypt imported on model.
    const isMatch = await user.matchPassword(password);

    if (!isMatch) return next(new ErrorResponse('invalid password or email'));

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
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

      return next(new ErrorResponse('Email not sent server error'), 500);
    }
  } catch {
    next(new ErrorResponse('Server Error', 500));
  }
};
export const resetPassword = async (req, res, next) => {
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

export const logout = (req, res, next) => {
  res.clearCookie('headload');
  res.clearCookie('signature');
  res.status(200).json({ msg: 'Sucessful logout' });
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  console.log(token);
  res.status(statusCode).json({ success: true, token });
};
