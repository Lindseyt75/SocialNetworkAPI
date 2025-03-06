import mongoose, { Schema, Document } from 'mongoose';

// Define Reaction Schema (Subdocument for Thought)
interface IReaction extends Document {
  reactionBody: string;
  username: string;
  createdAt: Date;
}

const reactionSchema = new Schema<IReaction>({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date): Date => {
      return timestamp;
    }, // formatted date
  },
});

const Reaction = mongoose.model<IReaction>('Reaction', reactionSchema);
export default Reaction;
