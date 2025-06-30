const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password using salt rounds from .env
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.N));

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Respond with success
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ==============================
// LOGIN CONTROLLER
// ==============================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        if (!email.includes('@')) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Prepare JWT payload
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        };

        // Generate token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });

        // Convert user to plain object and remove password
        const userObj = user.toObject();
        userObj.token = token;
        userObj.password = undefined;

        // Cookie options
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
            httpOnly: true,
        };

        // Send token in cookie
        res.cookie("token", token, options).status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: userObj,
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failure', error: error.message }); // Add error.message for debugging
    }
};