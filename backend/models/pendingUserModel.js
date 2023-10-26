const mongoose = require('mongoose');

const pendingUserSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email address'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    phone: String,
});

module.exports = mongoose.model('PendingUser', pendingUserSchema);