const resolvers = {
	Query: {
		files: () => {
			return files;
		},
	},
	Mutation: {
		uploadFile: (parent, { file }) => storeUpload(file),
	},
};

exports.resolvers = resolvers;
