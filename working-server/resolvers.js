const storeUpload = require('./storeUpload');
const files = require('./files');
const resolvers = {
	Query: {
		files: () => files,
	},
	Mutation: {
		uploadFile: (parent, { file }) => storeUpload(file),
		createUser: async (args) => {},
	},
};

module.exports = resolvers;
