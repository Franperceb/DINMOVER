import { getModelForClass, index, modelOptions, mongoose, prop, } from '@typegoose/typegoose';
import userModel from './User.model';

//indexed attribute
@index({ city: 1 })

@modelOptions({
  schemaOptions: {
    timestamps: true
  },
})

export class House {
  @prop({
    required: [true, 'Provide the title of the property']
  })
  title: string;
  @prop({
    required: [true, 'Provide the location of the property']
  })
  location: string;
  @prop()
  property_type: string;
  @prop()
  operation_type: string;
  @prop()
  address: string;
  @prop()
  rooms: number;
  @prop()
  baths: number;
  @prop()
  price: number;
  @prop()
  m2: number;
  @prop({ ref: () => userModel, type: () => mongoose.Types.ObjectId })
  user_id: mongoose.Types.ObjectId;
};


const houseModel = getModelForClass(House);

export default houseModel;

