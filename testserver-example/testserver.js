const { ApolloServer, gql } = require('apollo-server-express');
const { createWriteStream, createReadStream } = require('fs');
const path = require('path');
const express = require('express');

const files = ['file1', 'file2'];

const typeDefs = gql`
	scalar Upload

	type Query {
		files: [String]
	}

	type Mutation {
		uploadFile(file: Upload!): Boolean
	}
`;

const resolvers = {
	Query: {
		files: () => files,
	},
	Mutation: {
		uploadFile: async (_, { file }) => {
			const { creatReadStream, filename } = await file;

			await new Promise((res) =>
				createReadStream()
					.pipe(
						createWriteStream(
							path.join(__dirname, './public/images', filename)
						)
					)
					.on('close', res)
			);

			files.push(filename);

			return true;
		},
	},
};
const startServer = async () => {
	const server = new ApolloServer({ typeDefs, resolvers });
	await server.start();
	const app = express();
	app.use('/images', express.static(path.join(__dirname, './public/images')));

	server.applyMiddleware({ app });

	app.listen(4000, () => {
		console.log(
			`🚀 Server ready at http://localhost:4000${server.graphqlPath}`
		);
	});
};

startServer();
