const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
  } catch (error) {
    next(error);
  }
};

exports.signIn = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorResponse('Provide an email and password', 400));

  try {
    const user = User.findOne({ email }).select('+password');

    if (!user) return next(new ErrorResponse('User doesn´t exist', 400));

    //validate password matching. Use the bcrypt imported on model.
    const isMatch = await user.matchPassword(password);

    if (!isMatch) return next(new ErrorResponse('invalid password or email'));
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = (req, res, next) => {
  res.send('forgoted password');
};
exports.resetPassword = (req, res, next) => {
  res.send('reset pass');
};
