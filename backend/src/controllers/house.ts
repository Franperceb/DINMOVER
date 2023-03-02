import House from '../models/House.js';
import ErrorResponse from '../utils/errorResponse';

export const createHouse = async (req: any, res: any, next: any) => {
  const {
    title,
    location,
    type,
    operationType,
    address,
    description,
    rooms,
    baths,
    price,
    m2,
  } = req.body;

  try {
    const existingHouse = await House.findOne({
      title: title,
      type: type,
      location: location,
    });

    if (existingHouse)
      return next(new ErrorResponse('House already exists', 500));

    const newHouse = new House({
      title,
      location,
      type,
      operationType,
      address,
      description,
      rooms,
      baths,
      price,
      m2,
    });
    await newHouse.save();

    res
      .status(201)
      .json({ success: true, data: 'Información guardada exitosamente' });
  } catch (err) {
    next(err);
  }
};
export const getHouses = async (_req: any, res: any, next: any) => {
  try {
    const houses = await House.find();
    await res.status(201).json({ success: true, data: houses });
  } catch (err) {
    next(err);
  }
};
export const getHouseById = async (req: any, res: any, next: any) => {
  const { houseId } = req.params;
  try {
    const house = await House.findById(houseId);
    if (!house) return next(new ErrorResponse('House does not exist', 400));
    res.status(201).json({ success: true, data: house });
  } catch (err) {
    next(err);
  }
};
export const updateHouseById = async (req: any, res: any, next: any) => {
  const { houseId } = req.params;
  try {
    const updatedHouse = await House.findByIdAndUpdate(houseId, req.body, {
      new: true,
    });
    if (!updatedHouse) return next(new ErrorResponse('Property does not exist', 400));
    res
      .status(201)
      .json({ success: true, data: 'Información de lote actualizada' });
  } catch (err) {
    next(err);
  }
};

export const deleteHouseById = async (req: any, res: any, next: any) => {
  const { houseId } = req.params;
  try {
    await House.findByIdAndDelete(houseId);
    res.status(204).json({ success: true, data: 'Eliminado exitosamente' });
  } catch (err) {
    next(err);
  }
};
