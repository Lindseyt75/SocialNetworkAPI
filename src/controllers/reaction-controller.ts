import { Request, Response } from 'express';
import Thought from '../models/Thought.js';
import Reaction from '../models/Reaction.js';

// Create a reaction
export const createReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    const reaction = await Reaction.create(req.body);
    thought.reactions.push(reaction._id);
    await thought.save();

    return res.status(201).json(reaction);
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message || 'Internal server error' });
  }
};

// Delete reaction by reactionId
export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    thought.reactions.pull(req.params.reactionId);
    await thought.save();

    return res.json({ message: 'Reaction removed' });
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message || 'Internal server error' });
  }
};
