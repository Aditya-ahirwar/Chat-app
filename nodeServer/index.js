const io = require("socket.io")(8000);
let usersList = {};
 io.on('connection', socket=>{
     socket.on('onNewUser', name=>{
         usersList[socket.id] = name;
         socket.broadcast.emit('joined', name);
     });

     socket.on('send', message=>{
         socket.broadcast.emit('receive', {message: message, name: usersList[socket.id]})
     });

     socket.on('disconnect', message=>{
        socket.broadcast.emit('left', usersList[socket.id]);
        delete usersList[socket.id];
    });
 })

 console.log("we are live");