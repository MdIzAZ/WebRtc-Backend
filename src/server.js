const http = require('http');
const { connectDB } = require('./db.js');
const { setupWebSocketServer } = require('./webSocket/webServer.js');
const { app } = require('./app.js');
require('dotenv').config()


const server = http.createServer(app);
const PORT = process.env.PORT || 5000;


connectDB(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    setupWebSocketServer(server);
})


