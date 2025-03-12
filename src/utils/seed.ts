import db from '../config/connection.js';
import cleanDB from './cleanDB';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

const seedDB = async () => {
  try {
    await db();
    await cleanDB();

    const users = await User.insertMany([
      { username: 'john_doe', email: 'john.doe@example.com' },
      { username: 'jane_smith', email: 'jane.smith@example.com' },
      { username: 'peter_jones', email: 'peter.jones@example.com' },
      { username: 'alice_white', email: 'alice.white@example.com' },
      { username: 'bob_green', email: 'bob.green@example.com' },
    ]);

    const thoughts = await Thought.insertMany([
      {
        thoughtText: 'Enjoying a beautiful day!',
        username: users[0].username,
        reactions: [
          { reactionBody: 'Awesome!', username: users[1].username },
          { reactionBody: 'Cool!', username: users[2].username },
        ],
      },
      {
        thoughtText: 'Just finished reading a great book.',
        username: users[1].username,
        reactions: [
          { reactionBody: 'Which book?', username: users[0].username },
        ],
      },
      {
        thoughtText: 'Coding is fun!',
        username: users[2].username,
        reactions: [
          { reactionBody: 'Totally agree!', username: users[3].username },
          { reactionBody: 'Yes it is!', username: users[4].username },
          { reactionBody: 'I agree too!', username: users[0].username },
        ],
      },
      {
        thoughtText: 'Learning new things everyday',
        username: users[3].username,
        reactions: [
          { reactionBody: 'Keep going!', username: users[1].username },
        ],
      },
      {
        thoughtText: 'Having a great time with friends.',
        username: users[4].username,
        reactions: [
          { reactionBody: 'Sounds fun!', username: users[2].username },
        ],
      },
    ]);

    await User.findByIdAndUpdate(users[0]._id, { thoughts: [thoughts[0]._id], friends: [users[1]._id, users[2]._id] });
    await User.findByIdAndUpdate(users[1]._id, { thoughts: [thoughts[1]._id], friends: [users[0]._id, users[3]._id] });
    await User.findByIdAndUpdate(users[2]._id, { thoughts: [thoughts[2]._id], friends: [users[0]._id, users[4]._id] });
    await User.findByIdAndUpdate(users[3]._id, { thoughts: [thoughts[3]._id], friends: [users[1]._id] });
    await User.findByIdAndUpdate(users[4]._id, { thoughts: [thoughts[4]._id], friends: [users[2]._id] });

    console.log('Database seeded successfully! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();