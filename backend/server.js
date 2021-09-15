import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './middleware/error';
import connectDB from './config/db';
import HouseRoutes from './routes/house';
import AuthRoutes from './routes/auth';
import PrivateRoute from './routes/private';

dotenv.config({ path: './config.env' });
const app = express();
connectDB();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('appi running');
});
const PORT = process.env.PORT || 5000;

//conexion de rutas al server
app.use('/api/auth', AuthRoutes);
app.use('/api/houses', HouseRoutes);
app.use('/api/private', PrivateRoute);
//middlewares
app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(`server running on port  ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
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
