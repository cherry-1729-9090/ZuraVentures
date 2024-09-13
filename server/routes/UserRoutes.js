import express from 'express';
import { verifyUser } from '../middleware/authMiddleware.js';
import { fetchUser, updateUser } from '../controllers/UserController.js';

const router = express.Router();

// User routes
router.get('/', verifyUser, fetchUser);       // Fetch the current user's details
router.put('/', verifyUser, updateUser);      // Update the current user's details

export default router;
