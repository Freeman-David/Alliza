const mongoose = require('mongoose');

const articlesSchema = new mongoose.Schema({
    header: String,
    author: String,
    img: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    readingTime: Number,
    link: String,
});

const Articles = new mongoose.model('Articles', articlesSchema);

module.exports = Articles;