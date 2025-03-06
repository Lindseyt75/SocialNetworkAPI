import mongoose, { Schema } from 'mongoose';
import Reaction from './Reaction.js';
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => {
            return timestamp;
        }, // formatted date
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [Reaction.schema],
});
// Virtual field for reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = mongoose.model('Thought', thoughtSchema);
export default Thought;
