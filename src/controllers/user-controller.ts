// get all users

// get single user by id

// create a new user

// update a user

// delete user (BONUS: and delete associated thoughts)

// add friend to friend list

// remove friend from friend list
import { Request, Response } from 'express';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

// Get all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select('-__v');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Get a single user by id with populated thoughts and friends
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends')
      .select('-__v');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Update user by id
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Delete user by id and associated thoughts
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await Thought.deleteMany({ _id: { $in: user.thoughts } }); // Delete associated thoughts
    return res.json({ message: 'User and associated thoughts deleted' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Add a friend to a user's friend list
export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }

    user.friends.push(friend._id as any);
    await user.save();

    friend.friends.push(user._id as any);
    await friend.save();

    return res.json({ message: 'Friend added' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Remove a friend from a user's friend list
export const removeFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }

    user.friends = user.friends.filter((id) => id.toString() !== (friend._id as string));
    await user.save();

    friend.friends = friend.friends.filter((id) => id.toString() !== (user._id as string));
    await friend.save();

    return res.json({ message: 'Friend removed' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
