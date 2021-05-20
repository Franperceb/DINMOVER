const User = require('../models/User');
exports.signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
  } catch (error) {
    next(err);
  }
};
exports.signIn = (req, res, next) => {
  res.send('signin');
};

exports.forgotPassword = (req, res, next) => {
  res.send('forgoted password');
};
exports.resetPassword = (req, res, next) => {
  res.send('reset pass');
};
