const { Message } = require("../models/Message");

function messageChangeStream(io) {
    const changeStream = Message.watch()

    changeStream.on('change', (change) => {

        if (change.operationType === 'insert') {
            const message = change.fullDocument
            console.log('New message:', message)
            io.emit('new-message', message)
        } else if (change.operationType === 'delete') {
            const deletedMessageId = change.documentKey._id
            console.log('Message deleted:', deletedMessageId)
            io.emit('message-deleted', deletedMessageId)
        } else if (change.operationType === 'update') {
            const updatedMessage = change.updateDescription.updatedFields
            console.log('Message updated:', updatedMessage)
            io.emit('message-updated', updatedMessage)
        }

    })

}

exports.messageChangeStream = messageChangeStream