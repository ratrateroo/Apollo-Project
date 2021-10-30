const express = require('express');

//import apollo server
const { graphqlUploadExpress } = require('graphql-upload');
const { apolloserver } = require('./apolloserver');

//Server Definitions
const startServer = async () => {
	console.log('This is the server.');
	//Start Apollo Server
	await apolloserver.start();

	const app = express();
	app.use(graphqlUploadExpress());
	apolloserver.applyMiddleware({ app });

	app.listen({ port: 4000 }, () => {
		console.log(`🚀  Server ready at http://localhost:4000/`);
	});

	console.log(apolloserver.graphqlPath);
};
//Starting the Server
console.log('Server Starting...');
startServer();
