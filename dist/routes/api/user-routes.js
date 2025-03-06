// /api/users
// /api/users/:userId
// /api/users/:userId/friends/:friendId
import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend, } from '../../controllers/user-controller.js';
const router = express.Router();
router.route('/').get(getAllUsers).post(createUser);
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);
export default router;
