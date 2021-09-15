import { Schema, model } from 'mongoose';

const HouseSchema = new Schema(
  {
    type: { type: String },
    operationType: { type: String },
    address: { type: String },
    description: { type: String },
    rooms: { type: Number },
    baths: { type: Number },
    price: { type: Number },
    m2: { type: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const House = model('House', HouseSchema);
module.exports = House;
