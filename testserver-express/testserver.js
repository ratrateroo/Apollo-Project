const { ApolloServer, gql } = require('apollo-server-express');
const { createWriteStream, createReadStream } = require('fs');
const { path } = require('path');
const express = require('express');

const files = [];

const typeDefs = gql`
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

const server = new ApolloServer({ typeDefs, resolvers });
