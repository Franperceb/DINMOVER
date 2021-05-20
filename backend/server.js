require('dotenv').config({ path: './config.env' });
const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('appi running');
});
const PORT = process.env.PORT || 5000;

//conexion de rutas al server
app.use('api/auth', require('./routes/auth'));

const server = app.listen(PORT, () =>
  console.log(`server running on port  ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});

//PASOS: Fullstack app
//configurar
//escribir logica de rutas.
// se conecta routes a server
//Se crean controlladores
//se crea el modelo del user