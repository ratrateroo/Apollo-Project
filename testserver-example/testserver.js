const { ApolloServer, gql } = require('apollo-server-express');
const { createWriteStream, unlink } = require('fs');
const shortId = require('shortid');
const path = require('path');
const express = require('express');

const { graphqlUploadExpress } = require('graphql-upload');

const files = ['file1', 'file2'];

const typeDefs = gql`
	scalar Upload

	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}

	type Query {
		files: [String]
	}

	type Mutation {
		uploadFile(file: Upload!): File
	}
`;

const storeFS = ({ stream, filename, mimetype }) => {
	const id = shortId.generate();
	const path = `${UPLOADED_IMAGES}/${id}-${filename}`;

	const storedFileName = `${shortId.generate()}-${filename}`;
	const UPLOAD_DIRECTORY_URL = new URL('./uploads/', __dirname);
	const storedFileUrl = new URL(storedFileName, UPLOAD_DIRECTORY_URL);

	// Store the file in the filesystem.
	return new Promise((resolve, reject) => {
		stream
			.on('error', (error) => {
				unlink(storedFileUrl, () => {
					reject(error);
				});
			})
			.pipe(createWriteStream(storedFileUrl))
			.on('error', (error) => reject(error))
			.on('finish', () =>
				resolve({
					_id: id,
					filename: storedFileName,
					mimetype: mimetype,
					path: UPLOAD_DIRECTORY_URL,
				})
			);
	});
};

const resolvers = {
	Query: {
		files: () => files,
	},
	Mutation: {
		uploadFile: async (_, { file }) => {
			console.log('Log1');
			console.log(await file);
			console.log(file);
			//const { stream, filename, mimetype, encoding } = await file;
			//const stream = await createReadStream();
			// const storedFileName = `${shortId.generate()}-${filename}`;
			// const UPLOAD_DIRECTORY_URL = new URL('./uploads/', __dirname);
			// const storedFileUrl = new URL(storedFileName, UPLOAD_DIRECTORY_URL);

			// // Store the file in the filesystem.
			// await new Promise((resolve, reject) => {
			// 	// Create a stream to which the upload will be written.
			// 	const writeStream = createWriteStream(storedFileUrl);

			// 	// When the upload is fully written, resolve the promise.
			// 	writeStream.on('finish', resolve);

			// 	// If there's an error writing the file, remove the partially written file
			// 	// and reject the promise.
			// 	writeStream.on('error', (error) => {
			// 		unlink(storedFileUrl, () => {
			// 			reject(error);
			// 		});
			// 	});

			// 	// In Node.js <= v13, errors are not automatically propagated between piped
			// 	// streams. If there is an error receiving the upload, destroy the write
			// 	// stream with the corresponding error.
			// 	stream.on('error', (error) => writeStream.destroy(error));

			// 	// Pipe the upload into the write stream.
			// 	stream.pipe(writeStream);
			// });

			// files.push(filename);
			//....
			//return { filename, mimetype, encoding };

			// mkdirp.sync(UPLOADED_IMAGES);
			const { filename, mimetype, encoding, createReadStream } = await file;
			console.log('Log2');
			console.log(filename);
			console.log(mimetype);
			console.log(encoding);
			console.log(createReadStream);
			if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
				throw new Error(
					'Please select a file with one of the following formats: jpeg, jpg, png'
				);
			}

			const stream = createReadStream();
			files.push(filename);
			return storeFS({ stream, filename, mimetype });
		},
	},
};
const startServer = async () => {
	const server = new ApolloServer({ typeDefs, resolvers });
	await server.start();
	const app = express();
	app.use('/images', express.static(path.join(__dirname, './public/images')));
	app.use(graphqlUploadExpress());
	server.applyMiddleware({ app });

	app.listen(4000, () => {
		console.log(
			`🚀 Server ready at http://localhost:4000${server.graphqlPath}`
		);
	});
};

startServer();
