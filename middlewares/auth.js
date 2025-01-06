const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/config');
const User = require('../models/User');

const auth = {
    // Middleware to check if the user is authenticated
    checkAuth: (request, response, next) => {
        const token = request.cookies.token;

        // If the token is not present, send a response
        if (!token) {
            return response.status(401).json({ message: 'Unauthorized' });
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token, SECRET_KEY);

            // Set the user id in the request object
            request.userId = decoded.id;

            // Continue with the request
            next();
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    // Middleware to allow roles passed as an argument
    allowRoles: (roles) => {
        return async (request, response, next) => {
            // get the userId from the request object
            const userId = request.userId;

            // get the user from the database
            const user = await User.findById(userId);

            // check if the user has the role
            if (!roles.includes(user.role)) {
                return response.status(403).json({ message: 'Forbidden' });
            }

            // Continue with the request
            next();
        }
    }
}

module.exports = auth;