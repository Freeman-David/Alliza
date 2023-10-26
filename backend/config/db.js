const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    .then(conn => {
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    }).catch(error => {
        console.log(error);
        process.exit(1);
    });
}

module.exports = connectDB;