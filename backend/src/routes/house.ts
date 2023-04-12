import { Router } from 'express';
import {
  getHouses,
  getHouseById,
  createHouse,
  updateHouseById,
  deleteHouseById,
} from '../controllers/house.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictAccess } from '../middleware/restrictAccess';
import { createUserSchema } from '../schemas/user.schema';
import { validate } from '../middleware/validate';

//TODO: Create House validations 
const router = Router();
router.use(deserializeUser, requireUser);

router.get('/', restrictAccess('admin'), getHouses);
router.get('/:houseId', restrictAccess('admin'), getHouseById);
router.post('/', restrictAccess('admin', 'user'), validate(createUserSchema), createHouse);
router.put('/:houseId', restrictAccess('admin', 'user'), validate(createUserSchema), updateHouseById);
router.delete('/houseId', restrictAccess('admin'), deleteHouseById);

export default router;
