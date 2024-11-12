const jwt = require('jsonwebtoken');
const User = require('../model/LiveAccountSchema');

// Protect Routes
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401);
            return res.status(400).send('Not authorized, token failed');
        }
    } else {
        res.status(401);
        return res.status(400).send('Not authorized, no token');
    }
};

// Admin Middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        return res.status(400).send('Not authorized as an admin');
    }
};

module.exports = { protect, admin };
