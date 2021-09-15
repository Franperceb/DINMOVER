import { Router } from 'express';
const router = Router();
const { getPrivateRoute } = require('../controllers/private');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getPrivateRoute);

module.exports = router;
