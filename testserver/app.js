const { ApolloServer, gql, GraphQLUpload } = require('apollo-server');

const typeDefs = gql`
	scalar FileUpload

	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}

	type Query {
		uploads: [File]
		hello: String!
		hi: String!
	}

	type Mutation {
		singleUpload(file: FileUpload!): File!
	}
`;

const resolvers = {
	// FileUpload: GraphQLUpload,
	Query: {
		uploads: (parent, args) => {},
		hello: () => 'Hello World',
		hi: () => 'Hi  There',
	},
	Mutation: {
		singleUpload: async (_, { file }) => {
			const { createReadStream, filename, mimetype, encoding } = await file;
			const stream = createReadStream();

			// Rest of your code: validate file, save in your DB and static storage
			console.log(stream);
			return { filename, mimetype, encoding };
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
	console.log(`🚀  Test Server ready at ${url}`);
});
