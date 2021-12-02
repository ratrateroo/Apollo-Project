const jwt = require('jsonwebtoken');
const storeUpload = require('./storeUpload');
const files = require('./files');

const User = require('./models/user');

const resolvers = {
	Query: {
		files: () => files,
		logInUser: async (parent, { userInput }) => {
			console.log(userInput.username);
			try {
				const existingUser = await User.findOne({
					username: userInput.username,
				});
				if (!existingUser) {
					throw new Error('User does not exist.');
				}

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
