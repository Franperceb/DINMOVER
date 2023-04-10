import { Router } from 'express';
import {
  getAllUsersHandler,
  getUserHandler,
} from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictAccess } from '../middleware/restrictAccess';

const router = Router();
router.use(deserializeUser, requireUser);

// Admin Get Users route
router.get('/', restrictAccess('admin'), getAllUsersHandler);

// Get user info route
router.get('/user-info', getUserHandler);

export default router;

