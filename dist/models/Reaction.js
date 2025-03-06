import mongoose, { Schema } from 'mongoose';
const reactionSchema = new Schema({
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
        get: (timestamp) => {
            return timestamp;
        }, // formatted date
    },
});
const Reaction = mongoose.model('Reaction', reactionSchema);
export default Reaction;
