const jwt = require('jsonwebtoken');

const bcrypt =require('bcryptjs');
const User = require('../models/User');

User

const authMiddleware = async (req, res, next) => {
    console.log("inside midd")
    try {
        // Extract token from Authorization header
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }

        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by decoded token ID
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Attach user to request object
        req.user = user;
        
        // Proceed to next middleware
        next();
    } catch (err) {
        // Handle invalid token error
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = authMiddleware;