import { Router } from 'express';
import { loginHandler, registerHandler, forgotPasswordHandler, signOut, resetPassword } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';

const router = Router();

// Register user route
router.post('/sign-up', validate(createUserSchema), registerHandler);  //done

// Login user route
router.post('/sign-in', validate(loginUserSchema), loginHandler); //done 

//forgot password  user route
router.post('/forgot-password', forgotPasswordHandler); //done --when using configure app passwrd on .env created on your google account

//sign out user route
router.post('/sign-out', signOut);//done

//reset password user route
router.put('/reset-password/:resetToken', resetPassword);//done.. verify if send or not a new token as response

export default router;


