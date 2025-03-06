import express from 'express';
import userRoutes from './api/user-routes';
import thoughtRoutes from './api/thought-routes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;
