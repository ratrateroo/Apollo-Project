//Imports
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const url = `mongodb://127.0.0.1:27017/${process.env.MONGO_DB}`;

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

const startServer = async () => {
	console.log('Server Starting...');

	//Database Connection
	await mongoose
		.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log('Connected 🚀 To MongoDB Successfully');
		});

	const server = new ApolloServer({
		typeDefs,
		resolvers,
	});

	await server.start();

	const app = express();

	app.use(cors());

	// This middleware should be added before calling `applyMiddleware`.
	app.use(graphqlUploadExpress());

	server.applyMiddleware({
		app,
		//cors: { credentials: 'same-origin', origin: 'http://localhost:3000/' },
	});

	app.use(express.static('public'));

	//await new Promise((r) => app.listen({ port: 4000 }, r));

	app.listen({ port: 4000 }, () => {
		console.log(
			`🚀 Server ready at http://localhost:4000${server.graphqlPath}`
		);
	});
};

startServer();
