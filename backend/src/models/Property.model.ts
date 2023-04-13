import { getModelForClass, index, modelOptions, mongoose, prop, } from '@typegoose/typegoose';
import userModel from './User.model';
//indexed attribute
@index({ city: 1 })
@index({ user_id: 1 })
@index({ property_type: 1 })
@index({ operation_type: 1 })

@modelOptions({
  schemaOptions: {
    timestamps: true
  },
})

export class Property {
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
  description: string;
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


const propertyModel = getModelForClass(Property);

export default propertyModel;

