const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/config');

const authController = {
    register: async (request, response) => {
        try {
            // get the details from the request body
            const { name, email, password } = request.body;

            // validate the email
            const user = await User.findOne({ email });

            // if the email is already in use, send a response
            if (user) {
                return response.status(400).json({ message: 'Email already in use' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a model object
            const newUser = new User({ name, email, password: hashedPassword });

            // Save the user to the database
            await newUser.save();

            // Send a response
            response.status(201).json({ message: 'Registration successful' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    login: async (request, response) => {
        try {
            const { email, password } = request.body;

            // find the user with the email
            const user = await User.findOne({ email });

            // if the user does not exist, send a response
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            // compare the password
            const isMatch = await bcrypt.compare(password, user.password);

            // if the password does not match, send a response
            if (!isMatch) {
                return response.status(400).json({ message: 'Invalid credentials' });
            }

            // create a token
            const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '3h' });

            // send the token to the http only cookie
            response.cookie('token', token, { httpOnly: true });

            // send a response
            response.status(200).json({ message: 'Login successful ' });

        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    logout: async (request, response) => {
        try {
            // clear the cookie
            response.clearCookie('token');

            // send a response
            response.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    me: async (request, response) => {
        try {
            const userId = request.userId;

            // find the user with the id
            const user = await User.findById(userId).select('-password -__v');

            // send a response
            response.status(200).json({ user });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

module.exports = authController;