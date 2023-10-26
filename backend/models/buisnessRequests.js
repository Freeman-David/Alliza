const mongoose = require('mongoose');

const buisnessRequestSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email address'],
        unique: true
    },
    contactName: String,
    phone: String,
    companyName: String,
    message: String,
});

module.exports = mongoose.model('BuisnessRequest', buisnessRequestSchema);