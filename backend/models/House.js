const  {Schema ,  model} = require ('mongoose')


const HouseSchema = new Schema({
    
    homeType = ["casa", "departamento","terreno"],
    operationType = ["renta", "venta"],
    address,
    description,
    rooms,
    baths,
    price,
    pricem2,
    meter2,


});