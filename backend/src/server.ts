import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import errorHandler from './middleware/error';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db';
//import HouseRoutes from './routes/house';
import AuthRoutes from './routes/auth';
//import PrivateRoute from './routes/private';
import express, { Request, Response, NextFunction } from 'express';
import config from 'config';


export const app = express();


// Body Parser
app.use(express.json());

//cookie Parser
app.use(cookieParser());

//logger
if (process.env.NODE_ENV === 'development')
  app.use(morgan('dev'))
else if (process.env.NODE_ENV === 'production')
  app.use(morgan('prod'))
else
  app.use(morgan('test'))

//route connections
app.use('/api/auth', AuthRoutes);
//app.use('/api/houses', HouseRoutes);
//app.use('/api/private', PrivateRoute);

app.get('/', (_, res) => {
  res.send('api running');
});

//middlewares
app.use(errorHandler);


// UnKnown Routes
app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

const PORT = config.get<number>('port');
export const server = app.listen(PORT, () => {
  console.log(`server running on port  ${PORT}`)
  connectDB();
}
);

process.on('unhandledRejection', (err: any) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});

//PASOS: Fullstack app
//configurar node, servidor.
//escribir logica de rutas.
// se conecta routes a server
//Se crean controlladores
//se crea el modelo del user
// se conecta la db
//se realiza el errorHandler Middleware
//se ajustan controllers a detalle uno por uno
//se autentica con JWT
//Configurar middleware de ruta protegida
//ajustar rutas en el server.js y routes.js con el middleware

//ver si suar nodemon o ts-node-dev*/