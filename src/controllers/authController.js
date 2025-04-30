const { User } = require("../models/User.js");
const { sendEmail } = require("../services/emailServices.js");
const bcrypt = require('bcryptjs');

const sendVerificationEmail = async (req, res) => {
    const {email} = req.body
    if(!email){
        console.error("No email found")
        return res.status(400).json({message: "Email Required"})
    }

    try {

        // Check if the email is already registered
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' })
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000)
        await sendEmail(email, verificationCode)

        req.app.locals[`${email}_code`] = verificationCode;
        res.status(200).json({ message: "Verification email sent successfully" });
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server error\n Unable to send email"})
    }
}


const verifyCode = async(req, res) => {
    const { email, code } = req.body
    if (!email || !code) {
        return res.status(400).json({ message: 'Email and code are required' })
    }

    const storedCode = req.app.locals[`${email}_code`]
    
    if (storedCode && storedCode === parseInt(code)) {
        createUserAccount(req, res, email)
    } else {
        res.status(400).json({ message: 'Invalid verification code' })
    }
}


const createUserAccount = async(req, res, email) => {
    const { name, password } = req.body
    if (!name || !password) {
        return res.status(400).json({ message: 'Name and password are required' })
    }

    try {
        const exitingUser = await User.findOne({email});
        if(exitingUser) {
            return res.status(400).json({ message: 'User already exists with this email' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name:name, 
            email:email, 
            password:hashedPassword
        })

        await newUser.save()

        delete req.app.locals[`${email}_code`];
        res.status(201).json({ message: 'User created successfully', userId: newUser._id })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in ServerSide during user account creation' });
    }

}






exports.sendVerificationEmail = sendVerificationEmail
exports.verifyCode = verifyCode