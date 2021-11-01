const { gql } = require('apollo-server-express');
const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload');

//Create type definition using gql
const typeDefs = gql`
	scalar Upload

	type Query {
		files: [String]
	}

	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}

	type Mutation {
		uploadFile(file: Upload!): File
	}
`;

module.exports = typeDefs;
