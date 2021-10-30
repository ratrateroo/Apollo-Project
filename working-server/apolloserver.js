const { ApolloServer } = require('apollo-server-express');
//import typeDefs
const { typeDefs } = require('./typeDefs');
//import resolvers
const { resolvers } = require('./resolvers');
//create apollo server
console.log('Apollo Server Created.');
const apolloserver = new ApolloServer({
	typeDefs,
	resolvers,
});

exports.apolloserver = apolloserver;
