const express = require('express');
const router = express.Router();

const {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth');

router.route('/signUp').post(signUp);

router.route('signIn').post(signIn);

router.route('forgotPassword').post(forgotPassword);

router.route('/resetPassword/:resetToken').put(resetPassword);

module.exports = router;
