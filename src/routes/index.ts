import express from 'express';
import userRoutes from './api/user-routes.js';
import thoughtRoutes from './api/thought-routes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;
