require('dotenv').config();
const mongoose = require('mongoose');

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
				console.log('Getting Users');
				const users = await User.find();
				const user = await User.findById(context.userId);
				console.log('User: ');

				if (!context.userId) {
					console.log("Can't find context object.");
					return users.map((user) => {
						console.log(user._doc._id.toString());
						return {
							...user._doc,
							_id: user._doc._id.toString(),
							username: user._doc.username,
							profileimage: user._doc.profileimage,
						};
					});
				}

				const theUser = await User.find({
					_id: context.userId,
				});
				console.log(theUser[0].username);

				if (!user) {
					console.log('Unauthorized Request.');
					return {
						message: 'Unauthorized!',
					};
				}
				return users.map((user) => {
					console.log(user._doc._id.toString());
					return {
						...user._doc,
						_id: user._doc._id.toString(),
						username: user._doc.username,
						profileimage: user._doc.profileimage,
					};
				});
			} catch (err) {
				console.log('Error in try.');
				throw err;
			}
		},
	},
	Mutation: {
		uploadFile: async (parent, { file }, context) => {
			try {
				const { filename, mimetype, encoding, stream } = await storeUpload(
					file,
					context
				);

				await User.updateOne(
					{ _id: context.userId },
					{ profileimage: filename }
				)
					.then((result) => {
						console.log('Upload success');
						return { filename, mimetype, encoding };
					})
					.catch((error) => console.log(error));
			} catch (error) {
				console.log(error);
			}
		},
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

					profileimage: 'user_dummy.png',
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
