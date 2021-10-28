const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const {
	GraphQLUpload,
	graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');

//Type Definitions
const typeDefs = gql`
	# The implementation for this scalar is provided by the
	# 'GraphQLUpload' export from the 'graphql-upload' package
	# in the resolver map below.
	scalar Upload

	type File {
		# filename: String!
		# mimetype: String!
		# encoding: String!
		url: String!
	}

	type Query {
		# This is only here to satisfy the requirement that at least one
		# field be present within the 'Query' type.  This example does not
		# demonstrate how to fetch uploads back.
		# otherFields: Boolean!
		hello: String!
	}

	type Mutation {
		# Multiple uploads are supported. See graphql-upload docs for details.
		# singleUpload(file: Upload!): File!
		uploadFile(file: Upload!): File!
	}
`;

//Resolvers
const resolvers = {
	Query: {
		hello: () => 'Hello World',
	},

	//Upload: GraphQLUpload,
	Mutation: {
		uploadFile: async (parent, { file }) => {
			const { createReadStream, filename, mimetype, encoding } = await file;

			const stream = createReadStream();
			const pathName = path.join(__dirname, `public/images/${filename}`);
			await stream.pipe(fs.createWriteStream(pathName));

			//await finished(pathName);

			return {
				url: `http://localhost:4000/images/${filename}`,
			};
		},
	},
};
