const { User } = require("../models/User.js");


function userChangeStream(io) {
    const changeStream = User.watch()

    changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            const user = change.fullDocument;
            console.log('New user:', user);
            io.emit('new-user', user);
        } else if (change.operationType === 'delete') {
            const deletedUserId = change.documentKey._id;
            console.log('User deleted:', deletedUserId);
            io.emit('user-deleted', deletedUserId);
        } else if (change.operationType === 'update') {
            const updatedUser = change.updateDescription.updatedFields;
            console.log('User updated:', updatedUser);
            io.emit('user-updated', updatedUser);
        }
    });
}

exports.userChangeStream = userChangeStream;
