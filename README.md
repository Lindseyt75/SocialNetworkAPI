# SocialNetworkAPI

# User Story
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

# Acceptance Criteria
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user's friend list

Github repo:
https://github.com/Lindseyt75/SocialNetworkAPI.git

# Steps for Use
1. Clone Repo
2. Open the terminal and do npm install
3. Then insure ypu have Mongo DB installed and configured.
4. Once that is done do npm run start and that will start your server on port 3001.
5. Then you are ready and here are your routes.

# User Routes
1. GET /api/users (This will get all users)
2. POST /api/users (This will create a new user)
3. GET /api/users/(use user ID)userId (This will get a single user by their ID)
4. PUT /api/users/(use user ID)userId (You can update a user by their ID)
5. DELETE /api/users/(use user ID)userId (You can also delete a user by their ID)
6. POST /api/users/(use user ID)userId/friends (You can add a friend to the user's friend list)
7. DELETE /api/users/(use user ID)userId/friends/(use friend ID)friendId (You can also remove a user's friend from the list)

# Thought Routes
1. GET /api/thoughts (This will get all thoughts)
2. POST /api/thoughts (This will get a single thought by their ID)
3. GET /api/thoughts/(use thought ID)thoughtId (This will create a new thought)
4. PUT /api/thoughts/(use thought ID)thoughtId (You can update a thought by their ID)
5. DELETE /api/thoughts/(use thought ID)thoughtId(You can also delete a thought by their ID)
6. POST /api/thoughts/(use thought ID)thoughtId/reactions (You can add a reaction to a thought)
7. DELETE /api/thoughts/(use thought ID)thoughtId/reactions/(use reaction ID)reactionId (You can also remove a reaction from a thought)

Insomnia Screenshots
![Insomnia](image-1.png)

![Insomnia2](image-2.png)

![Insomnia3](image-3.png)

![Insomnia4](image-4.png)
