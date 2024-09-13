import express from 'express';
import { verifyUser } from '../middleware/authMiddleware.js';
import { createFile, fetchFiles, fetchFile, editFile, deleteFile } from '../controllers/FileController.js';

const router = express.Router();

// File routes
router.post('/:projectId', verifyUser, createFile);             // Create a new file
router.get('/:projectId', verifyUser, fetchFiles);              // Fetch all files for a project
router.get('/:projectId/:fileId', verifyUser, fetchFile);       // Fetch a specific file
router.put('/:projectId/:fileId', verifyUser, editFile);        // Edit a specific file
router.delete('/:projectId/:fileId', verifyUser, deleteFile);   // Delete a specific file

export default router;
