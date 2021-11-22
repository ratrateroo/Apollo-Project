const express = require('express');
const { graphqlUploadExpress } = require('graphql-upload');

const apolloserver = require('./apolloserver');
const createDirectory = require('./createDirectory');
const fileNameReader = require('./readFileNames');

// //testStoreFileSystem function

// const storeFileSystem = require('./storeFileSystem');

//Server Definitions
const startServer = async () => {
	try {
		console.log('This is the server.');
		//Start Apollo Server
		await apolloserver.start();
		const app = express();
		app.use(graphqlUploadExpress());
		apolloserver.applyMiddleware({ app });
		//Create images folder
		createDirectory('images');
		//serve public folder for path starting with /freefiles
		app.use('/freefiles', express.static('public'));
		app.listen({ port: 4000 }, () => {
			console.log(
				`🚀  Server ready at http://localhost:4000/${apolloserver.graphqlPath}`
			);
		});

		// storeFileSystem({
		// 	stream: 'stream',
		// 	filename: 'filename',
		// 	mimetype: 'mimetype',
		// });

		fileNameReader();
	} catch (error) {
		console.log(error);
	}
};
//Starting the Server
console.log('Server Starting...');
startServer();
