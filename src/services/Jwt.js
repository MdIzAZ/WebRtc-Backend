const jwt = require('jsonwebtoken');


const generateToken = async(id, email) => {

    return jwt.sign(
        { id, email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY || '1d' }
    )

}


const verifyToken = async(token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return null
    }
}


exports.generateToken = generateToken
exports.verifyToken = verifyToken


