// app.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();

const uri = "mongodb+srv://vaniadonajitorres:02Mayovd@cluster0.ddgjd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let db;

// Conectar a la base de datos
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db('computadoras_db');
    console.log('Conectado a la base de datos');

    // Usar las rutas de computadoras
    const computadorasRoutes = require('./routes/computadoras');
    app.use('/computadoras', computadorasRoutes(db)); // Las rutas ahora usan /computadora

    // Configuración del puerto
    app.listen(3000, () => {
      console.log('Servidor corriendo en puerto 3000');
    });
  })
  .catch(err => console.error('Error al conectar a la base de datos', err));

app.use(bodyParser.json()); // Para parsear JSON en las peticiones
