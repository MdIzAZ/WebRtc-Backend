const express = require("express");
const { sendVerificationEmail, verifyCode } = require("../controllers/authController.js");
const { logInUser } = require("../controllers/signInController.js");


const router = express.Router()
router.post('/send-verification-email', sendVerificationEmail) 
router.post('/verify-code', verifyCode);
router.post('/login', logInUser)

exports.authRoutes = router