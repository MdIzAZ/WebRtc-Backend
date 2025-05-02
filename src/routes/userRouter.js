const express = require('express');
const { getAllUsers, getUserById } = require('../controllers/userController');



const router = express.Router()
router.get('/getAll-users', getAllUsers)
router.post('/get-user', getUserById)

exports.userRoutes = router

