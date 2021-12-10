const { ApolloServer } = require('apollo-server-express');
//import typeDefs
const typeDefs = require('./typeDefs');
//import resolvers
const resolvers = require('./resolvers');
const { getUserId } = require('./getUserId');
//create apollo server
console.log('Apollo Server Created.');
const apolloserver = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		return {
			...req,
			prisma,
			pubsub,
			userId: req && req.headers.authorization ? getUserId(req) : null,
		};
	},
});

module.exports = apolloserver;
