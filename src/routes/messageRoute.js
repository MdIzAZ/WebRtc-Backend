const express = require("express");
const { sendMessage, deletedMessage, getAllMessage } = require("../controllers/messageController");


const router = express.Router()
router.post('/send-message', sendMessage)
router.delete('/delete-message', deletedMessage)
router.get('/getAll-message', getAllMessage)




exports.messageRoutes = router