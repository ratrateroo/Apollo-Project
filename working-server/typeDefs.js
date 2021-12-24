const { gql } = require('apollo-server-express');
const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload');

//Create type definition using gql
const typeDefs = gql`
	scalar Upload

	type Query {
		files: [String]
		logInUser(userInput: UserInput): AuthData!
		users: [User!]!
		user(id: ID!): User
	}

	type User {
		_id: ID!
		username: String!
		profileimage: String!
	}
	type AuthData {
		userId: ID
		token: String
		tokenExpiration: Int
	}

	input UserInput {
		username: String!
	}

	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}

	type Mutation {
		uploadFile(file: Upload!): File
		signUpUser(userInput: UserInput): AuthData!
		logInUser(userInput: UserInput): AuthData!
	}
`;

module.exports = typeDefs;
