const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res,next)=> {
    res.render('index.ejs');
});

let messages = [];

io.on('connection', socket => {
    console.log(`socket conectado: ${socket.id}`);

    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    })
})

server.listen(3000);