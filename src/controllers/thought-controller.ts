
// get all thoughts

// get single thought by id

// create a thought

// update thought
    
// delete thought

// add a reaction to a thought

// remove reaction from a thought
import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

// Get all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find().select('-__v');
    return res.json(thoughts);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Get a single thought by id
export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId).select('-__v');
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json(thought);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Create a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { thoughts: thought._id },
    });

    return res.status(201).json(thought);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Update thought by id
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json(thought);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Delete thought by id
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json({ message: 'Thought deleted' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

