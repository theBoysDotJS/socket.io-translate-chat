var express = require('express');
var socket = require('socket.io');
var translate = require('google-translate-api');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        console.log(data)
        translate(data.message, {to: 'fr'})
        .then( trans => {
          data.message = trans.text;
          console.log(data, "this is the data")
          io.sockets.emit('chat', data);
        }
        )
        console.log(data)
        // console.log(data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
