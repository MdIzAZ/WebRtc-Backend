const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const { authRoutes } = require('./routes/authRoute')
const { connectDB } = require('./db')


dotenv.config()


const app = express()
connectDB()

app.use(bodyParser.json())
app.use('/api/auth', authRoutes)


const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`Server running on \x1b]8;;http://localhost:${PORT}\x1b\\http://localhost:${PORT}\x1b]8;;\x1b\\`);
})
