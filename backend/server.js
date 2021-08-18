require('dotenv').config({ path: './config.env' });
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('appi running');
});
const PORT = process.env.PORT || 5000;

//conexion de rutas al server
app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));
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
