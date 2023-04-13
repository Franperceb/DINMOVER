import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../utils/errorResponse';
import { findProperty, createProperty, findAllProperties, updateProperty, deletePropertyById, findPropertyById } from '../services/property.service';
import { CreatePropertySchema } from '../schemas/property.schema';
import { Property } from '../models/Property.model';
export const registerPropertyHandler = async (
  req: Request<{}, {}, CreatePropertySchema>,
  res: Response,
  next: NextFunction) => {

  const user_id = res.locals.user._id;
  const username = res.locals.user.username;
  const property: Property = { ...req.body, user_id };
  const { title, property_type, operation_type } = req.body;
  try {
    const existingProperty = await findProperty({ title, property_type, operation_type })

    if (existingProperty) return next(new ErrorResponse('Property already exists', 409));

    await createProperty(property);

    res
      .status(201)
      .json({ success: true, data: `Property: ${title} succesfully added by User: ${username}` });
  } catch (err) {
    next(err);
  }
};

export const getAllPropertiesHandler = async (_req: any, res: any, next: any) => {
  try {
    const properties = await findAllProperties();
    await res.status(201).json({
      success: true,
      result: properties.length,
      data: properties
    });
  } catch (err) {
    next(err);
  }
};
export const getPropertyHandler = async (req: any, res: any, next: any) => {
  const { propertyId } = req.params;
  try {
    const property = await findPropertyById(propertyId);
    if (!property) return next(new ErrorResponse('Property does not exist', 400));
    res.status(201).json({ success: true, data: property });
  } catch (err) {
    next(err);
  }
};
export const updatePropertyHandler = async (
  req: Request<any, {}, CreatePropertySchema>,
  res: Response,
  next: NextFunction) => {
  const user_id = res.locals.user._id;
  const username = res.locals.user.username;
  const property: Property = { ...req.body, user_id };
  const { propertyId } = req.params;

  try {
    const updatedProperty = await updateProperty(propertyId, property);
    if (!updatedProperty) return next(new ErrorResponse('Property does not exist', 400));
    res
      .status(200)
      .json({ success: true, data: `Property: ${property.title} succesfully updated by User: ${username}` });
  } catch (err) {
    next(err);
  }
};

export const deletePropertyHandler = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
  const { propertyId } = req.params;
  try {
    const existingProperty = await findPropertyById(propertyId)

    if (!existingProperty) return next(new ErrorResponse('Property does not exist', 409));
    await deletePropertyById(propertyId);

    res
      .status(200)
      .json({ success: true, data: 'Property successfully deleted' });
  } catch (err) {
    next(err);
  }
};
