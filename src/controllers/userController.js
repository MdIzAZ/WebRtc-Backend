const { User } = require("../models/User")


const getUserById = async (req, res) => {

    const {userId} = req.body
    
    try {
        
        const user = await User.findById(userId).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(user)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
        
    }

}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

exports.getUserById = getUserById
exports.getAllUsers = getAllUsers