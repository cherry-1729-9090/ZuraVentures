import express from 'express';
import { register, login, logout, getCurrentUser } from '../controllers/authController.js';
import { verifyUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Authentication routes
router.post('/signup', register);  // User registration
router.post('/login', login);    // User login
router.post('/logout', logout);  // User logout
router.get('/verify', verifyUser, getCurrentUser);  // Verify and fetch current user

export default router;
