const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });
  console.log(process.env.MONGO_URI);
  console.log('MongoDB CONNECTED');
};

module.exports = connectDB;
