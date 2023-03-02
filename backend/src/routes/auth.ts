import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  signOut,
} from '../controllers/auth.js';

const router = Router();

router.route('/signUp').post(signUp);

router.route('/signIn').post(signIn);

router.route('/forgotPassword').post(forgotPassword);

router.route('/signOut').post(protect, signOut);

router.route('/resetPassword/:resetToken').put(resetPassword);

export default router;
