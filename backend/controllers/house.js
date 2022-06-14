import House from '../models/House.js';

export const createHouse = async (req, res, next) => {
  const { type, operationType, address, description, rooms, baths, price, m2 } =
    req.body;
  try {
    const newHouse = new House({
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
    next(error);
  }
};
export const getHouses = async (req, res, next) => {
  try {
    const houses = await House.find();
    await res.status(201).json({ success: true, data: houses });
  } catch (err) {
    next(err);
  }
};
export const getHouseById = async (req, res, next) => {
  const { houseId } = req.params;
  try {
    const house = await House.findById(houseId);
    if (!house) return next(new ErrorResponse('Casa no existente', 400));
    res.status(201).json({ success: true, data: house });
  } catch (err) {
    next(err);
  }
};
export const updateHouseById = async (req, res, next) => {
  const { houseId } = req.params;
  try {
    const updatedHouse = await House.findByIdAndUpdate(houseId, req.body, {
      new: true,
    });
    if (!house) return next(new ErrorResponse('House does not exist', 400));
    res
      .status(201)
      .json({ success: true, data: 'Información de lote actualizada' });
  } catch (err) {
    next(err);
  }
};

export const deleteHouseById = async (req, res, next) => {
  const { houseId } = req.params;
  try {
    await House.findByIdAndDelete(houseId);
    res.status(204).json({ success: true, data: 'Eliminado exitosament' });
  } catch (err) {
    next(err);
  }
};
