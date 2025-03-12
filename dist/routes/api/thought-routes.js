import express from 'express';
import { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, } from '../../controllers/thought-controller.js';
import { createReaction, deleteReaction } from '../../controllers/reaction-controller.js';
const router = express.Router();
// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);
// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(createReaction);
// /api/thoughts/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);
export default router;
