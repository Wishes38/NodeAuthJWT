import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

export const generateAccessToken = (user) => {
    return jwt.sign(
        { username: user.username, job: user.job, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign({ username: user.username }, process.env.JWT_REFRESH, { expiresIn: '7d' });
};
