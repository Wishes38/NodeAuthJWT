import User from '../models/User.js';
import { hashPassword, comparePasswords, generateAccessToken, generateRefreshToken } from '../services/authService.js';
import jwt from 'jsonwebtoken';
import TokenBlacklist from '../models/TokenBlacklist.js';
import { loginAttempts } from '../utils/rateLimiter.js';

export const registerUser = async (req, res) => {
    const { username, password, job, role } = req.body;

    if (!username || !password || !job || !role) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists!' });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({ username, password: hashedPassword, job, role });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Internal server error!' });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    console.log('Login denemesi başladı');

    try {
        const user = await User.findOne({ username });

        if (!user || !(await comparePasswords(password, user.password))) {
            console.log('Login başarısız');
            return res.status(401).json({ message: 'Invalid username or password!' });
        }

        console.log('Login başarılı');

        if (loginAttempts[username]) {
            delete loginAttempts[username];
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        }).json({ message: 'Login successful!', accessToken });
    } catch (err) {
        console.error('Login sırasında hata:', err);
        res.status(500).json({ message: 'Internal server error!' });
    }
};


export const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token not found!' });
    }

    try {
        const blacklisted = await TokenBlacklist.findOne({ token: refreshToken });
        if (blacklisted) {
            return res.status(403).json({ message: 'Invalid refresh token!' });
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(403).json({ message: 'Refresh token expired!' });
                }
                return res.status(403).json({ message: 'Invalid refresh token!' });
            }

            const accessToken = generateAccessToken(user);
            res.json({ accessToken });
        });
    } catch (err) {
        console.error('Error refreshing token:', err);
        res.status(500).json({ message: 'Internal server error!' });
    }
};

export const logoutUser = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
        await TokenBlacklist.create({
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
        res.clearCookie('refreshToken');
        res.json({ message: 'Logout successful!' });
    } else {
        res.status(400).json({ message: 'No refresh token found!' });
    }
};
