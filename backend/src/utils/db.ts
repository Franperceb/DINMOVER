import mongoose from 'mongoose';
import config from 'config';

const dbUrl = process.env.NODE_ENV === 'development' ?
  `mongodb://${config.get('dbName')}:${config.get('dbPass')}@localhost:6000/jwtAuth?authSource=admin` :
  `mongodb://${config.get('dbName')}:${config.get('dbPass')}@localhost:6000/${config.get('dbTestDBName')}?authSource=admin`;

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    console.log(dbUrl);
    await mongoose.connect(dbUrl);
    console.log('MongoDB CONNECTED');
  }
  catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;


