const express = require("express");
const { sendVerificationEmail, verifyCode } = require("../controllers/authController");


const router = express.Router()
router.post('/send-verification-email', sendVerificationEmail) 
router.post('/verify-code', verifyCode);

exports.authRoutes = router