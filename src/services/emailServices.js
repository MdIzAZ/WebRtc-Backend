const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS, 
    },
});

const sendEmail = async (to, verificationCode) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Email Verification Code',
        text: `Your verification code is: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);
};

exports.sendEmail = sendEmail