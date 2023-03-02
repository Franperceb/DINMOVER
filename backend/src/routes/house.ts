import { Router } from 'express';
import { protect } from '../middleware/auth.js';

import {
  getHouses,
  getHouseById,
  createHouse,
  updateHouseById,
  deleteHouseById,
} from '../controllers/house.js';

const router = Router();

router.route('/').get(protect, getHouses);
router.route('/:houseId').get(protect, getHouseById);
router.route('/').post(protect, createHouse);
router.route('/:houseId').put(protect, updateHouseById);
router.route('/houseId').delete(protect, deleteHouseById);

export default router;
