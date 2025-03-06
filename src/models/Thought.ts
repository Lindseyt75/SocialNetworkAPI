import mongoose, { Schema, Document } from 'mongoose';
import Reaction from './Reaction.js';

// Define Thought Schema
interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: mongoose.Types.Array<Schema.Types.ObjectId>;
  reactionCount: number; // Virtual field
}

const thoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date): Date => {
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
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

const Thought = mongoose.model<IThought>('Thought', thoughtSchema);
export default Thought;
