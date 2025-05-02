const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from: String,
    to: String,
    text: String,
    createdAt: { type: Date, default: Date.now }
})


const Message = mongoose.model('Message', messageSchema)
exports.Message = Message