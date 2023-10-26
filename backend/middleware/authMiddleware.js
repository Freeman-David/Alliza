const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    } else {
        res.status(400).json('Yor are not logged In! Please log in to get access');

        return;
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token
    const user = await User.findById(decoded.id);

    if(!user) {
        res.status(400).json('User not Exist')
    }

    // Check if user changed their password after token was issud

    if (user.changedPasswordAfter(decoded.iat)) {
        res.status(400).json('User recently updated password! Please log in again')
    }

    req.user = user;

    next();
});

module.exports = { protect };