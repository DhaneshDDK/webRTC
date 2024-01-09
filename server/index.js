const {Server, Socket} = require("socket.io");

const io = new Server(5000,{
    cors: true,
});

io.on('connection',(socket)=>{
    console.log('new socket connection', socket.id);
    socket.on('room-join',(data)=>{
        const {email,room} = data;
        io.to(room).emit("user-joined", {email, id:socket.id});
        socket.join(room);
        io.to(socket.id).emit('room-join',data);
    })

    socket.on('user:call',({to,offer})=>{
        io.to(to).emit('incoming-call', {from : socket.id, offer:offer});
    })

    socket.on('call:accepted',({to,ans})=>{
        io.to(to).emit('call:accepted', {from : to, ans });
    })

    
  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer:offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: to, ans });
  });

  socket.on('hide-streambtn',()=>{
    io.emit('hide-streambtnOn')
  })

})
