const { Message } = require("../models/Message")


const sendMessage = async (req, res) => {

    const { from, to, text } = req.body
    if (!from || !to || !text) {
        return res.status(400).json({ message: 'From, to, and text are required' })
    }

    try {
        const message = new Message({
            from: from,
            to: to,
            text: text
        })

        await message.save()
        res.status(201).json({ message: 'Message sent successfully', messageId: message._id })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }

}


const deletedMessage = async (req, res) => {
    const {messageId} = req.body
    if (!messageId) {
        return res.status(400).json({ message: 'Message ID is required' })
    }

    try {
        
        const deletedMessage = await Message.findByIdAndDelete(messageId)
        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found' })
        }

        res.status(200).json({ message: 'Message deleted successfully' })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const getAllMessage = async (req, res) => {
    try {
        const messages = await Message.find()
        res.status(200).json(messages)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

exports.sendMessage = sendMessage
exports.deletedMessage = deletedMessage
exports.getAllMessage = getAllMessage