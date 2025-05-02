const http = require('http');
const { connectDB } = require('./db.js');
const { setupWebSocketServer } = require('./webSocket/webServer.js');
const { app } = require('./app.js');
const { messageChangeStream } = require('./listeners/messageListener.js');
const { userChangeStream } = require('./listeners/userListener.js');
require('dotenv').config()


const server = http.createServer(app);
const PORT = process.env.PORT || 5000;


connectDB(() => {

    const io = setupWebSocketServer(server);
    messageChangeStream(io);
    userChangeStream(io);


    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    // setupWebSocketServer(server);
})


