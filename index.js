// comenzamos a escribir nuestro servidor 
const path = require('path');
const express = require('express');
const app = express();

const SocketIO = require('socket.io');
// SocketIO necesita un servidor ya creado  mediante el metodo listen
//Iniciar el servidor 
app.set('port', process.env.PORT || 3000);

// static file
app.use(express.static(path.join(__dirname, 'public')));


const server = app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
})
// agregar un puerto al servidor 

const io = SocketIO(server);

// Web socket, lo primero que hay que hacer es escuchar cuando se conecta un nuevo cliente
io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data) 
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data) 
    });
});


