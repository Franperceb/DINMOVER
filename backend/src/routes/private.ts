import { Router } from 'express';
import { getPrivateRoute } from '../controllers/private.js';
//import { protect } from '../middleware/auth.ts';

const router = Router();

//router.route('/').get(protect, getPrivateRoute);

export default router;
