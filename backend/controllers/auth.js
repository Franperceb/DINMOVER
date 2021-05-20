exports.signUp = (req, res, next) => {
  res.send('sign up!');
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
