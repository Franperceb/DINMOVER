const House = require('../models/House');

exports.createHouse = async (req, res, next) => {
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
exports.getHouses = async (req, res, next) => {
  try {
    const houses = await House.find();
    await res.status(201).json({ success: true, data: houses });
  } catch (err) {
    next(err);
  }
};
exports.getHouseById = (req, res, next) => {};
exports.updateHouseById = (req, res, next) => {};

exports.deleteHouseById = (req, res, next) => {};
