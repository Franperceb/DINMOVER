import { Router } from 'express';
import {
  getHouses,
  getHouseById,
  createHouse,
  updateHouseById,
  deleteHouseById,
} from '../controllers/house.js';

const router = Router();

router.route('/').get(getHouses);
router.route('/:houseId').get(getHouseById);
router.route('/').post(createHouse);
router.route('/:houseId').put(updateHouseById);
router.route('/houseId').delete(deleteHouseById);

export default router;
