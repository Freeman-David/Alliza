const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
    header: String,
    info: String,
    location: String,
    contactPoint: String,
    type: String,
    img: String,
    date: {
        type: Date,
    },
    eventTime: Number,
    participants: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
});

const Events = new mongoose.model('Events', eventsSchema);

module.exports = Events;