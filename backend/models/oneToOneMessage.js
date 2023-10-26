const mongoose = require('mongoose');

const oneToOneMessageSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    messages: [{
        to: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        from: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        text: String,
    }]
});

const OneToOneMessage = new mongoose.model('OneToOneMessage', oneToOneMessageSchema);

module.exports = OneToOneMessage;