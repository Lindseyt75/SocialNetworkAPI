import Thought from '../models/Thought.js';
import Reaction from '../models/Reaction.js';
// Create a reaction
export const createReaction = async (req, res) => {
    try {
        // Find the thought by its ID
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        // Add the new reaction to the thought's reactions array
        thought.reactions.push(req.body);
        return res.json(thought);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// Delete reaction by reactionId
export const deleteReaction = async (req, res) => {
    try {
        // Find the thought by its ID
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        // Find and remove the reaction by reactionId from the thought's reactions
        thought.reactions.pull(req.params.reactionId);
        await thought.save();
        // Optionally, delete the reaction from the Reaction collection if you want to remove it completely
        await Reaction.findByIdAndDelete(req.params.reactionId);
        return res.json({ message: 'Reaction removed' });
    }
    catch (err) {
        return res.status(500).json({ message: err.message || 'Internal server error' });
    }
};
