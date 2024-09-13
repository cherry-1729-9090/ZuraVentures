import express from "express";
import ProjectRoutes from "./ProjectRoutes.js";
import FileRoutes from "./FileRoutes.js";
import AuthRoutes from "./AuthRoutes.js";
import UserRoutes from "./UserRoutes.js";

const router = express.Router();

// Main API routes
router.use('/project', ProjectRoutes);  // Routes for project-related operations
router.use('/auth', AuthRoutes);        // Routes for authentication (signup, login, logout)
router.use('/file', FileRoutes);        // Routes for file-related operations
router.use('/user', UserRoutes);        // Routes for user-related operations

export default router;
