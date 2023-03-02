import mongoose from 'mongoose';

const HouseSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Provide a title of property'] },
    location: {
      type: String,
      required: [true, 'Provide the location of property'],
    },
    city: { type: String },
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
const House = mongoose.model('House', HouseSchema);

export default House;
