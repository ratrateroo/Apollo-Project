const storeUpload = require('./storeUpload');
const resolvers = {
	Query: {
		files: () => 'filestring',
	},
	Mutation: {
		uploadFile: (parent, { file }) => storeUpload(file),
	},
};

exports.resolvers = resolvers;
