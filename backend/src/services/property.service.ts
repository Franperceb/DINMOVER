import propertyModel, { Property } from '../models/Property.model';
import { FilterQuery, QueryOptions } from 'mongoose';


export const createProperty = async (input: Partial<Property>) => {
  await propertyModel.create(input);
};

export const findAllProperties = async () => {
  return await propertyModel.find();
};

export const findPropertyById = async (id: any) => {
  const property = await propertyModel.findById(id);
  return property;
};

export const findProperty = async (
  query: FilterQuery<Property>,
  options: QueryOptions = {}
) => {
  return await propertyModel.findOne(query, {}, options);
};

export const updateProperty = async (id: any, options: QueryOptions = {}) => {
  const property = await propertyModel.findByIdAndUpdate(id, options)
  return property;
};

export const deletePropertyById = async (id: any) => {
  return await propertyModel.findByIdAndDelete(id);
};
