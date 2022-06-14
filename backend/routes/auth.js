import { Router } from 'express';
import {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  logout,
} from '../controllers/auth.js';
const router = Router();

router.route('/signUp').post(signUp);

router.route('/signIn').post(signIn);

router.route('/forgotPassword').post(forgotPassword);

router.route('/logout').get(logout);

router.route('/resetPassword/:resetToken').put(resetPassword);

export default router;
