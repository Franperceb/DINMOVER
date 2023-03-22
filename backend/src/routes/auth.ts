import { Router } from 'express';
import { loginHandler, registerHandler } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';

const router = Router();

// Register user route
router.post('/sign-up', validate(createUserSchema), registerHandler);

// Login user route
router.post('/sign-in', validate(loginUserSchema), loginHandler);

//forgot password  user route
router.post('/forgot-password', loginHandler);

//sign out user route
router.post('/sign-out', loginHandler);

//reset password user route
router.put('/reset-password/:reset-token', loginHandler);

export default router;


/*
const router = Router();

router.route('/signUp').post(signUp);

router.route('/signIn').post(signIn);

router.route('/forgotPassword').post(forgotPassword);

router.route('/signOut').post(protect, signOut);

router.route('/resetPassword/:resetToken').put(resetPassword);

export default router;

*/