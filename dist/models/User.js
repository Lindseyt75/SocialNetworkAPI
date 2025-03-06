import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'],
    },
    thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }],
    friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
});
// Virtual field for friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
const User = mongoose.model('User', userSchema);
export default User;
