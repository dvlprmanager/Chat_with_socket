const { Schema, model } = require('mongoose');

const MessagesSchema = Schema({
    uid: {
        type: String,
        require: true,
    },
    nameUser: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = model('Message', MessagesSchema);