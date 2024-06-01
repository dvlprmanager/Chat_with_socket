const express = require("express");
const { dbConnection } = require("./database/configMongo");
const cors = require('cors');
const http = require('http'); // Importa el módulo http
const socketIo = require('socket.io');
require("dotenv").config();

//Servidor express

const app = express();

// Crear el servidor HTTP
const server = http.createServer(app);

// Adjuntar socket.io al servidor HTTP
const io = socketIo(server, {
  cors: { origin: '*' }
});

// Base de Datos

dbConnection();

//CORS

app.use(cors());

//Directorio publico

app.use(express.static("public"));

//Lectura y parseo del body

app.use(express.json());

//Rutas

app.use("/api/auth", require("./routes/auth"));


io.on('connection', (socket) => {
  // Escuchar evento 'new_user' cuando el cliente envía los datos del usuario
  socket.on('new_user', (user) => {

    console.log(user)

    socket.broadcast.emit('chat_message', {
      usuario: user.name,
      mensaje: 'Se ha conectado al chat',
      value: 1
    });
  });

  socket.on('chat_message', (data) => {
    io.emit('chat_message', data);
  });

  socket.on('allow_user', (user) => {
    console.log(user)
    socket.broadcast.emit('chat_message', {
      usuario: user.name,
      mensaje: 'Se ha Desconectado del chat',
      value: 2
    });
});



});

// Define la IP y el puerto
const hostname = '192.168.56.1'; // Reemplaza con la IP deseada
const port = 4000;


//Escuchar peticiones

// El servidor escucha en la IP y el puerto especificados
server.listen(port, hostname, () => {
  console.log(`Servidor ejecutándose en http://${hostname}:${port}/`);
});