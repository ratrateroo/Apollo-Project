require('dotenv').config();
const jwt = require('jsonwebtoken');
const storeUpload = require('./storeUpload');
const files = require('./files');

const User = require('./models/user');

const resolvers = {
	Query: {
		files: () => files,
		logInUser: async (parent, { userInput }) => {
			console.log('User: ' + userInput.username + ' logged in.');
			try {
				const existingUser = await User.findOne({
					username: userInput.username,
				});
				if (!existingUser) {
					throw new Error('User does not exist.');
				}
				console.log(existingUser.id);

				const token = jwt.sign(
					{ userId: existingUser.id, username: existingUser.username },
					process.env.TOKEN_SECRET_KEY,
					{
						expiresIn: '1h',
					}
				);

				return {
					userId: existingUser.id,
					token: token,
					tokenExpiration: 1,
				};
			} catch (error) {
				console.log(error);
			}
		},
		users: async (parent, args, context, info) => {
			try {
				if (context.userId) {
					console.log('resolver');
					const users = await User.find();
					return users.map((user) => {
						return {
							...user._doc,
							_id: user._doc._id.toString(),
							username: user._doc.username,
							profileimage: user._doc.profileimage,
						};
					});
				}
				throw new Error('Unauthenticated.');
			} catch (err) {
				throw err;
			}
		},
	},
	Mutation: {
		uploadFile: (parent, { file }) => storeUpload(file),
		signUpUser: async (parent, { userInput }) => {
			console.log(userInput.username);
			try {
				const existingUser = await User.findOne({
					username: userInput.username,
				});
				if (existingUser) {
					throw new Error('User exists already.');
				}

				const user = new User({
					username: userInput.username,

					profileimage: 'defaultimage',
				});

				const result = await user.save();

				const token = jwt.sign(
					{ userId: result.id, username: user.username },
					'secretkeyforhashing',
					{
						expiresIn: '1h',
					}
				);

				return {
					userId: result._id,
					token: token,
					tokenExpiration: 1,
				};
			} catch (error) {
				console.log(error);
			}
		},
	},
};

module.exports = resolvers;
