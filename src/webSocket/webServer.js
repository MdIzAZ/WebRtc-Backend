const {Server} = require('socket.io')


function setupWebSocketServer(server) {

    const io = new Server( server, {
        cors: {
            origin: "*"
        },
    })


    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id)

        socket.on('user-joined', (userData) => {
            console.log('New user joined:', userData);
            socket.broadcast.emit('user-joined', userData);
        });

        socket.on('user-online', (userId) => {
            console.log('User online:', userId)
            socket.broadcast.emit('user-online', userId)
        })

        socket.on('send-message', ({to, message}) => {
            console.log('Message sent:', message, 'to:', to)
            io.to(to).emit('receive-message', message)  
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id)
        })

    });


}

exports.setupWebSocketServer = setupWebSocketServer