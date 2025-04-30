const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const { authRoutes } = require('./routes/authRoute.js')


dotenv.config()


const app = express()

app.use(bodyParser.json())
app.use('/api/auth', authRoutes)


exports.app = app