const { storeUpload } = require('./storeUpload');
const files = require('./files');
const resolvers = {
	Query: {
		files: () => files,
	},
	Mutation: {
		uploadFile: (parent, { file }) => storeUpload(file),
	},
};

module.exports = resolvers;
