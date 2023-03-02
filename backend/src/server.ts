import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './middleware/error.js';
import connectDB from './utils/db.js';
import HouseRoutes from './routes/house.js';
import AuthRoutes from './routes/auth.js';
import PrivateRoute from './routes/private.js';
import config from 'config';

dotenv.config();

export const app = express();

connectDB();

app.use(express.json());

app.get('/', (_, res) => {
  res.send('api running');
});

const PORT = config.get<number>('port');

//conexion de rutas al server
app.use('/api/auth', AuthRoutes);
app.use('/api/houses', HouseRoutes);
app.use('/api/private', PrivateRoute);
//middlewares
app.use(errorHandler);

export const server = app.listen(PORT, () =>
  console.log(`server running on port  ${PORT}`)
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

//ver si suar nodemon o ts-node-dev