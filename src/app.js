const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const { authRoutes } = require('./routes/authRoute.js')
const { messageRoutes } = require('./routes/messageRoute.js')
const { userRoutes } = require('./routes/userRouter.js')


dotenv.config()


const app = express()

app.use(bodyParser.json())
app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/user', userRoutes)


exports.app = app