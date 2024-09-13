import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/userSchema.js';
import { config } from '../config/config.js';

dotenv.config();

const createToken = (userId) => {
  return jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: '1h' });
};

export const register = async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const protectedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: protectedPassword,
      userName,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ message: 'User logged in successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'User logged out successfully' });
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.decodedUser.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User details fetched successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};
