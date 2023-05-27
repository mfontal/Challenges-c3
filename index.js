const express = require('express');
require('dotenv').config();
const { dbConection } = require('./database/config');
const cors = require("cors")

// Crear Express app
const app = express();

//Base Datos
dbConection();

//CORS

app.use(cors())

app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json()); 

//Rutas
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/task', require('./routes/task.js'));


//Escuchar al puerto 4000
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT);
});
