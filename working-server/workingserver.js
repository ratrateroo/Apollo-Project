const express = require('express');
const path = require('path');
const { mkdirSync, exists, stat } = require('fs');

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
	console.log(path.join(__dirname, './images'));
	app.use(express.static('public'));
	app.listen({ port: 4000 }, () => {
		console.log(`🚀  Server ready at http://localhost:4000/`);
	});

	console.log(apolloserver.graphqlPath);

	// Using fs.exists() method to
	// check that the directory exists or not
	console.log('Checking for directory ' + path.join(__dirname, 'public'));
	exists(path.join(__dirname, './images'), (exists) => {
		console.log(exists ? 'The directory already exists' : 'Not found!');
	});

	//fs.stat()
	// Getting information for a directory
	stat(__dirname, (error, stats) => {
		if (error) {
			console.log(error);
		} else {
			console.log(`Stats object for: ${__dirname}`);
			console.log(stats);

			// Using methods of the Stats object
			console.log('Path is file:', stats.isFile());
			console.log('Path is directory:', stats.isDirectory());
			console.log({ ...stats });
		}
	});
};
//Starting the Server
console.log('Server Starting...');
startServer();
