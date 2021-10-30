//import typeDefs
const typeDefs = require('./typeDefs');

const resolvers = require('./resolvers');

//Server Definitions
const startServer = async () => {
	console.log('This is the server.');
	console.log(typeDefs);
	console.log(resolvers);
};
//Starting the Server
console.log('Server Starting...');
startServer();
