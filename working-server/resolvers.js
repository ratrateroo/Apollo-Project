require('dotenv').config();
const jwt = require('jsonwebtoken');
const storeUpload = require('./storeUpload');
const files = require('./files');

const User = require('./models/user');
const readFileNames = require('./readFileNames');

const fs = require('fs');
const folderName = './public/images';

const resolvers = {
	Query: {
		files: readFileNames,
		user: async (_, { id }) => {
			try {
				console.log(id);
				const user = await User.findById(id);
				//console.log(user._doc);

				return {
					...user._doc,
					_id: user._doc._id.toString(),
					username: user.username,
					profileimage: user.profileimage,
				};
			} catch (err) {
				throw err;
			}
		},
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
				const users = await User.find();
				return users.map((user) => {
					return {
						...user._doc,
						_id: user._doc._id.toString(),
						username: user._doc.username,
						profileimage: user._doc.profileimage,
					};
				});
			} catch (err) {
				throw err;
			}
		},
	},
	Mutation: {
		uploadFile: (parent, { file }, context) => storeUpload(file, context),
		signUpUser: async (parent, { userInput }) => {
			console.log(userInput.username);
			try {
				const existingUser = await User.findOne({
					username: userInput.username,
				});
				if (existingUser) {
					//throw new Error('User exists already.');
					return { message: 'User exists already.' };
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
	},
};

module.exports = resolvers;
