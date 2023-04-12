//adding validations user input with zod schema validation

import { number, object, string, TypeOf } from 'zod';

export const createPropertySchema = object({
  body: object({
    title: string({ required_error: 'Provide the title of the property' }),
    location: string({ required_error: 'Provide the location of the property' }),
    property_type: string({ required_error: 'No property type added' }),
    operation_type: string({ required_error: 'Provide the operation type of the property' }),
    address: string({ required_error: 'No address on the property' }),
    description: string({ required_error: 'Provide a description on the property' }),
    rooms: number({ required_error: 'Provide number of rooms' }),
    baths: number({ required_error: 'Provide number of baths' }),
    price: number({ required_error: 'Missing price of the property' }),
    m2: number({ required_error: 'Missing m2 of the property' }),
  })
});



export type CreatePropertySchema = TypeOf<typeof createPropertySchema>['body'];