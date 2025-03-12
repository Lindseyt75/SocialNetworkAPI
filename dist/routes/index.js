import { Router } from 'express';
import apiRoutes from "./api/index.js";
// import userRoutes from './api/userRoutes.js';
// import thoughtRoutes from './api/thoughtRoutes.js';
const router = Router();
router.use('/api', apiRoutes);
// router.use('/users', userRoutes);
// router.use('/thoughts', thoughtRoutes);
export default router;
