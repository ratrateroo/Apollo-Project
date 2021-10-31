const express = require('express');

//import apollo server
const { graphqlUploadExpress } = require('graphql-upload');
const { apolloserver } = require('./apolloserver');
const { createDirectory } = require('./createDirectory');

//Server Definitions
const startServer = async () => {
	console.log('This is the server.');
	//Start Apollo Server
	await apolloserver.start();
	const app = express();
	app.use(graphqlUploadExpress());
	apolloserver.applyMiddleware({ app });
	//console.log(path.join(__dirname, './images'));
	createDirectory('images');
	app.use(express.static('public'));
	app.listen({ port: 4000 }, () => {
		console.log(
			`🚀  Server ready at http://localhost:4000/${apolloserver.graphqlPath}`
		);
	});
};
//Starting the Server
console.log('Server Starting...');
startServer();
