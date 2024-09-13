import express from 'express';
import { verifyUser } from '../middleware/authMiddleware.js';
import { createProject, fetchProjects, fetchProject } from '../controllers/ProjectController.js';

const router = express.Router();

// Project routes
router.post('/', verifyUser, createProject);         // Create a new project
router.get('/', verifyUser, fetchProjects);          // Fetch all projects for the user
router.get('/:projectId', verifyUser, fetchProject); // Fetch a specific project by ID

export default router;
