import { Router } from 'express';
import {
  getAllPropertiesHandler,
  getPropertyHandler,
  updatePropertyHandler,
  deletePropertyHandler,
  registerPropertyHandler
} from '../controllers/property.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictAccess } from '../middleware/restrictAccess';
import { createPropertySchema } from '../schemas/property.schema';
import { validate } from '../middleware/validate';

const router = Router();
router.use(deserializeUser, requireUser);

router.get('/', restrictAccess('admin', 'user'), getAllPropertiesHandler);
router.get('/:propertyId', restrictAccess('admin', 'user'), getPropertyHandler);
router.post('/', restrictAccess('admin', 'user'), validate(createPropertySchema), registerPropertyHandler);
router.put('/:propertyId', restrictAccess('admin', 'user'), validate(createPropertySchema), updatePropertyHandler);
router.delete('/:propertyId', restrictAccess('admin'), deletePropertyHandler);

export default router;
