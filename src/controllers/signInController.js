const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models/User')
const { generateToken } = require('../services/Jwt')


const logInUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' })
    }

    try {
        
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' })
        } 

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const token = await generateToken(user._id, user.email)
        if (!token) {
            return res.status(500).json({ message: 'Error generating token' })
        }

        const userObj = user.toObject()
        delete userObj.password



        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: userObj
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

exports.logInUser = logInUser
