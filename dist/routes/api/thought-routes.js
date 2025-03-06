// /api/thoughts
// /api/thoughts/:thoughtId
// /api/thoughts/:thoughtId/reactions
// /api/thoughts/:thoughtId/reactions/:reactionId
import express from 'express';
import { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, } from '../../controllers/thought-controller';
import { createReaction, deleteReaction } from '../../controllers/reaction-controller';
const router = express.Router();
router.route('/').get(getAllThoughts).post(createThought);
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
router
    .route('/:thoughtId/reactions')
    .post(createReaction);
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);
export default router;
