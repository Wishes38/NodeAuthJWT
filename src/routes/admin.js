import express from 'express';
import { getAdminPanel } from '../controllers/adminController.js';
import { authenticateToken } from '../middlewares/authenticate.js';
import { authorizeRoles } from '../middlewares/authorize.js';

const router = express.Router();

// Admin Panel Route
router.get('/', authenticateToken, authorizeRoles(['admin']), getAdminPanel);

export default router;
