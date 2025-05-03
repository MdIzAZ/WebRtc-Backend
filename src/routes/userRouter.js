const express = require('express');
const { getAllUsers, getUserById, updateUser } = require('../controllers/userController');



const router = express.Router()
router.get('/getAll-users', getAllUsers)
router.get('/get-user', getUserById)
router.patch('/update-user/:id', updateUser)

exports.userRoutes = router

