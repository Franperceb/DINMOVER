import { Router } from 'express';
import { getPrivateRoute } from '../controllers/private.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.route('/').get(protect, getPrivateRoute);

export default router;
