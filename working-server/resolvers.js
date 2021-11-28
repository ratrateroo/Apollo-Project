const storeUpload = require('./storeUpload');
const files = require('./files');

const User = require('./models/user');

const resolvers = {
	Query: {
		files: () => files,
	},
	Mutation: {
		uploadFile: (parent, { file }) => storeUpload(file),
		createUser: async (parent, { userInput }) => {
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
			} catch (error) {
				console.log(error);
			}

			return {
				userId: 'userId',
				token: 'token',
				tokenExpiration: 10,
			};
		},
	},
};

module.exports = resolvers;
